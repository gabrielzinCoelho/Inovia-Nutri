import { useContext } from "react"
import { ConsultationModalContext } from "../../contexts/consultation-modal-context"
import * as Dialog from "@radix-ui/react-dialog";
import { ShowConsultation } from "../show-consultation";
import { CreateConsultation } from "../create-consultation";

export function SwitchConsultationModal() {

  const { modalState, closeModal } = useContext(ConsultationModalContext)

  return (
    <>
      {
        modalState.isOpen
        &&
        //eslint-disable-next-line
        <Dialog.Root open={modalState.isOpen} onOpenChange={(_ : boolean) => (closeModal())}>
          { 
            modalState.modalSelected === "VIEW" && 
            <ShowConsultation consultationId={modalState.consultationId!} />
          }
          { 
            modalState.modalSelected === "CREATE" && 
            <CreateConsultation />
          }
        </Dialog.Root>
      }
    </>
  )

}