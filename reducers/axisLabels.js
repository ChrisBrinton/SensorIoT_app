/* with a persisted store and autorehydrate, this shouldnt be required.
  AsyncStorage.getItem('tempStyle').then((value) => {
    if (value !== null){
      this.setState({tempStyle: value});
      let dataType;
      if (this.state.tempStyle == 'F') {
        dateType = 'TempF';
        _setYMinMax( dataType );
      } else {
        dateType = 'TempC';
        _setYMinMax( dataType );
      }
      console.log('selectedDataType', dataType);
      this.setState({
        selectedDataType: dataType
      });
    }
  }).done();
*/


const axisLabels = (state = [], action) => {
  switch (action.type) {
    case 'SET_Y_AXIS_SCALE':
      return [
        ...state,
        {
          yAxisScale: action.scale,
        }
      ]
     case 'SET_Y_AXIS_RANGE':
       return [
         ...state,
         {
           yAxisMin: action.min,
           yAxisMax: action.max,
         }
       ]
      default:
        return [
          ...state,
          {
            yAxisScale: 'TempF',
            yAxisMin: '0',
            yAxisMax: '105',
          }
        ]
  }
}

export default axisLabels;
