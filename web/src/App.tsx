import { Global } from "@emotion/react";
import {useTheme} from '@mui/material/styles'
import { createGlobalStyles } from "./styles/global";
import { Router } from "./components/Router";
import { BrowserRouter } from "react-router-dom";
import {Provider as ReduxProvider} from 'react-redux'
import { store } from "./store";

export function App() {
  
  const theme = useTheme()
  const globalStyles = createGlobalStyles(theme)

  return (
      <>
        <Global styles={globalStyles} />
        <BrowserRouter>
          <ReduxProvider store={store}>
            <Router />
          </ReduxProvider>
        </BrowserRouter>
      </>
  )
}

