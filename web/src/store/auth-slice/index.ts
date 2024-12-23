import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";

const tokenKey = '@inovia-nutri:token-1.0.0'

async function getStoredToken() : Promise<string | null>{

  try {

    const token = localStorage.getItem(tokenKey)

    if(!token)
      throw new Error('Unauthorized access.')

    const authResponse = await api.get('/sessions/validate-token', {
      headers: {"Authorization" : `Bearer ${token}`}
    })
    
    if(authResponse.status !== 200)
      throw new Error('Unauthorized access.')

    return token

  }catch(err){

    return null

  }
}

interface AuthState {
  token: string | null,
}

const initialState : AuthState = {
  token: await getStoredToken()
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    login: (state, action) => {

      const token = action.payload.token

      localStorage.setItem(tokenKey, token);
      state.token = token
    },

    logout: (state) => {

      localStorage.removeItem(tokenKey);
      state.token = null
    }

  }
})

export const {login, logout} = authSlice.actions