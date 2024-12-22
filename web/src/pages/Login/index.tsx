import { FormButtonContainer, FormContainer, FormInputsContainer, FormTitleContainer, ImageContainer, LoginContainer, LoginForm } from "./styles";
import LoginBackground from '../../assets/login-background.svg'
import { InputLogin } from "./components/input-login";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { VisibilityOff, Visibility, Email } from '@mui/icons-material';
import { Portal } from '@mui/base/Portal';
import { NotifyAlert } from "../../components/notify-alert";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth-slice";

export function Login() {

  const dispatch = useDispatch()

  const [userEmail, setUserEmail] = useState('')

  const [userPassword, setUserPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const handleFormSubmit = async (e : FormEvent) => {

    try{

      e.preventDefault()
      const authResponse = await api.post('/sessions', {
        email: userEmail,
        password: userPassword
      })
      
      if(authResponse.status !== 200)
        throw new Error('Unauthorized access.')

      dispatch(login({
        token: authResponse.data.token
      }))
    
    }catch(err){

        setUserPassword('')
        setShowModal(true)
    }
    
  }

  return (
    <>
      <Portal>
        <NotifyAlert 
          title={"Erro"}
          message={"Informe suas credenciais novamente."}
          variant={'standard'}
          severity={'error'}
          isShowing={showModal}
          closeModal={()=>(setShowModal(false))}
        />
      </Portal>
      <LoginContainer>
        <FormContainer>
          <LoginForm onSubmit={handleFormSubmit}>
            <FormTitleContainer>
              <h1>Login</h1>
            </FormTitleContainer>
            <FormInputsContainer>
              <InputLogin 
                label="Email" 
                type="email" 
                placeholder="johndoe@example.com"
                value={userEmail}
                updateValue={(value : string) => {setUserEmail(value)}}
                inputIcon={<Email />}
              />
              <InputLogin 
                label="Senha" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="•••••••••••••••••"
                value={userPassword}
                updateValue={(value : string) => {setUserPassword(value)}}
                inputIcon={
                  showPassword ? <Visibility /> : <VisibilityOff />
                }
                handleInputIconClick={() => setShowPassword(showPassword => !showPassword)} 
              />  
            </FormInputsContainer>
            <FormButtonContainer>
              <button type="submit">Login</button>
            </FormButtonContainer>
          </LoginForm>
        </FormContainer>
        <ImageContainer>
          <img src={LoginBackground} />
        </ImageContainer>
      </LoginContainer>
    </>
  )

}