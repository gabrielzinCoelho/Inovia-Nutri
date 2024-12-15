import { Theme } from "@mui/material/styles";
import { defaultTheme } from '../styles/themes/default'

type MyAppTheme = typeof defaultTheme

declare module "@mui/material/styles" {
  
  interface Palette {
    myTheme: MyAppTheme
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    myTheme: MyAppTheme
  }
  
}

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}
