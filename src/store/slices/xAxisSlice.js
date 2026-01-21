import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  xDateRange: 1,
};

const xAxisSlice = createSlice({
  name: 'xAxis',
  initialState,
  reducers: {
    setXDateRange: (state, action) => {
      state.xDateRange = action.payload;
    },
  },
});

export const { setXDateRange } = xAxisSlice.actions;
export default xAxisSlice.reducer;
