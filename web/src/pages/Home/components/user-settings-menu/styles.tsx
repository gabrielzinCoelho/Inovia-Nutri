import { AccountCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles"

export const UserSettingsMenuContainer = styled("div")(() => ({
  lineHeight: 0
}));

export const MyAccountCircle = styled(AccountCircle)(({theme}) => ({

  color: theme.palette.myTheme["gray-100"],
  width: '3rem',
  height: '3rem',
  cursor: 'pointer',
  padding: 0,
  margin: 0

}))