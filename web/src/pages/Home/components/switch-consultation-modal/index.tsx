import { useContext } from "react"
import { ConsultationModalContext } from "../../contexts/consultation-modal-context"
import { ShowConsultation } from "../show-consultation";
import { CreateConsultation } from "../create-consultation";

export function SwitchConsultationModal() {

  const { modalState } = useContext(ConsultationModalContext)


  function renderModal() {
    switch (modalState.modalSelected) {
      case "VIEW":
        return <ShowConsultation consultationId={modalState.consultationId!} />;
      case "CREATE":
        return <CreateConsultation />;
      default:
        return null;
    }
  };
  
  return (
    <>
      {
        modalState.isOpen ?
        renderModal()
          :
        null
      }
    </>
  )
}