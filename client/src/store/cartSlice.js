import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    console.warn("Failed to load cart from localStorage:", e);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.count += action.payload.count || 1;
      } else {
        state.items.push({
          ...action.payload,
          count: action.payload.count || 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    incrementCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.count += 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decrementCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  addToCart,
  incrementCount,
  decrementCount,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
