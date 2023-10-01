import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "./storage";
import { BASE_URL } from "../helpers/API";
import { ResponsI } from "../interfaces/login.interface";
import axios, { AxiosError } from "axios";

export const JWT_STATE = "userData"

interface UserPersistentState {
  jwt: string
}

interface UserState {
  jwt: string | null;
  errorMessage?: string;
}

const initialState: UserState = {
  jwt: getToken<UserPersistentState>(JWT_STATE)?.jwt ?? null
}

export const login = createAsyncThunk('user/login', async (params: { email: string, password: string }) => {
  try {
    const { data } = await axios.post<ResponsI>(`${BASE_URL}/auth/login`, {
      email: params.email,
      password: params.password,
    });

    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message)
    }
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeJwt(state) {
      state.jwt = null
    },
    clearError(state) {
      state.errorMessage = undefined;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (!action.payload) {
          return
        }
        state.jwt = action.payload.access_token
      })
      .addCase(login.rejected, (state, action) => {
        state.errorMessage = action.error.message
      })
  }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;