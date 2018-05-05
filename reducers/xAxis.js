const initialState = {
  xDateRange: 1,
}

const xAxis = (state = initialState, action) => {
  //console.log('xAxis reducer - action', action);
  switch (action.type) {
    case 'SET_X_DATE_RANGE':
      return ({
                ...state,
                xDateRange: action.xDateRange,
              })
    default:
      return state;
  }
}

export default xAxis;
