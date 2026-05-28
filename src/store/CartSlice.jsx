import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({ ...product, quantity: 1 });
    },
    updateQuantity(state, action) {
      const { id, change } = action.payload;
      const itemId = id;
      const item = state.items.find((cartItem) => cartItem.id === itemId);

      if (!item) {
        return;
      }

      const nextQuantity = item.quantity + change;

      if (nextQuantity > 0) {
        item.quantity = nextQuantity;
        return;
      }

      state.items = state.items.filter((cartItem) => cartItem.id !== itemId);
    },
    removeItem(state, action) {
      state.items = state.items.filter((cartItem) => cartItem.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const addToCart = addItem;
export const increaseQuantity = (id) => updateQuantity({ id, change: 1 });
export const decreaseQuantity = (id) => updateQuantity({ id, change: -1 });
export const removeFromCart = removeItem;

export default cartSlice.reducer;
