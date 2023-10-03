import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_PEPSISTENT_STATE } from "./user.slice";
import { saveState } from "./storage";
import basketSlice, { BASKET_PEPSISTENT_STATE } from "./basket.slice";


export const store = configureStore({
  reducer: {
    user: userSlice,
    basket: basketSlice
  }
})

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PEPSISTENT_STATE);
  saveState(store.getState().basket, BASKET_PEPSISTENT_STATE)
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

