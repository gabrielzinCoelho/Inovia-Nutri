import { Header } from "./components/header";
import { CalendarContainer, HomeContainer } from "./styles";

export function Home(){
  return (
    <HomeContainer>
      <Header />
      <CalendarContainer />
    </HomeContainer>
  )
}