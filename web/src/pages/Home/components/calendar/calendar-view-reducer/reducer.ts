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

  if(action.type === 'NEW_CALENDAR_VIEW'){

    const {consultationsEvents, dateRange} = action.payload

    return {
      consultationsEvents,
      dateRange
    }

  }

  return state

}