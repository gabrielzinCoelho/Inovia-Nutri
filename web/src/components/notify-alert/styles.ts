import { Alert } from "@mui/material";
import { styled } from "@mui/material/styles"

export const AlertContainer = styled("div")(() => ({

  position: 'fixed',
  left: '50%',
  top: '10%',
  transform: "translate(-50%, -50%)"

}));

export const MyAlert = styled(Alert)(() => ({
}))