import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasketItem {
  id: number,
  count: number
}

interface Basket {
  items: BasketItem[]
}

const initialState: Basket = {
  items: []
}

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<number>) {
      const isExisted = state.items.find(i => i.id === action.payload)

      if (!isExisted) {
        state.items.push({
          id: action.payload,
          count: 1
        })
        return;
      }

      state.items.map(i => {
        if (i.id === action.payload) {
          i.count += 1;
          return i;
        }
        return i;
      })
    }
  }
})

export const basketActions = basketSlice.actions;
export default basketSlice.reducer;