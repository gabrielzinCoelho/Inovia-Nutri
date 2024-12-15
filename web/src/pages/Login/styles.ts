import { styled } from "@mui/material/styles"

export const LoginContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr 1.7fr",
  background: theme.palette.myTheme.white, 
}));

export const ImageContainer = styled("div")(() => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",

  "& img": {
    maxWidth: "820px",
    maxHeight: "808px",
    padding: "2rem",
  },
}));


export const FormContainer = styled("div")(({ theme }) => ({
  background: theme.palette.myTheme["green-300"],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

export const LoginForm = styled("form")(() => ({
  padding: "0 2rem 20rem 2rem",
  width: "80%",
  maxWidth: "800px",
  minWidth: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
}));



export const FormTitleContainer = styled("div")(({theme}) => ({
  textAlign: "center",

  "& h1": {
    color: theme.palette.myTheme['gray-800'],
    fontSize: "1.75rem",
    fontWeight: "bold",
  },
}));

export const FormInputsContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
}));


export const FormButtonContainer = styled("div")(({theme}) => ({
  display: "flex",
  justifyContent: "center",

  "& button": {
    width: "100%",
    height: "40px",
    border: "0",
    background: theme.palette.myTheme["green-700"], 
    color: theme.palette.myTheme.white, 
    fontWeight: "regular",
    fontSize: "1.25rem",
    padding: "0 1.25rem",
    borderRadius: "12px",
    cursor: "pointer",

    "&:hover": {
      boxShadow: `2px 2px 5px 2px ${theme.palette.myTheme["gray-500"]}`,
      transition: "box-shadow 0.3s",
    },
  },
}));