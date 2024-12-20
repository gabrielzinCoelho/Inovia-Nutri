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

//eslint-disable-next-line
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

    case ActionTypes.ADD_CONSULTATION_EVENT: {

      const { newConsultationEvent } = action.payload as { newConsultationEvent: ConsultationEvent }

      if (!state.dateRange)
        return state

      return (
        isDateContained(state.dateRange.startDate, state.dateRange.endDate, newConsultationEvent.startTime) ||
        isDateContained(state.dateRange.startDate, state.dateRange.endDate, newConsultationEvent.endTime)
      ) ?
        {
          consultationsEvents: [
            ...state.consultationsEvents,
            newConsultationEvent
          ],
          dateRange: state.dateRange
        } 
        : state

    }

    default:
      return state

  }

}