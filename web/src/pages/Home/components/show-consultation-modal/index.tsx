import * as Dialog from "@radix-ui/react-dialog";
import { ButtonsContainer, ClientData, CloseButton, ConsultationForm, Content, ContentBody, ContentHeader, NutritionistData, Overlay } from "./styles";
import { Close, Edit, WatchLater } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, InputAdornment, TextField } from "@mui/material";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../store";
import { api } from "../../../../lib/axios";
import dayjs from "dayjs";

interface ShowConsultationModalProps {
  consultationId: string,
  removeEventCallback: (consultationId : string) => void
}

interface ConsultatioData {

  id: string,
  startTime: Date,
  duration: number,
  nutritionist: {
    name: string,
    email: string,
  },
  client: {
    name: string,
    cpf: string,
    email: string,
    phone: string,
    dateOfBirth: Date,
    biotype:  string,
}

}

export function ShowConsultationModal({consultationId, removeEventCallback} : ShowConsultationModalProps) {

  const { token: userToken } = useAppSelector(store => store.auth)
  
  const [consultationData, setConsultationData] = useState<ConsultatioData | null>(null)

  async function handleDeleteConsultation(){

    const response = await api.delete(`consultations/${consultationId}`, {
      headers: { "Authorization": `Bearer ${userToken}` },
    })

    if(response.status === 200)
      removeEventCallback(consultationId)

  }

  useEffect(() => {

    api.get(`consultations/${consultationId}`, {
      headers: { "Authorization": `Bearer ${userToken}` },
    }).then(response => {
      
      const consultationResponse = response.data.consultation
      setConsultationData({
        id: consultationResponse._id,
        startTime: consultationResponse.start_time,
        duration: dayjs(consultationResponse.end_time).diff(dayjs(consultationResponse.start_time), 'minutes'),
        nutritionist: {
          name: consultationResponse.nutritionist.name,
          email: consultationResponse.nutritionist.email,
        },
        client: {
          name: consultationResponse.client.name,
          cpf: consultationResponse.client.cpf,
          email: consultationResponse.client.email,
          phone: consultationResponse.client.phone,
          dateOfBirth: consultationResponse.client.date_of_birth,
          biotype:  consultationResponse.client.biotype.description,
        }
      })
    })
   
  }, [consultationId, userToken])

  return (
    <Dialog.Portal>
      <Overlay />
      <VisuallyHidden.Root>
        <Dialog.Title>Detalhes da Consulta</Dialog.Title>
      </VisuallyHidden.Root>
      <Content>
        <ContentHeader>
          <h1>Detalhes da Consulta</h1>
          <CloseButton>
            <Close />
          </CloseButton>
        </ContentHeader>
        <ContentBody>
          <ConsultationForm>
            <TextField 
              label="Nutricionista"
              variant="filled"
              disabled
              value={`${consultationData?.nutritionist.name} (${consultationData?.nutritionist.email})`}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField 
              label="Cliente"
              variant="filled"
              disabled
              value={`${consultationData?.client.name} (${consultationData?.client.cpf})`}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField 
              label="Data e Hora"
              variant="filled"
              disabled
              type="datetime-local"
              slotProps={{ inputLabel: { shrink: true } }}
              value={consultationData ? dayjs(consultationData.startTime).format("YYYY-MM-DDTHH:mm") : ''}      
            />
            <TextField 
              label="Duração Estimada (min)"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <WatchLater />
                    </InputAdornment>
                  ),
                },
                inputLabel: { shrink: true }
              }} 
              variant="filled" 
              disabled
              value={consultationData?.duration} 
            />
          </ConsultationForm>
          <NutritionistData>
            <h3>Nutricionista</h3>
            <div>
              <TextField 
                label="Nome"
                variant="filled"
                disabled
                value={consultationData?.nutritionist.name}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField 
                label="Email"
                variant="filled"
                disabled
                value={consultationData?.nutritionist.email}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </div>
          </NutritionistData>
          <ClientData>
          <h3>Cliente</h3>
            <div>
              <TextField
                label="Nome"
                variant="filled" 
                disabled 
                value={consultationData?.client.name}
                slotProps={{ inputLabel: { shrink: true } }}
                />
              <TextField
                label="Biotipo"
                variant="filled" 
                disabled 
                value={consultationData?.client.biotype}
                slotProps={{ inputLabel: { shrink: true } }}
                />
              <TextField
                label="CPF"
                variant="filled" 
                disabled 
                value={consultationData?.client.cpf}
                slotProps={{ inputLabel: { shrink: true } }}
                />
              <TextField
                label="Data de Nascimento"
                variant="filled" 
                disabled
                type='datetime-local' 
                value={consultationData ? dayjs(consultationData.client.dateOfBirth).format("YYYY-MM-DDTHH:mm") : ''}
                slotProps={{ inputLabel: { shrink: true } }}
                />
              <TextField
                label="Email"
                variant="filled" 
                disabled 
                value={consultationData?.client.email}
                slotProps={{ inputLabel: { shrink: true } }}
                />
              <TextField
                label="Telefone"
                variant="filled" 
                disabled 
                value={consultationData?.client.phone}
                slotProps={{ inputLabel: { shrink: true } }}
                />
            </div>
          </ClientData>
          <ButtonsContainer>
            <Button size={"large"} color={'success'} variant="contained" startIcon={<Edit />}>
              Editar
            </Button>
            <Button 
              size={"large"} 
              color={'error'} 
              variant="contained" 
              startIcon={<DeleteIcon />}
              onClick={handleDeleteConsultation}
            >
              Deletar
            </Button>
          </ButtonsContainer>
        </ContentBody>
      </Content>
    </Dialog.Portal>
  )
}