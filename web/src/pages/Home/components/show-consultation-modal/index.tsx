import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, ContentBody, ContentHeader, Overlay } from "./styles";
import { Close } from "@mui/icons-material";

export function ShowConsultationModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <ContentHeader>
          <h1>Detalhes da Consulta</h1>
          <CloseButton>
            <Close />
          </CloseButton>
        </ContentHeader>
        <ContentBody>

        </ContentBody>
      </Content>
    </Dialog.Portal>
  )
}