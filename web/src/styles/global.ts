import { css } from '@emotion/react'
import { Theme } from '@mui/material'

export const createGlobalStyles = (theme : Theme) => {

  return css`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0;
  }

  body {
    background-color: ${theme.palette.myTheme['green-300']};
    color: ${theme.palette.myTheme['gray-900']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }

`

}