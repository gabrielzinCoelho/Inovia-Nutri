import { styled } from "@mui/material/styles"

export const HeaderContainer = styled("div")(({theme}) => ({

  width: '100%',
  height: '6rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: "flex-end",
  padding: '0 5rem 1rem',
  background: theme.palette.myTheme["green-900"],

}));

export const LogoContainer = styled("div")(({theme}) => ({

  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',

  '& img': {
    width: '2rem',
    height: '2rem',
  },

  '& h2': {
    color: theme.palette.myTheme["gray-100"],
  }

}));