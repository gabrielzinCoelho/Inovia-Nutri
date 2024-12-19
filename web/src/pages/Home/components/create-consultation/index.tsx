import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../store";
import { api } from "../../../../lib/axios";
import { ConsultationModal } from "../consultation-modal";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

interface ConsultationData {
  startTime?: Date,
  duration?: number,
  nutritionistId?: string,
  clientId?: string
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


export function CreateConsultation() {

  const { token: userToken } = useAppSelector(store => store.auth)

  // const [consultationData, setConsultationData] = useState<ConsultationData | null>(null)
  const [nutritionistsData, setNutritionistsData] = useState<Map<string, NutritionistData>>(new Map())
  const [clientsData, setClientsData] = useState<Map<string, ClientData>>(new Map())

  const [consultationData, setConsultationData] = useState<ConsultationData>({})

  // async function handleCreateConsultation() {

  //   const response = await api.post('/consultations', {
  //     headers: { "Authorization": `Bearer ${userToken}` },
  //     data: {

  //     }
  //   })

  //   if (response.status === 200)
  //     createEventCallback()

  // }

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
          value: consultationData.nutritionistId,
          onChange: (newNutritionist) => (setConsultationData((prev) => ({
            ...prev,
            nutritionistId: newNutritionist
          }))),
          options: Array.from(nutritionistsData.values()).map(
              nutritionist => ({
              value: nutritionist.id,
              label: `${nutritionist.name} (${nutritionist.email})`
            })
          )
        },
        client: {
          value: consultationData.clientId,
          onChange: (newClient) => (setConsultationData((prev) => ({
            ...prev,
            clientId: newClient
          }))),
          options: Array.from(clientsData.values()).map(
              client => ({
              value: client.id,
              label: `${client.name} (${client.cpf})`
            })
          )
        },
        startTime: {
          value: consultationData.startTime,
          onChange: (newDate) => (setConsultationData((prev) => ({
            ...prev,
            startTime: newDate
          })))
        },
        duration: {
          value: consultationData.duration,
          onChange: (newDuration) => (setConsultationData((prev) => ({
            ...prev,
            duration: newDuration
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
      <Button size={"large"} color={'success'} variant="contained" startIcon={<Add />}>
        Agendar
      </Button>
    </ConsultationModal>

  )
}