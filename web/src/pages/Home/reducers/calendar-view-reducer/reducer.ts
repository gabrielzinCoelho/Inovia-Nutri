import { DateRange } from "@mui/icons-material"
import { ActionTypes } from "./actions"
import dayjs from "dayjs"

export interface DateRange {
  startDate: Date,
  endDate: Date
}

export interface ConsultationEvent {
  id: string,
  startTime: Date,
  endTime: Date,
  nutritionist: {
    id: string,
    name: string
  },
  client: string
}

export interface CalendarViewState {
  consultationsEvents: ConsultationEvent[],
  dateRange: DateRange | null
}

function isDateContained(startDateInterval: Date, endDateInterval: Date, date : Date) {
  return (
    (dayjs(date).isAfter(startDateInterval) || dayjs(date).isSame(startDateInterval)) &&
    (dayjs(date).isBefore(endDateInterval) || dayjs(date).isSame(endDateInterval))
  )
}

export function CalendarViewReducer(state: CalendarViewState, action: any) {

  switch (action.type) {

    case ActionTypes.NEW_CALENDAR_VIEW: {
      const { consultationsEvents, dateRange } = action.payload

      return {
        consultationsEvents,
        dateRange
      }
    }

    case ActionTypes.REMOVE_CONSULTATION_EVENT: {

      const consultationId = action.payload.consultationId
      const consultationsEventsWithoutRemoved = state.consultationsEvents.filter(consultation => consultation.id !== consultationId)

      return {
        consultationsEvents: consultationsEventsWithoutRemoved,
        dateRange: state.dateRange
      }

    }

    case ActionTypes.ADD_CONSULTATION_EVENTS: {

      const { newConsultationEvents } = action.payload as { newConsultationEvents: ConsultationEvent[] }

      if (!state.dateRange)
        return state

      const eventsToAdd = newConsultationEvents.filter(consultationEvent => (
        isDateContained(state.dateRange!.startDate, state.dateRange!.endDate, consultationEvent.startTime) ||
        isDateContained(state.dateRange!.startDate, state.dateRange!.endDate, consultationEvent.endTime)
      ))

      return  {
          consultationsEvents: [
            ...state.consultationsEvents,
            ...eventsToAdd
          ],
          dateRange: state.dateRange
        } 

    }

    case ActionTypes.UPDATE_CONSULTATION_EVENT: {

      const { updatedConsultationEvent } = action.payload as { updatedConsultationEvent: ConsultationEvent }

      if (!state.dateRange)
        return state

      return (
        isDateContained(state.dateRange.startDate, state.dateRange.endDate, updatedConsultationEvent.startTime) ||
        isDateContained(state.dateRange.startDate, state.dateRange.endDate, updatedConsultationEvent.endTime)
      ) ?
        {
          consultationsEvents: state.consultationsEvents.map(
            consultationEvent => (
              consultationEvent.id === updatedConsultationEvent.id ?
              updatedConsultationEvent
              :
              consultationEvent
            )
          ),
          dateRange: state.dateRange
        } 
        : state

    }

    default:
      return state

  }

}