import { Calendar } from "./components/calendar";
import { Header } from "./components/header";
import { CalendarEventsContextProvider } from "./contexts/calendar-events-context";
import { ConsultationModalContextProvider } from "./contexts/consultation-modal-context";
import { ContentContainer, HomeContainer } from "./styles";

export function Home() {

  return (
    <HomeContainer>
      <Header />
      <ContentContainer>
        <CalendarEventsContextProvider>
          <ConsultationModalContextProvider>
            <Calendar />
          </ConsultationModalContextProvider>
        </CalendarEventsContextProvider>
      </ContentContainer>
    </HomeContainer>
  )
}