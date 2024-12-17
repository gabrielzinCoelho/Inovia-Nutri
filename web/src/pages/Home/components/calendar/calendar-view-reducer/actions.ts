import { ConsultationEvent, DateRange } from "./reducer";

export enum ActionTypes {
  NEW_CALENDAR_VIEW = 'NEW_CALENDAR_VIEW'
}

export function newCalendarViewAction(consultationsEvents : ConsultationEvent[], dateRange : DateRange){

  return {
    type: 'NEW_CALENDAR_VIEW',
    payload: {
      consultationsEvents,
      dateRange
    }
  }

}

