import React from 'react'
import { YAxis } from 'react-native-svg-charts';

const SensorIoTYAxis = ({ props, min, max, yLabel }) => {
  console.log('min', min, 'max', max, 'yLabel', yLabel);
  return (
    <YAxis
      style={ props.style }
      data={ props.data }
      max={ max }
      min={ min }
      yAccessor={ props.yAccessor }
      contentInset={ props.contentInset }
      svg={ props.svg }
      formatLabel={ yLabel }
    />
)}

export default SensorIoTYAxis
