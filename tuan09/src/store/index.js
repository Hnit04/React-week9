import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
// Thêm các reducer khác sau

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Thêm các slice khác
  },
});