import dayGridPlugin from '@fullcalendar/daygrid'
import { DatesSetArg, EventClickArg, EventContentArg } from '@fullcalendar/core/index.js'
import { CalendarContainer } from './styles'
import FullCalendar from '@fullcalendar/react'
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { CalendarEvent } from '../calendar-event';
import listPlugin from '@fullcalendar/list';
import { useContext, useState } from 'react';
import { api } from '../../../../lib/axios';
import dayjs from 'dayjs'
import { useAppSelector } from '../../../../store';
import { ConsultationEvent, DateRange } from '../../reducers/calendar-view-reducer/reducer';
import { AlertProps } from '@mui/material';
import { NotifyAlert } from '../../../../components/notify-alert';
import { ConsultationModalContext } from '../../contexts/consultation-modal-context';
import { SwitchConsultationModal } from '../switch-consultation-modal';
import { CalendarEventsContext } from '../../contexts/calendar-events-context';

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

interface EventDataPayload {
  consultationId: string,
  nutritionistId: string,
  nutritionistName: string,
  clientName: string
}

export type RenderEventData = EventContentArg & { 
  event: { 
    extendedProps: EventDataPayload
  } 
}

interface NotifyAlertState {
  isOpen: boolean,
  title?: string, 
  message?: string, 
  variant?: AlertProps['variant']
  severity?: AlertProps['severity']
}

function isIntervalContained(startDateA: Date, endDateA: Date, startDateB: Date, endDateB: Date) {
  return (dayjs(startDateA).isBefore(startDateB) || dayjs(startDateA).isSame(startDateB)) &&
    (dayjs(endDateA).isAfter(endDateB) || dayjs(endDateA).isSame(endDateB))
}

export function Calendar() {

  const { token: userToken } = useAppSelector(store => store.auth)
  const { selectViewModal, selectCreateModal } = useContext(ConsultationModalContext)
  const { calendarViewState, refreshCalendarEvents } = useContext(CalendarEventsContext)

  const [notifyAlert, setNotifyAlert] = useState<NotifyAlertState>({
    isOpen: false
  })


  async function fetchConsultationsEvents(dateRange: DateRange): Promise<ConsultationEvent[]> {

    const response = await api.get('/consultations', {
      headers: { "Authorization": `Bearer ${userToken}` },
      params: {
        minStartTime: dateRange.startDate,
        maxStartTime: dateRange.endDate
      }
    });
  
    const data = response.data.consultations
  
    return data.map((consultationData: FetchConsultationsApiResponse) => ({
  
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

  async function handleDatesSet({ end, start }: DatesSetArg) {

    const calendarShowingStartDate = dayjs(start).startOf('day').toDate()
    const calendarShowingEndDate = dayjs(end).subtract(1, 'day').endOf('day').toDate()

    if (
      !calendarViewState.dateRange ||
      !isIntervalContained(calendarViewState.dateRange.startDate, calendarViewState.dateRange.endDate, calendarShowingStartDate, calendarShowingEndDate)
    ) {

      const newConsultationsData = await fetchConsultationsEvents({
        startDate: calendarShowingStartDate,
        endDate: calendarShowingEndDate
      }
      )

      refreshCalendarEvents(newConsultationsData, calendarShowingStartDate, calendarShowingEndDate)

    }
  }

  function handleEventClick(arg: EventClickArg) {
    selectViewModal(arg.event.extendedProps.consultationId)
  }

  function handleAddEvent() {
    selectCreateModal()
  }

  return (
    <>
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
            calendarViewState.consultationsEvents.map((consultation: ConsultationEvent) => ({
              start: consultation.startTime,
              end: consultation.endTime,
              consultationId: consultation.id,
              nutritionistId: consultation.nutritionist.id,
              nutritionistName: consultation.nutritionist.name,
              clientName: consultation.client
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
      <SwitchConsultationModal />
      {
        notifyAlert.isOpen 
          &&
        <NotifyAlert
          isShowing={true}
          title={notifyAlert.title!}
          message={notifyAlert.message!}
          severity={notifyAlert.severity!}
          variant={notifyAlert.variant!}
          closeModal={()=>(setNotifyAlert({isOpen: false}))}
        />
      }
    </>
  )
}