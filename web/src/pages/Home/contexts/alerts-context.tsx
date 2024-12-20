import { AlertProps } from "@mui/material";
import { createContext, ReactNode, useState } from "react";
import { NotifyAlert } from "../../../components/notify-alert";

interface AlertContextProviderProps {
  children: ReactNode
}

export interface AlertState {
  isOpen: boolean,
  title?: string, 
  message?: string, 
  severity?: AlertProps['severity']
}

export interface AlertContextType {
  showAlert: (title: string, message : string, severity : AlertProps['severity']) => void,
  closeAlert: () => void
}

export const AlertContext = createContext({} as AlertContextType)

export function AlertContextProvider({ children }: AlertContextProviderProps) {

  const [alertState, setAlertState] = useState<AlertState>({
    isOpen: false
  })

  function showAlert(title: string, message : string, severity : AlertProps['severity']){

    setAlertState({
      isOpen: true,
      title,
      message,
      severity
    })
  }

  function closeAlert(){
    setAlertState({
      isOpen: false
    })
  }

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        closeAlert
      }}
    >
      {children}
      {
        alertState.isOpen
        &&
        <NotifyAlert
          isShowing={true}
          title={alertState.title!}
          message={alertState.message!}
          severity={alertState.severity!}
          variant='standard'
          closeModal={closeAlert}
        />
      }
    </AlertContext.Provider>
  )

}