import dayGridPlugin from '@fullcalendar/daygrid'
import { DatesSetArg, EventClickArg } from '@fullcalendar/core/index.js'
import { CalendarContainer } from './styles'
import FullCalendar from '@fullcalendar/react'
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { CalendarEvent } from '../calendar-event';
import listPlugin from '@fullcalendar/list';
import { useReducer } from 'react';
import { api } from '../../../../lib/axios';
import dayjs from 'dayjs'
import { useAppSelector } from '../../../../store';
import { CalendarViewReducer, ConsultationEvent, DateRange } from './calendar-view-reducer/reducer';
import { newCalendarViewAction } from './calendar-view-reducer/actions';

interface FetchConsultationsApiResponse {

  _id: string
  start_time: Date,
  end_time: Date,
  nutritionist: {
    _id: string,
    name: string
  },
  client: {
    _id: string,
    name: string
  }

}

function isIntervalContained(startDateA: Date, endDateA: Date, startDateB: Date, endDateB: Date) {
  return (dayjs(startDateA).isBefore(startDateB) || dayjs(startDateA).isSame(startDateB)) &&
    (dayjs(endDateA).isAfter(endDateB) || dayjs(endDateA).isSame(endDateB))
}

async function fetchConsultationsEvents (dateRange : DateRange, userToken : string) : Promise<ConsultationEvent[]> {

  const response = await api.get('/consultations', {
    headers: { "Authorization": `Bearer ${userToken}` },
    params: {
      minStartTime: dateRange.startDate,
      maxStartTime: dateRange.endDate
    }
  });
  
  const data = response.data.consultations

  return data.map((consultationData : FetchConsultationsApiResponse) => ({

    id: consultationData['_id'],
    startTime: consultationData.start_time,
    endTime: consultationData.end_time,
    nutritionist: {
      id: consultationData.nutritionist._id,
      name: consultationData.nutritionist.name
    }, 
    client: consultationData.client.name
  })); 
}

export function Calendar() {

  const {token: userToken} = useAppSelector(store => store.auth)

  const [calendarViewState, dispatch] = useReducer(
    CalendarViewReducer,
    {
      consultationsEvents: [],
      dateRange: null
    }
  )

  async function handleDatesSet({ end, start }: DatesSetArg) {

    const calendarShowingStartDate = dayjs(start).startOf('day').toDate()
    const calendarShowingEndDate = dayjs(end).subtract(1, 'day').endOf('day').toDate()

    if (
      !calendarViewState.dateRange ||
      !isIntervalContained(calendarViewState.dateRange.startDate, calendarViewState.dateRange.endDate, calendarShowingStartDate, calendarShowingEndDate)
    ){

      const newConsultationsData = await fetchConsultationsEvents({
        startDate: calendarShowingStartDate,
        endDate: calendarShowingEndDate
      },
      userToken!
    )  

      dispatch(
        newCalendarViewAction(
          newConsultationsData,
          {
            startDate: calendarShowingStartDate,
            endDate: calendarShowingEndDate
          } 
        )
      )

    }
  }

  function handleEventClick(arg: EventClickArg) {
    console.log(arg.event)
  }

  function handleAddEvent() {

  }

  return (
    <CalendarContainer>
      <FullCalendar
        locale={ptBrLocale}
        fixedWeekCount={false}
        height={'100%'}
        plugins={[dayGridPlugin, listPlugin]}
        initialView={'dayGridMonth'}
        dayMaxEvents={true}
        headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,list addEvent'
        }}
        datesSet={handleDatesSet}
        eventContent={CalendarEvent}
        events={
          calendarViewState.consultationsEvents.map((consultation : ConsultationEvent) => ({
            start: consultation.startTime, 
            end: consultation.endTime,
            ...consultation,
            startTime: undefined,
            endTime: undefined
          }))
        }
        customButtons={{
          addEvent: {
            text: 'Agendar consulta',
            click: handleAddEvent,
          }
        }}
        eventClick={handleEventClick}
      />
    </CalendarContainer>
  )
}