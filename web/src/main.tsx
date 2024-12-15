import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import { ThemeProvider } from '@emotion/react'
import { StyledEngineProvider } from '@mui/material'
import { ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import { MyTheme } from './styles/themes/default.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={MyTheme}>
        <ThemeProvider theme={MyTheme}>
          <App />
        </ThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
