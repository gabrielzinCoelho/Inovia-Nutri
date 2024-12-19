import { createContext, ReactNode, useState } from "react";

interface ConsultationModalContextProviderProps {
  children: ReactNode
}

export interface ModalState {
  isOpen: boolean,
  modalSelected: 'CREATE' | 'VIEW' | 'EDIT',
  consultationId: string | null
}

export interface ConsultationModalContextType {

  selectCreateModal: () => void
  selectEditModal: (consultationId : string) => void
  selectViewModal: (consultationId : string) => void
  closeModal: () => void
  modalState: ModalState
}

export const ConsultationModalContext = createContext({} as ConsultationModalContextType)

export function ConsultationModalContextProvider({children} : ConsultationModalContextProviderProps){

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    modalSelected: "CREATE",
    consultationId: null
  })

  function selectCreateModal(){
    setModalState({
      isOpen: true,
      modalSelected: 'CREATE',
      consultationId: null
    })
  }

  function selectEditModal(consultationId : string){
    setModalState({
      isOpen: true,
      modalSelected: 'EDIT',
      consultationId
    })
  }

  function selectViewModal(consultationId : string){
    setModalState({
      isOpen: true,
      modalSelected: 'VIEW',
      consultationId
    })
  }

  function closeModal(){
    setModalState({
      isOpen: false,
      modalSelected: "CREATE",
      consultationId: null
    })
  }

  return (
    <ConsultationModalContext.Provider 
      value={{
        selectCreateModal, 
        selectEditModal, 
        selectViewModal, 
        closeModal, 
        modalState, 
      }}
    >
      {children}
    </ConsultationModalContext.Provider>
  )

}