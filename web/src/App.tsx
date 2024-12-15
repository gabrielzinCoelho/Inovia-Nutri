import { Global } from "@emotion/react";
import {useTheme} from '@mui/material/styles'
import { createGlobalStyles } from "./styles/global";
import { Router } from "./components/Router";
import { BrowserRouter } from "react-router-dom";

export function App() {
  
  const theme = useTheme()
  const globalStyles = createGlobalStyles(theme)

  return (
      <>
        <Global styles={globalStyles} />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </>
  )
}

