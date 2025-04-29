import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import todoReducer from './slices/todoSlice';
import themeReducer from './slices/themeSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
    theme: themeReducer,
    cart: cartReducer,
  },
});