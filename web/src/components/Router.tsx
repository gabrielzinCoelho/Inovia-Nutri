import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Calendar } from "../pages/Calendar";

export function Router(){

  return (
    <Routes>
      <Route  path="/" element={<Calendar />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )

}