import { ReactNode, useEffect } from "react"
import { useAppSelector } from "../store"
import { useNavigate } from "react-router-dom"

interface VerifyTokenAndRedirectProps {
  children: ReactNode
  to: string
  whenIsLogged: boolean
}

export function VerifyTokenAndRedirect({children, to, whenIsLogged} : VerifyTokenAndRedirectProps){

  const {token: userToken} = useAppSelector(store => store.auth)
  const navigate = useNavigate()

  const isRedirect = (!!userToken === whenIsLogged)

  useEffect(() => {

    if(isRedirect)
        navigate(to)

  }, [navigate, to, whenIsLogged, isRedirect])

  return (
    <>{!isRedirect && children}</>
  )

}