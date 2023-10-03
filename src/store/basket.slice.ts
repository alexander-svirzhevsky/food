import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getState } from './storage';

export const BASKET_PEPSISTENT_STATE = "basketData"
interface BasketItem {
  id: number;
  count: number;
}

interface Basket {
  items: BasketItem[];
}

const initialState: Basket = getState<Basket>(BASKET_PEPSISTENT_STATE) ?? {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    clear(state) {
      state.items = []
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    addProduct(state, action: PayloadAction<number>) {
      const isExisted = state.items.find((i) => i.id === action.payload);

      if (!isExisted) {
        state.items.push({
          id: action.payload,
          count: 1,
        });
        return;
      }

      state.items.map((i) => {
        if (i.id === action.payload) {
          i.count += 1;
          return i;
        }

        return i;
      });
    },
    removeProduct(state, action: PayloadAction<number>) {
      const isExisted = state.items.find((i) => i.id === action.payload);

      if (!isExisted) {
        return;
      }

      if (isExisted.count === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      } else {
        state.items = state.items.map((i) => {
          if (i.id === action.payload) {
            i.count -= 1;
            return i;
          }
          return i;
        });
      }

      state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const basketActions = basketSlice.actions;
export default basketSlice.reducer;
