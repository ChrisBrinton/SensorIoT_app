const yMinMaxDefaults = [ { dataType: 'TempF', dataQueryKey: 'F', yMin: 0, yMax: 115, lowThreshold: 32, highThreshold: 100},
                          { dataType: 'TempC', dataQueryKey: 'F', yMin: -20, yMax: 45, lowThreshold: 0, highThreshold: 35},
                          { dataType: 'Hum', dataQueryKey: 'H', yMin: 0, yMax: 100, lowThreshold: 10, highThreshold:90},
                          { dataType: 'Pres', dataQueryKey: 'P', yMin: 28, yMax: 31},
                          { dataType: 'Batt', dataQueryKey: 'BAT', yMin: 0, yMax: 5},
                        ];

const initialState = {
  yAxisType: 'TempF',
  tempType: 'F',
  yAxisMin: '0',
  yAxisMax: '105',
  yAxisLabel: value => `${value}ºF`,
  dataQueryKey: 'F',
  lowThreshold: 32,
  highThreshold: 100,
  yAxisMinMaxDefaults: yMinMaxDefaults,
}

function updateMinMax(state, newMin, newMax) {
  let newMinMaxs = state;
  for (let i in newMinMaxs.yMinMaxDefaults) {
    if (type == newMinMaxs.yMinMaxDefaults[i].dataType) {
      newMinMaxs.yMinMaxDefaults[i].yMin = newMin;
      newMinMaxs.yMinMaxDefaults[i].yMax = newMax;
    }
  }
  console.log('updateMinMax returning', newMinMaxs);
  return newMinMaxs;
}

function getDefaultsIndex(type) {
  for (let i in yMinMaxDefaults) {
    if ( type == yMinMaxDefaults[i].dataType) {
      return i;
    }
  }
}

const yAxis = (state = initialState, action) => {
  console.log('yAxis reducer - action type', action.type);
  switch (action.type) {
    case 'SET_Y_AXIS_TYPE':
      let axisType = action.yAxisType;
      if(typeof(axisType) == 'undefined') {
        if(state.tempType == 'F'){
          axisType = 'TempF';
        } else {
          axisType = 'TempC';
        }
      } else {
        if(action.yAxisType.indexOf('Temp') != -1){
          if(state.tempType == 'F'){
            axisType = 'TempF';
          } else {
            axisType = 'TempC';
          }
        }   
      }
      console.log('yAxis reducer SET_Y_AXIS_TYPE action:', action, 'axisType: ', axisType, ' dataQueryKey ',yMinMaxDefaults[getDefaultsIndex(axisType)].dataQueryKey);
      let index = getDefaultsIndex(axisType);
      return ({
                ...state,
                yAxisType: axisType,
                dataQueryKey: yMinMaxDefaults[index].dataQueryKey,
                lowThreshold: yMinMaxDefaults[index].lowThreshold,
                highThreshold: yMinMaxDefaults[index].highThreshold,
              })
    case 'SET_Y_AXIS_RANGE':
      let newMinMaxs = updateMinMax(state, action.yAxisMin, action.yAxisMax);
       return ({
           ...state,
           yAxisMin: action.yAxisMin,
           yAxisMax: action.yAxisMax,
           yAxisMinMaxDefaults: newMinMaxs,
           dataQueryKey: action.dataQueryKey,
         })
    case 'TOGGLE_TEMP_TYPE':
      console.log('yAxis reducer - TOGGLE_TEMP_TYPE');
      let tempType;
      let yAxisType =state.yAxisType;
      if (state.tempType == 'F') {
        tempType = 'C';
        if (yAxisType == 'TempF') {
          yAxisType = 'TempC';
        }
      } else {
        tempType = 'F';
        if(yAxisType == 'TempC') {
          yAxisType = 'TempF';
        }
      }
      index = getDefaultsIndex(yAxisType);
      return ({
              ...state,
              tempType: tempType,
              yAxisType: yAxisType,
              dataQueryKey: yMinMaxDefaults[index].dataQueryKey,
              lowThreshold: yMinMaxDefaults[index].lowThreshold,
              highThreshold: yMinMaxDefaults[index].highThreshold,
      })
    default:
      return state;
  }
}

export default yAxis;
