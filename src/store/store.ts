import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_STATE } from "./user.slice";
import { saveToken } from "./storage";
import basketSlice from "./basket.slice";


export const store = configureStore({
  reducer: {
    user: userSlice,
    basket: basketSlice
  }
})

store.subscribe(() => {
  saveToken({ jwt: store.getState().user.jwt }, JWT_STATE)
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

