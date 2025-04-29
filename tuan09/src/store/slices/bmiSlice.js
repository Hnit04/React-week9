import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  height: 0,
  weight: 0,
  result: null,
};

const bmiSlice = createSlice({
  name: 'bmi',
  initialState,
  reducers: {
    updateInput: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    calculateResult: (state) => {
      if (state.height > 0 && state.weight > 0) {
        const heightInMeters = state.height / 100;
        state.result = state.weight / (heightInMeters * heightInMeters);
      }
    },
  },
});

export const { updateInput, calculateResult } = bmiSlice.actions;
export default bmiSlice.reducer;