import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as d3Scale from 'd3-scale';
import dateFns from 'date-fns';
import { Line, Rect } from 'react-native-svg';

const HorizontalLine = (threshold, color) => {
  //console.log('HorizontalLine Threshold', threshold);
  if (typeof threshold != 'undefined') {
    return (({ y }) => (
      <Line
        key={ threshold }
        x1={ '0%' }
        x2={ '100%' }
        y1={ y(threshold) }
        y2={ y(threshold) }
        stroke={ color }
        strokeDasharray={ [ 4, 8 ] }
        strokeWidth={ 2 }
      />
    ))
  } else {
    return (() => {return})
  }
}

const GridBorder = (({width, height}) => (
  <Rect
    key={ 'grid-border' }
    x='0'
    y='0'
    width={ width-1 }
    height={ height-1 }
    fillOpacity='0'
    strokeWidth='1'
    stroke='grey'
  />
))

function getNodeColor(nodeID, nodeList) {
  for (i in nodeList) {
    if (nodeList[i].nodeID == nodeID) {
      return nodeList[i].color
    }
  }
  return 'red' //default color
}

const Histogram = ({ ...args }) => {
  //console.log('HistogramYAxis min', props.yAxisMin, 'max', props.yAxisMax, 'yAxisLabel', props.yAxisLabel, 'data', props.data,);
  let dataSets = [];
  //console.log('Histogram args.data', args.data);
  for (let i=0; i < args.data.length; i++) {
    let color = getNodeColor(args.data[i].nodeID, args.nodeList);
    dataSets.push(
      <LineChart
        key={i}
        style={histogramStyles.overlayGraph}
        data={args.data[i].sensorData}
        gridMax={args.yAxisMax}
        gridMin={args.yAxisMin}
        yAccessor={args.yAccessor}
        xAccessor={args.xAccessor}
        xScale={d3Scale.scaleTime}
        svg={{ stroke: color }}
        contentInset={args.contentInsetY}
        />
    )
  }
  color = getNodeColor(args.data[0].nodeID, args.nodeList);
  return (
    <View>
      <View style={histogramStyles.histogramContainer}>
        <YAxis
          style={histogramStyles.histogramYLegend}
          data={args.data[0].sensorData}
          min={args.yAxisMin}
          max={args.yAxisMax}
          yAccessor={args.yAccessor}
          contentInset={args.contentInsetY}
          svg={args.svgY}
          formatLabel={args.yAxisLabel}>
        </YAxis>
        <LineChart
          style={histogramStyles.histogram}
          data={args.data[0].sensorData}
          gridMax={args.yAxisMax}
          gridMin={args.yAxisMin}
          yAccessor={args.yAccessor}
          xAccessor={args.xAccessor}
          xScale={d3Scale.scaleTime}
          svg={{ stroke: args.nodeList[0].color }}
          contentInset={args.contentInsetY}
          renderGrid={args.renderGrid}
          extras={[HorizontalLine(args.lowThreshold,'blue'), HorizontalLine(args.highThreshold,'red'), GridBorder]}
        />
        {dataSets}
      </View>
      <View style={histogramStyles.histogramXLegend}>
        <XAxis
          data={args.data[0].sensorData}
          xAccessor={args.xAccessor}
          scale={d3Scale.scaleTime}
          numberOfTicks={7}
          style={histogramStyles.histogramXLegend}
          formatLabel={(value) => dateFns.format(value, 'HH:mm')}
          contentInset={args.contentInsetX}
          svg={args.svgX}
        />
      </View>
      <View style={histogramStyles.histogramXLegend}>
        <XAxis
          data={args.data[0].sensorData}
          xAccessor={({ item }) => item.date}
          scale={d3Scale.scaleTime}
          numberOfTicks={7}
          style={histogramStyles.histogramXLegend}
          formatLabel={(value) => dateFns.format(value, 'MMM DD')}
          contentInset={args.contentInsetX}
          svg={args.svgX}
        />
      </View>
    </View>
  )
}

export default Histogram

const histogramStyles = StyleSheet.create({
  histogramContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 0,
    marginTop: 40,
    height: 300,
//    backgroundColor: 'skyblue',
  },
  histogramYLegend: {
  },
  histogramXLegend: {
    flexDirection: 'column',
    marginLeft: 11.5,
    marginRight: 5,
    height: 12,
  //    backgroundColor: 'skyblue'
  },
  histogram: {
    flex: 1,
    marginLeft: 0,
    marginRight: 5,
  },
  overlayGraph: {
    ...StyleSheet.absoluteFillObject,
    marginLeft: 28,
    marginRight: 5,
    marginBottom: 0,
    marginTop: 0,
  },
})
