import React from 'react'
import { Text } from 'react-native'
import { YAxis } from 'react-native-svg-charts'

const HistogramYAxis = ({ ...args }) => {
  //console.log('HistogramYAxis min', props.yAxisMin, 'max', props.yAxisMax, 'yAxisLabel', props.yAxisLabel, 'data', props.data,);
  return (
    <YAxis
      style={args.style}
      data={args.data}
      min={args.yAxisMin}
      max={args.yAxisMax}
      yAccessor={args.yAccessor}
      contentInset={args.contentInset}
      svg={args.svg}
      formatLabel={args.yAxisLabel}>
    </YAxis>
)}

export default HistogramYAxis
