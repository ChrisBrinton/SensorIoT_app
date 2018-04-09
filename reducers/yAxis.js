const yMinMaxDefaults = [ { dataType: 'TempF', yMin: 0, yMax: 105},
                          { dataType: 'TempC', yMin: -10, yMax: 40},
                          { dataType: 'Hum', yMin: 0, yMax: 100},
                          { dataType: 'Pres', yMin: 10, yMax: 40},
                          { dataType: 'Batt', yMin: 0, yMax: 5},
                        ];

const initialState = {
  yAxisType: 'TempF',
  tempType: 'F',
  yAxisMin: '0',
  yAxisMax: '105',
  yAxisLabel: value => `${value}ºF`,
  yAxisMinMaxDefaults: yMinMaxDefaults,
}

function updateMinMax(state, newMin, newMax) {
  let newMinMaxs = state;
  for (i in newMinMaxs.yMinMaxDefaults) {
    if (type == newMinMaxs.yMinMaxDefaults[i].dataType) {
      newMinMaxs.yMinMaxDefaults[i].yMin = newMin;
      newMinMaxs.yMinMaxDefaults[i].yMax = newMax;
    }
  }
  console.log('updateMinMax returning', newMinMaxs);
  return newMinMaxs;
}

const yAxis = (state = initialState, action) => {
  console.log('yAxis reducer - action', action);
  switch (action.type) {
    case 'SET_Y_AXIS_TYPE':
      return ({
                ...state,
                yAxisType: action.yAxisType,
              })
    case 'SET_Y_AXIS_RANGE':
      let newMinMaxs = updateMinMax(state, action.yAxisMin, action.yAxisMax);
       return ({
           ...state,
           yAxisMin: action.yAxisMin,
           yAxisMax: action.yAxisMax,
           yAxisMinMaxDefaults: newMinMaxs,
         })
     case 'TOGGLE_TEMP_TYPE':
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
       return ({
                 ...state,
                 tempType: tempType,
                 yAxisType: yAxisType,
               })
    default:
      return state;
  }
}

export default yAxis;
