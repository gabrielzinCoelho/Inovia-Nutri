import { styled } from "@mui/material/styles"

export const HomeContainer = styled("div")(() => ({

  width: '100%',
  height: '100%',
  overflow: "hidden",
  display: 'flex',
  flexDirection: 'column'

}));

export const ContentContainer = styled('div')(({theme}) => ({

  width: '100%',
  flex: 1,
  background: theme.palette.myTheme.background,

}))