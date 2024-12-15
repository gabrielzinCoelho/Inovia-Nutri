import { AlertProps, Fade } from "@mui/material";
import { AlertContainer, MyAlert } from "./styles";
import AlertTitle from '@mui/material/AlertTitle';

interface NotifyAlertProps {
  
  title: string
  message: string
  variant: AlertProps['variant']
  severity: AlertProps['severity']
  isShowing: boolean
  closeModal: () => void

}

export function NotifyAlert({ title, message, variant, severity, isShowing, closeModal } : NotifyAlertProps){

  return (
    <Fade in={isShowing}>
      <AlertContainer>
        <MyAlert variant={variant} severity={severity} onClose={closeModal}>
        <AlertTitle>{title}</AlertTitle>
          {message}
        </MyAlert>
      </AlertContainer>
    </Fade>
    
  )

}