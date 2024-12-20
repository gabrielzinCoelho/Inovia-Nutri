import { createContext, ReactNode, useReducer } from "react";
import { CalendarViewReducer, CalendarViewState, ConsultationEvent } from "../reducers/calendar-view-reducer/reducer";
import { addConsultationEventAction, newCalendarViewAction, removeConsultationEventAction } from "../reducers/calendar-view-reducer/actions";

interface CalendarEventsContextProviderProps {
  children: ReactNode
}

interface CalendarEventsContextType {
  calendarViewState: CalendarViewState,
  refreshCalendarEvents: (newConsultationsData : CalendarViewState['consultationsEvents'], startDate : Date, endDate : Date) => void,
  removeCalendarEvent: (consultationId : string) => void,
  addCalendarEvent: (newConsultation : ConsultationEvent) => void
}

export const CalendarEventsContext = createContext({} as CalendarEventsContextType)

export function CalendarEventsContextProvider({ children }: CalendarEventsContextProviderProps) {

  const [calendarViewState, dispatch] = useReducer(
    CalendarViewReducer,
    {
      consultationsEvents: [],
      dateRange: null
    }
  )


  function refreshCalendarEvents(newConsultationsData : CalendarViewState['consultationsEvents'], startDate : Date, endDate : Date) {
    dispatch(
      newCalendarViewAction(
        newConsultationsData,
        {
          startDate: startDate,
          endDate: endDate
        }
      )
    )
  }

  function removeCalendarEvent (consultationId : string){
    dispatch(removeConsultationEventAction(consultationId))
  }

  function addCalendarEvent(newConsultation : ConsultationEvent){
    dispatch(addConsultationEventAction(newConsultation))
  }

  return (
    <CalendarEventsContext.Provider
      value={{
        calendarViewState,
        refreshCalendarEvents,
        removeCalendarEvent,
        addCalendarEvent
      }}
    >
      {children}
    </CalendarEventsContext.Provider>
  )

}