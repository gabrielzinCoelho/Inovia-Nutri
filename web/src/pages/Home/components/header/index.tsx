import { HeaderContainer, LogoContainer } from "./styles";
import Logo from '../../../../assets/logo-inovia-nutri.svg'
import { UserSettingsMenu } from "../user-settings-menu";

export function Header(){

  return (
    <HeaderContainer>
      <LogoContainer>
        <img src={Logo} />
        <h2>Inovia Nutri</h2>
      </LogoContainer>
      <UserSettingsMenu />
    </HeaderContainer>
  )

}