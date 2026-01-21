import { createSlice } from '@reduxjs/toolkit';

const yMinMaxDefaults = [
  { dataType: 'TempF', dataQueryKey: 'F', yMin: 0, yMax: 115, lowThreshold: 32, highThreshold: 100 },
  { dataType: 'TempC', dataQueryKey: 'F', yMin: -20, yMax: 45, lowThreshold: 0, highThreshold: 35 },
  { dataType: 'Hum', dataQueryKey: 'H', yMin: 0, yMax: 100, lowThreshold: 10, highThreshold: 90 },
  { dataType: 'Pres', dataQueryKey: 'P', yMin: 28, yMax: 31 },
  { dataType: 'Batt', dataQueryKey: 'BAT', yMin: 0, yMax: 5 },
];

const initialState = {
  yAxisType: 'TempF',
  tempType: 'F',
  yAxisMin: '0',
  yAxisMax: '105',
  dataQueryKey: 'F',
  lowThreshold: 32,
  highThreshold: 100,
  yAxisMinMaxDefaults: yMinMaxDefaults,
};

function getDefaultsIndex(type) {
  for (let i in yMinMaxDefaults) {
    if (type === yMinMaxDefaults[i].dataType) {
      return i;
    }
  }
  return 0;
}

const yAxisSlice = createSlice({
  name: 'yAxis',
  initialState,
  reducers: {
    setYAxisType: (state, action) => {
      let axisType = action.payload;
      if (typeof axisType === 'undefined') {
        axisType = state.tempType === 'F' ? 'TempF' : 'TempC';
      } else if (action.payload.indexOf('Temp') !== -1) {
        axisType = state.tempType === 'F' ? 'TempF' : 'TempC';
      }
      
      const index = getDefaultsIndex(axisType);
      state.yAxisType = axisType;
      state.dataQueryKey = yMinMaxDefaults[index].dataQueryKey;
      state.lowThreshold = yMinMaxDefaults[index].lowThreshold;
      state.highThreshold = yMinMaxDefaults[index].highThreshold;
    },
    setYAxisRange: (state, action) => {
      const { yAxisMin, yAxisMax } = action.payload;
      state.yAxisMin = yAxisMin;
      state.yAxisMax = yAxisMax;
      
      // Update the defaults array
      for (let i in state.yAxisMinMaxDefaults) {
        if (state.yAxisType === state.yAxisMinMaxDefaults[i].dataType) {
          state.yAxisMinMaxDefaults[i].yMin = yAxisMin;
          state.yAxisMinMaxDefaults[i].yMax = yAxisMax;
        }
      }
    },
    toggleTempType: (state) => {
      let tempType;
      let yAxisType = state.yAxisType;
      
      if (state.tempType === 'F') {
        tempType = 'C';
        if (yAxisType === 'TempF') {
          yAxisType = 'TempC';
        }
      } else {
        tempType = 'F';
        if (yAxisType === 'TempC') {
          yAxisType = 'TempF';
        }
      }
      
      const index = getDefaultsIndex(yAxisType);
      state.tempType = tempType;
      state.yAxisType = yAxisType;
      state.dataQueryKey = yMinMaxDefaults[index].dataQueryKey;
      state.lowThreshold = yMinMaxDefaults[index].lowThreshold;
      state.highThreshold = yMinMaxDefaults[index].highThreshold;
    },
  },
});

export const { setYAxisType, setYAxisRange, toggleTempType } = yAxisSlice.actions;
export default yAxisSlice.reducer;
