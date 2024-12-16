import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { VerifyTokenAndRedirect } from "./verify-token-and-redirect";

export function Router(){

  return (
    <Routes>
      <Route  
        path="/" 
        element={
          <VerifyTokenAndRedirect to="/login" whenIsLogged={false}>
            <Home />
          </VerifyTokenAndRedirect>
        } 
      />
      <Route 
        path="/login"
        element={
          <VerifyTokenAndRedirect to="/" whenIsLogged>
            <Login />
          </VerifyTokenAndRedirect>
        } 
      />
    </Routes>
  )

}