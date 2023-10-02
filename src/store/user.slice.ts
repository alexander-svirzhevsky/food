import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "./storage";
import { BASE_URL } from "../helpers/API";
import { ResponsI } from "../interfaces/login.interface";
import axios, { AxiosError } from "axios";
import { Profile } from "../interfaces/profile.interface";
import { RootStore } from "./store";

export const JWT_STATE = "userData"

interface UserPersistentState {
  jwt: string
}

interface UserState {
  jwt: string | null;
  errorMessage?: string;
  profile?: Profile;
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

export const getProfile = createAsyncThunk<Profile, void, { state: RootStore }>("user/getProfile", async (_, thunkApi) => {
  const jwt = thunkApi.getState().user.jwt;

  const { data } = await axios.get<Profile>(`${BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  return data;
})

interface registerParams {
  email: string;
  password: string;
  name: string
}

export const register = createAsyncThunk("user/register", async ({ email, password, name }: registerParams) => {
  try {
    const { data } = await axios.post<ResponsI>(`${BASE_URL}/auth/register`, {
      email,
      password,
      name
    })

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
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        if (!action.payload) {
          return
        }
        state.jwt = action.payload.access_token
      })
      .addCase(register.rejected, (state, action) => {
        state.errorMessage = action.error.message
      })
  }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;