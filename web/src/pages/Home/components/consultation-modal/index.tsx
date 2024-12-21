import { ButtonsContainer, ClientData, CloseButton, ConsultationForm, Content, ContentBody, ContentHeader, NutritionistData } from "./styles";
import { WatchLater } from "@mui/icons-material";
import { Dialog, InputAdornment, MenuItem, Portal, TextField } from "@mui/material";
import { ReactNode, useContext } from "react";
import dayjs from "dayjs";
import CloseIcon from '@mui/icons-material/Close';
import { ConsultationModalContext } from "../../contexts/consultation-modal-context";

interface TextFieldProps<T> {

  value?: T | null,
  onChange?: (newValue: T) => void,
}

interface SelectProps<T> extends TextFieldProps<T> {

  options: {
    value: T,
    label: string
  }[],
}

interface ConsultationModalProps {
  isEditable: boolean,
  title: string,
  consultation: {
    nutritionist: SelectProps<string>,
    client: SelectProps<string>,
    startTime: TextFieldProps<Date>,
    duration: TextFieldProps<string>
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
}: ConsultationModalProps) {

  const { closeModal, modalState } = useContext(ConsultationModalContext)

  return (
    <Dialog 
      open={modalState.isOpen} 
      onClose={closeModal}
    >
      <Portal>
        <Content>
          <ContentHeader>
            <h1>{title}</h1>
            <CloseButton
              aria-label="close"
              onClick={closeModal}
            >
              <CloseIcon />
            </CloseButton>
          </ContentHeader>
          <ContentBody>
            <ConsultationForm>
              <TextField
                label="Nutricionista"
                variant="filled"
                disabled={!isEditable}
                value={consultation.nutritionist.value}
                onChange={(e) => (consultation.nutritionist.onChange?.(e.target.value))}
                slotProps={{ 
                  inputLabel: { shrink: true },
                  select: {
                    MenuProps: {
                      style: {
                        zIndex: '2000'
                      }
                    }
                  } 
                }}
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
                onChange={(e) => (consultation.client.onChange?.(e.target.value))}
                slotProps={{ 
                  inputLabel: { shrink: true },
                  select: {
                    MenuProps: {
                      style: {
                        zIndex: '2002'
                      }
                    }
                  } 
                }}
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
                onChange={(e) => (consultation.startTime.onChange?.(new Date(e.target.value)))}
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
                  inputLabel: { shrink: true },
                }}
                variant="filled"
                disabled={!isEditable}
                value={consultation.duration.value}
                onChange={(e) => {
                  if(!e.target.value || e.target.value === '-')
                    consultation.duration.onChange?.('')
                  else {
                    const value = parseInt(e.target.value, 10);
                    if(!isNaN(value))
                      consultation.duration.onChange?.(e.target.value)
                  }
                }}
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
      </Portal>
    </Dialog>
  )
}