import { styled } from "@mui/material/styles"

export const HomeContainer = styled("div")(() => ({

  width: '100vw',
  height: '100vh',
  overflow: "hidden",
  display: 'flex',
  flexDirection: 'column'

}));

export const CalendarContainer = styled('div')(({theme}) => ({

  width: '100%',
  flex: 1,
  background: theme.palette.myTheme.background,

}))