import { ActionTypes } from "./actions"

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

//eslint-disable-next-line
export function CalendarViewReducer(state : CalendarViewState, action : any){

  switch(action.type){

    case ActionTypes.NEW_CALENDAR_VIEW: {
      const {consultationsEvents, dateRange} = action.payload

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

    default:
      return state

  }

}