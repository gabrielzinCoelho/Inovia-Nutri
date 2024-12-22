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
import { AlertContext } from "../../contexts/alerts-context";

interface ConsultationData {

  id: string,
  startTime: Date,
  duration: number,
  recurrenceInterval: number | null,
  recurrenceEndData: Date | null,
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

export function ShowConsultation() {

  const { token: userToken } = useAppSelector(store => store.auth)
  const { closeModal, selectEditModal } = useContext(ConsultationModalContext)
  const {removeCalendarEvent} = useContext(CalendarEventsContext)
  const {showAlert} = useContext(AlertContext)
  const {modalState} = useContext(ConsultationModalContext)

  const {consultationId : currentConsultationId} = modalState

  const [consultationData, setConsultationData] = useState<ConsultationData | null>(null)

  async function handleDeleteConsultation(){

    const response = await api.delete(`consultations/${currentConsultationId}`, {
      headers: { "Authorization": `Bearer ${userToken}` },
    })

    if(response.status === 200){
      closeModal()
      removeCalendarEvent(currentConsultationId!)
      showAlert('Sucesso', 'Consulta removida com sucesso', 'success')
    }
  }

  async function handleEditConsultation(){
    selectEditModal(currentConsultationId!)
  }

  useEffect(() => {

    api.get(`consultations/${currentConsultationId}`, {
      headers: { "Authorization": `Bearer ${userToken}` },
    }).then(response => {
      
      const consultationResponse = response.data.consultation
      setConsultationData({
        id: consultationResponse._id,
        startTime: consultationResponse.start_time,
        duration: dayjs(consultationResponse.end_time).diff(dayjs(consultationResponse.start_time), 'minutes'),
        recurrenceEndData: consultationResponse.recurrence_end_time ?? null,
        recurrenceInterval: consultationResponse.recurrence_interval ?? null,
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
   
  }, [currentConsultationId, userToken])

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
            value: consultationData.nutritionist.name,
            options: [{
              value: consultationData.nutritionist.name,
              label: `${consultationData.nutritionist.name} (${consultationData.nutritionist.email})`
            }]
          },
          client:{
            value: consultationData.client.name,
            options: [{
              value: consultationData.client.name,
              label: `${consultationData.client.name} (${consultationData.client.cpf})`
            }]
          },
          startTime: {
            value: consultationData.startTime
          },
          duration: {
            value: consultationData.duration.toString(),
          },
          isRecurrent: {
            value: (!!consultationData.recurrenceInterval && !!consultationData.recurrenceEndData),
          },
          recurrenceInterval: {
            value: consultationData.recurrenceInterval?.toString() ?? '' 
          },
          recurrenceEndDate: {
            value: consultationData.recurrenceEndData
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
        <Button 
          size={"large"}
          color={'success'}
          variant="contained"
          startIcon={<Edit />}
          onClick={handleEditConsultation}
        >
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