import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../../store";
import { api } from "../../../../lib/axios";
import { ConsultationModal } from "../consultation-modal";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AlertContext } from "../../contexts/alerts-context";
import { CalendarEventsContext } from "../../contexts/calendar-events-context";
import { ConsultationModalContext } from "../../contexts/consultation-modal-context";

interface ConsultationData {
  startTime: Date | null,
  duration: number | null,
  nutritionistId: string | null,
  clientId: string | null
}

interface NutritionistData {

  id: string,
  name: string,
  email: string,
}

interface ClientData {
  id: string,
  name: string,
  cpf: string,
  email: string,
  phone: string,
  dateOfBirth: Date,
  biotype: string,
}

const DEFAULT_SELECT_VALUE = 'DEFAULT_SELECT_VALUE'

export function CreateConsultation() {

  const { token: userToken } = useAppSelector(store => store.auth)
  const { showAlert } = useContext(AlertContext)
  const { closeModal } = useContext(ConsultationModalContext)
  const { addCalendarEvent } = useContext(CalendarEventsContext)

  const [nutritionistsData, setNutritionistsData] = useState<Map<string, NutritionistData>>(new Map())
  const [clientsData, setClientsData] = useState<Map<string, ClientData>>(new Map())

  const [consultationData, setConsultationData] = useState<ConsultationData>({
    startTime: null,
    duration: null,
    nutritionistId: null,
    clientId: null
  })

  async function handleCreateConsultation() {
    if (
      !consultationData.clientId ||
      !consultationData.nutritionistId ||
      !consultationData.startTime ||
      !consultationData.duration
    ) {
      showAlert(
        "Falha no envio",
        "Preencha todos os campos do formulário",
        "warning"
      )
      return;
    }

    try {

      const response = await api.post('/consultations',
        {
          startTime: consultationData.startTime,
          durationInMinutes: consultationData.duration,
          nutritionistId: consultationData.nutritionistId,
          clientId: consultationData.clientId
        },
        {
          headers: { "Authorization": `Bearer ${userToken}` }
        }
      )

      if (response.status !== 201)
        throw new Error("Create consultation request Failed.")

      const newConsultationData = response.data.consultation

      showAlert(
        "Sucesso",
        "Consulta agendada com sucesso",
        "success"
      )
      closeModal()
      addCalendarEvent({
        id: newConsultationData._id,
        nutritionist: {
          id: newConsultationData.nutritionist._id,
          name: newConsultationData.nutritionist.name
        },
        client: newConsultationData.client.name,
        startTime: newConsultationData.start_time,
        endTime: newConsultationData.end_time
      })

    
      //eslint-disable-next-line
    }catch(err){
      showAlert(
        "Erro",
        "Não foi possível realizar o agendamento.",
        "error"
      )
    }

  }

  useEffect(() => {

    api.get('/nutritionists', {
      headers: { "Authorization": `Bearer ${userToken}` },
    }).then(response => {

      const nutritionistsResponse = response.data.nutritionists
      const newNutritionistMap = new Map()
      //eslint-disable-next-line
      nutritionistsResponse.forEach((nutritionist: any) => {
        newNutritionistMap.set(
          nutritionist._id,
          {
            id: nutritionist._id,
            name: nutritionist.name,
            email: nutritionist.email
          }
        )
      });
      setNutritionistsData(newNutritionistMap)

    })

    api.get('/clients', {
      headers: { "Authorization": `Bearer ${userToken}` },
    }).then(response => {

      const clientsResponse = response.data.clients
      const newClientMap = new Map()
      //eslint-disable-next-line
      clientsResponse.forEach((client: any) => {
        newClientMap.set(
          client._id,
          {
            id: client._id,
            name: client.name,
            email: client.email,
            cpf: client.cpf,
            phone: client.phone,
            dateOfBirth: client.date_of_birth,
            biotype: client.biotype.description,
          }
        )
      });
      setClientsData(newClientMap)

    })

  }, [userToken])

  return (
    <ConsultationModal
      isEditable={true}
      title={"Agendar Consulta"}
      consultation={{
        nutritionist: {
          value: consultationData.nutritionistId ? consultationData.nutritionistId : DEFAULT_SELECT_VALUE,
          onChange: (newNutritionist) => {

            if (newNutritionist !== DEFAULT_SELECT_VALUE)
              setConsultationData((prev) => ({
                ...prev,
                nutritionistId: newNutritionist
              }))

          },
          options: [
            {
              value: DEFAULT_SELECT_VALUE,
              label: 'Selecione um nutricionista'
            },
            ...Array.from(nutritionistsData.values()).map(
              nutritionist => ({
                value: nutritionist.id,
                label: `${nutritionist.name} (${nutritionist.email})`
              })
            )
          ]
        },
        client: {
          value: consultationData.clientId ? consultationData.clientId : DEFAULT_SELECT_VALUE,
          onChange: (newClient) => {

            if (newClient !== DEFAULT_SELECT_VALUE)
              setConsultationData((prev) => ({
                ...prev,
                clientId: newClient
              }))

          },
          options: [
            {
              value: DEFAULT_SELECT_VALUE,
              label: 'Selecione um cliente'
            },
            ...Array.from(clientsData.values()).map(
              client => ({
                value: client.id,
                label: `${client.name} (${client.cpf})`
              })
            )
          ]
        },
        startTime: {
          value: consultationData.startTime,
          onChange: (newDate) => (setConsultationData((prev) => ({
            ...prev,
            startTime: newDate
          })))
        },
        duration: {
          value: consultationData.duration?.toString() ?? '',
          onChange: (newDuration) => (setConsultationData((prev) => ({
            ...prev,
            duration: newDuration === '' ? null : parseInt(newDuration)
          })))
        }
      }}
      nutritionist={{
        name: {
          value: consultationData.nutritionistId ? nutritionistsData.get(consultationData.nutritionistId)?.name : ''
        },
        email: {
          value: consultationData.nutritionistId ? nutritionistsData.get(consultationData.nutritionistId)?.email : ''
        }
      }}
      client={{
        name: {
          value: consultationData.clientId ? clientsData.get(consultationData.clientId)?.name : ''
        },
        biotype: {
          value: consultationData.clientId ? clientsData.get(consultationData.clientId)?.biotype : ''
        },
        cpf: {
          value: consultationData.clientId ? clientsData.get(consultationData.clientId)?.cpf : ''
        },
        dateOfBirth: {
          value: consultationData.clientId ? clientsData.get(consultationData.clientId)?.dateOfBirth : null
        },
        email: {
          value: consultationData.clientId ? clientsData.get(consultationData.clientId)?.email : ''
        },
        phone: {
          value: consultationData.clientId ? clientsData.get(consultationData.clientId)?.phone : ''
        },
      }}
    >
      <Button
        size={"large"}
        color={'success'}
        variant="contained"
        startIcon={<Add />}
        onClick={handleCreateConsultation}
      >
        Agendar
      </Button>
    </ConsultationModal>

  )
}