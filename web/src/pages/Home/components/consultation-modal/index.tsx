import * as Dialog from "@radix-ui/react-dialog";
import { ButtonsContainer, ClientData, CloseButton, ConsultationForm, Content, ContentBody, ContentHeader, NutritionistData, Overlay } from "./styles";
import { Close, WatchLater } from "@mui/icons-material";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ReactNode } from "react";
import dayjs from "dayjs";


interface TextFieldProps<T>{

  value?: T | null,
  onChange?: (newValue : T) => void,
}

interface SelectProps<T> extends TextFieldProps<T>{

  options: {
    value: T,
    label: string
  }[],
}

interface ConsultationModalProps{
  isEditable: boolean,
  title: string,
  consultation: {
    nutritionist: SelectProps<string>,
    client: SelectProps<string>,
    startTime: TextFieldProps<Date>,
    duration: TextFieldProps<number>
  },
  nutritionist: {
    name: TextFieldProps<string>,
    email: TextFieldProps<string>
  },
  client: {
    name: TextFieldProps<string>,
    biotype: TextFieldProps<string>,
    cpf: TextFieldProps<string>,
    dateOfBirth: TextFieldProps<Date>,
    email: TextFieldProps<string>,
    phone: TextFieldProps<string>,
  },
  children: ReactNode
}

export function ConsultationModal({
  isEditable,
  title,
  consultation,
  nutritionist,
  client,
  children
} : ConsultationModalProps) {

  return (
    <Dialog.Portal>
      <Overlay />
      <VisuallyHidden.Root>
        <Dialog.Title>{title}</Dialog.Title>
      </VisuallyHidden.Root>
      <Content>
        <ContentHeader>
          <h1>{title}</h1>
          <CloseButton>
            <Close />
          </CloseButton>
        </ContentHeader>
        <ContentBody>
          <ConsultationForm>
            <TextField 
              label="Nutricionista"
              variant="filled"
              disabled={!isEditable}
              value={consultation.nutritionist.value}
              onChange={(e)=>(consultation.nutritionist.onChange?.(e.target.value))}
              slotProps={{ inputLabel: { shrink: true } }}
              select
            >
              {consultation.nutritionist.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField 
              label="Cliente"
              variant="filled"
              disabled={!isEditable}
              value={consultation.client.value}
              onChange={(e)=>(consultation.client.onChange?.(e.target.value))}
              slotProps={{ inputLabel: { shrink: true } }}
              select
            >
              {consultation.client.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField 
              label="Data e Hora"
              variant="filled"
              disabled={!isEditable}
              type="datetime-local"
              slotProps={{ inputLabel: { shrink: true } }}
              value={dayjs(consultation.startTime.value).format("YYYY-MM-DDTHH:mm")}
              onChange={(e)=>(consultation.startTime.onChange?.(new Date(e.target.value)))}      
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
              disabled={!isEditable}
              value={consultation.duration.value}
              onChange={(e)=>(consultation.duration.onChange?.(parseInt(e.target.value)))}  
            />
          </ConsultationForm>
          <NutritionistData>
            <h3>Nutricionista</h3>
            <div>
              <TextField 
                label="Nome"
                variant="filled"
                disabled
                value={nutritionist.name.value}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField 
                label="Email"
                variant="filled"
                disabled
                value={nutritionist.email.value}
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
                value={client.name.value}
                slotProps={{ inputLabel: { shrink: true } }}
                />
              <TextField
                label="Biotipo"
                variant="filled" 
                disabled 
                value={client.biotype.value}
                slotProps={{ inputLabel: { shrink: true } }}
                />
              <TextField
                label="CPF"
                variant="filled" 
                disabled 
                value={client.cpf.value}
                slotProps={{ inputLabel: { shrink: true } }}
                />
              <TextField
                label="Data de Nascimento"
                variant="filled" 
                disabled
                type='datetime-local' 
                value={dayjs(client.dateOfBirth.value).format("YYYY-MM-DDTHH:mm")}
                slotProps={{ inputLabel: { shrink: true } }}
                />
              <TextField
                label="Email"
                variant="filled" 
                disabled 
                value={client.email.value}
                slotProps={{ inputLabel: { shrink: true } }}
                />
              <TextField
                label="Telefone"
                variant="filled" 
                disabled 
                value={client.phone.value}
                slotProps={{ inputLabel: { shrink: true } }}
                />
            </div>
          </ClientData>
          <ButtonsContainer>
              {children}
          </ButtonsContainer>
        </ContentBody>
      </Content>
    </Dialog.Portal>
  )
}