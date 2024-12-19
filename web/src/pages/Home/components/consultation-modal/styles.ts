import { styled } from "@mui/material/styles"
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay)(() => ({
  position: 'fixed',
  inset: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.75)',
  zIndex: '1'
}));

export const Content = styled(Dialog.Content)(({theme}) => ({

  minWidth: '64rem',
  borderRadius: '6px',
  overflow: 'hidden',
  background: theme.palette.myTheme['gray-100'],

  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '2',

  display: 'flex',
  flexDirection: 'column',

  border: 0

}));

export const CloseButton = styled(Dialog.Close)(({theme}) => ({

  background: 'transparent',
  border: 0,
  lineHeight: 0,
  cursor: 'pointer',
  color: theme.palette.myTheme['gray-500'],

  '& svg': {
    width: '1.5rem',
    height: '1.5rem'
  }

}))

export const ContentHeader = styled('div')(({theme}) => ({

  width: '100%',
  padding: '1rem',
  background: theme.palette.myTheme["green-900"],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: 0,

  '& h1': {

    color: theme.palette.myTheme.white,
    font: 'bold',
    fontSize: '1.5rem',

  }

}))

export const ContentBody = styled('div')(() => ({

  width: '100%',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'

}))

export const ConsultationForm = styled('form')(() => ({

  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridColumnGap: '2rem',
  gridRowGap: '1rem'

}))

export const NutritionistData = styled('div')(({theme}) => ({

  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  '& h1': {
    color: theme.palette.myTheme['gray-900'],
    font: 'bold',
    fontSize: '1rem',
  },

  '& > div:first-of-type': {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '2rem',
  }

}))

export const ClientData = styled('div')(({theme}) => ({

  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  '& h1': {
    color: theme.palette.myTheme['gray-900'],
    font: 'bold',
    fontSize: '1rem',
  },

  '& > div:first-of-type': {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '2rem',
    gridRowGap: '1rem'
  }

}))

export const ButtonsContainer = styled('div')(() => ({

  display: 'flex',
  justifyContent: 'flex-end',
  gap: '2rem'

}))