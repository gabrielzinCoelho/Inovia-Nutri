import { ConsultationEvent, DateRange } from "./reducer";

export enum ActionTypes {
  NEW_CALENDAR_VIEW = 'NEW_CALENDAR_VIEW',
  REMOVE_CONSULTATION_EVENT = 'REMOVE_CONSULTATION_EVENT',
  ADD_CONSULTATION_EVENTS = 'ADD_CONSULTATION_EVENTS',
  UPDATE_CONSULTATION_EVENT = 'UPDATE_CONSULTATION_EVENT'
}

export function newCalendarViewAction(consultationsEvents : ConsultationEvent[], dateRange : DateRange){

  return {
    type: ActionTypes.NEW_CALENDAR_VIEW,
    payload: {
      consultationsEvents,
      dateRange
    }
  }

}

export function removeConsultationEventAction(consultationId : string){

  return {
    type: ActionTypes.REMOVE_CONSULTATION_EVENT,
    payload: {
      consultationId
    }
  }

}

export function addConsultationEventsAction(newConsultationEvents: ConsultationEvent[]){

  return {
    type: ActionTypes.ADD_CONSULTATION_EVENTS,
    payload: {
      newConsultationEvents
    }
  }

}

export function updateConsultationEventAction(updatedConsultationEvent : ConsultationEvent){

  return {
    type: ActionTypes.UPDATE_CONSULTATION_EVENT,
    payload: {
      updatedConsultationEvent
    }
  }

}

