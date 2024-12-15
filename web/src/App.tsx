import { Global } from "@emotion/react";
import {useTheme} from '@mui/material/styles'
import { createGlobalStyles } from "./styles/global";
import { Login } from "./pages/Login";

export function App() {
  
  const theme = useTheme()
  const globalStyles = createGlobalStyles(theme)

  return (
      <>
        <Global styles={globalStyles} />
        <Login /> 
      </>
  )
}

