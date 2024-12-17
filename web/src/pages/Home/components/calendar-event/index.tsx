import { EventContentArg } from "@fullcalendar/core/index.js"
import { CalendarEventClientData, CalendarEventContainer, CalendarEventData, CalendarEventNutritionistData, CalendarEventTime } from "./styles"
import dayjs from "dayjs"

interface CustomEventProps {
  id: string,
  nutritionist: {
    id: string,
    name: string
  }, 
  client: string
}

export function CalendarEvent(eventInfo : EventContentArg & { event: { extendedProps: CustomEventProps } }) {
  return(
    <CalendarEventContainer>
      <CalendarEventTime>
        <span>{dayjs(eventInfo.event.start).format('HH:mm')}</span>
      </CalendarEventTime>
      <CalendarEventData>
        <CalendarEventNutritionistData>{eventInfo.event.extendedProps.nutritionist.name}</CalendarEventNutritionistData>
        <CalendarEventClientData>{eventInfo.event.extendedProps.client}</CalendarEventClientData>
      </CalendarEventData>
    </CalendarEventContainer>
  )
}