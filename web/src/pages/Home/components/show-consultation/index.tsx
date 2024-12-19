import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../../store";
import { api } from "../../../../lib/axios";
import dayjs from "dayjs";
import { ConsultationModal } from "../consultation-modal";
import { Button } from "@mui/material";
import { Edit} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConsultationModalContext } from "../../contexts/consultation-modal-context";
import { CalendarEventsContext } from "../../contexts/calendar-events-context";

interface ShowConsultationProps {
  consultationId: string,
}

interface ConsultationData {

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

export function ShowConsultation({consultationId} : ShowConsultationProps) {

  const { token: userToken } = useAppSelector(store => store.auth)
  const { closeModal } = useContext(ConsultationModalContext)
  const {removeCalendarEvent} = useContext(CalendarEventsContext)

  const [consultationData, setConsultationData] = useState<ConsultationData | null>(null)

  async function handleDeleteConsultation(){

    const response = await api.delete(`consultations/${consultationId}`, {
      headers: { "Authorization": `Bearer ${userToken}` },
    })

    if(response.status === 200){
      closeModal()
      removeCalendarEvent(consultationId)
    }
      

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
    <>
    {
      consultationData
      &&
      <ConsultationModal
        isEditable={false}
        title={"Detalhes da Consulta"}
        consultation={{
          nutritionist: {
            value: `${consultationData?.nutritionist.name} (${consultationData?.nutritionist.email})`,
            options: []
          },
          client:{
            value: `${consultationData?.client.name} (${consultationData?.client.cpf})`,
            options: []
          },
          startTime: {
            value: consultationData.startTime
          },
          duration: {
            value: consultationData.duration
          }
        }}
        nutritionist={{
          name: {
            value: consultationData.nutritionist.name
          },
          email: {
            value: consultationData.nutritionist.email
          }
        }}
        client={{
          name: {
            value: consultationData.client.name
          },
          biotype: {
            value: consultationData.client.biotype
          },
          cpf: {
            value: consultationData.client.cpf
          },
          dateOfBirth: {
            value: consultationData.client.dateOfBirth
          },
          email: {
            value: consultationData.client.email
          },
          phone: {
            value: consultationData.client.phone
          },
        }}
      >
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
      </ConsultationModal>
    }
    </>
  )
}