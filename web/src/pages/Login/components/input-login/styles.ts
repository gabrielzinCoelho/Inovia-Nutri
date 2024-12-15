import { IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"

export const InputLoginContainer = styled("div")(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: "0.5rem"
}))

export const InputLoginLabel = styled("span")(({theme}) => ({
  color: theme.palette.myTheme['gray-800'],
  fontSize: "1rem",
  fontWeight: "regular"
}))

export const InputLoginField = styled('div')(({theme}) => ({

  width: '100%',
  height: '52px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: "space-between",
  background: theme.palette.myTheme.white,
  overflow: 'hidden',

  "& input": {

    height: '100%',
    flex: 1,
    border: 0,
    background: theme.palette.myTheme.white,
    padding: '1rem',
    color: theme.palette.myTheme["gray-800"],

    "&:placeholder": {
      color: theme.palette.myTheme["gray-500"],
    },

  }

}))

export const InputLoginFieldIcon = styled(IconButton)(({theme}) => ({

  background: theme.palette.myTheme.white,
  padding: ' 0 1rem',
  height: '100%',
  borderRadius: 0,
  margin: 0,
}))
