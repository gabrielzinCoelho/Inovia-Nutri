import { InputLoginContainer, InputLoginField, InputLoginFieldIcon, InputLoginLabel } from "./styles";
import { ReactNode } from "react";

interface InputLoginProps {
  type: 'text' | 'password' | 'email'
  label: string
  placeholder: string
  required?: boolean
  value: string
  updateValue: (value : string) => void
  inputIcon: ReactNode
  handleInputIconClick?: () => void
}

export function InputLogin({type, label, placeholder, required = true, value, updateValue, handleInputIconClick, inputIcon} : InputLoginProps){

  return (
    <InputLoginContainer>
      <InputLoginLabel>{label}</InputLoginLabel>
      <InputLoginField>
        <input 
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e)=> updateValue(e.target.value)}
        />
        <InputLoginFieldIcon
          onClick={() => handleInputIconClick?.()}
          edge="end"
        >
          {inputIcon}
        </InputLoginFieldIcon>
      </InputLoginField>
    </InputLoginContainer>
  )

}

