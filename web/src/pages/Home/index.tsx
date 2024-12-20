import { Calendar } from "./components/calendar";
import { Header } from "./components/header";
import { AlertContextProvider } from "./contexts/alerts-context";
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
            <AlertContextProvider>
              <Calendar />
            </AlertContextProvider>
          </ConsultationModalContextProvider>
        </CalendarEventsContextProvider>
      </ContentContainer>
    </HomeContainer>
  )
}