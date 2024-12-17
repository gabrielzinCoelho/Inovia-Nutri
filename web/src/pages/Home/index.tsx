import {Calendar} from "./components/calendar";
import { Header } from "./components/header";
import { ContentContainer, HomeContainer } from "./styles";

export function Home(){

  return (
    <HomeContainer>
      <Header />
      <ContentContainer>
        <Calendar />
      </ContentContainer>
    </HomeContainer>
  )
}