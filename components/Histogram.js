import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as d3Scale from 'd3-scale';
import dateFns from 'date-fns';

const Histogram = ({ ...args }) => {
  //console.log('HistogramYAxis min', props.yAxisMin, 'max', props.yAxisMax, 'yAxisLabel', props.yAxisLabel, 'data', props.data,);
  return (
    <View>
      <View style={histogramStyles.histogramContainer}>
        <YAxis
          style={histogramStyles.histogramYLegend}
          data={args.data}
          min={args.yAxisMin}
          max={args.yAxisMax}
          yAccessor={args.yAccessor}
          contentInset={args.contentInsetY}
          svg={args.svgY}
          formatLabel={args.yAxisLabel}>
        </YAxis>
        <LineChart
          style={histogramStyles.histogram}
          data={args.data}
          gridMax={args.yAxisMax}
          gridMin={args.yAxisMin}
          yAccessor={args.yAccessor}
          xAccessor={args.xAccessor}
          xScale={d3Scale.scaleTime}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={args.contentInsetY}
          renderGrid={args.renderGrid}
          extras={args.extras}
        />
      </View>
      <View style={histogramStyles.histogramXLegend}>
        <XAxis
          data={args.data}
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
          data={args.data}
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
})

/*
          <DisplayHistogram
            style={sensorioScreenPortraitStyles.histogramYLegend}
            data={ this.state.histogramData }
            yAccessor={({ item }) => item.value}
            contentInset={ contentInsetY }
            svg={{
              fontSize: 10,
            }}
        />
*/