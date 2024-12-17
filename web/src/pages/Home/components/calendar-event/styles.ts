import { styled } from "@mui/material/styles"

export const CalendarEventContainer = styled('div')(({theme}) => ({
   background: theme.palette.myTheme['green-500'],
   width: '100%',
   overflow: 'hidden',
   borderRadius: '6px',
   padding: '0.2rem',
   display: 'flex',
   gap: '0.4rem'
}));

export const CalendarEventTime = styled('div')(({theme}) => ({
 
  '& span': {
    color: theme.palette.myTheme.black,
    font: 'bold',
    fontSize: '1rem',
  }
  
}));

export const CalendarEventData = styled('div')(() => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column'

}));

export const CalendarEventNutritionistData = styled('span')(({theme}) => ({
 
  color: theme.palette.myTheme.black,
  font: 'bold',
  fontSize: '1rem'
}));

export const CalendarEventClientData = styled('span')(({theme}) => ({
  color: theme.palette.myTheme['gray-700'],
  font: 'regular',
  fontSize: '0.8rem'
}));