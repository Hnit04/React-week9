import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import todoReducer from './slices/todoSlice';
import themeReducer from './slices/themeSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import bmiReducer from './slices/bmiSlice';
import eventReducer from './slices/eventSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
    theme: themeReducer,
    cart: cartReducer,
    auth: authReducer,
    users: userReducer,
    bmi: bmiReducer,
    event: eventReducer,
    product: productReducer,
  },
});