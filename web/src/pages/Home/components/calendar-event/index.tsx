import { CalendarEventClientData, CalendarEventContainer, CalendarEventData, CalendarEventNutritionistData, CalendarEventTime } from "./styles"
import dayjs from "dayjs"
import { RenderEventData } from "../calendar"


export function CalendarEvent(eventInfo : RenderEventData) {
  return(
    <CalendarEventContainer>
      <CalendarEventTime>
        <span>{dayjs(eventInfo.event.start).format('HH:mm')}</span>
      </CalendarEventTime>
      <CalendarEventData>
        <CalendarEventNutritionistData>{eventInfo.event.extendedProps.nutritionistName}</CalendarEventNutritionistData>
        <CalendarEventClientData>{eventInfo.event.extendedProps.clientName}</CalendarEventClientData>
      </CalendarEventData>
    </CalendarEventContainer>
  )
}