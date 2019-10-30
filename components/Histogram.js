import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as d3Scale from 'd3-scale';
import dateFns from 'date-fns';
import { G, Line, Rect } from 'react-native-svg';

var format = require('date-fns/format');

const CustomGrid = ({ x, y, data, ticks }) => {

  //console.log('CustomGrid - x ', x, ' y ', y, ' data ', data, ' ticks ', ticks);

  const xValues = data.map((item, index) => item.date)
  const xDomain = d3Scale.scaleTime()
          .domain(xValues)
          .range(0, 0)

  const xTicks = xDomain.ticks(7)

  return (
    <G>
          {
              // Horizontal grid
              ticks.map(tick => (
                  <Line
                      key={ tick }
                      x1={ '0%' }
                      x2={ '100%' }
                      y1={ y(tick) }
                      y2={ y(tick) }
                      stroke={ 'rgba(0,0,0,0.2)' }
                  />
              ))
          }
          {
              // Vertical grid
              xTicks.map((value, index) => (
                  <Line
                      key={ index }
                      y1={ '0%' }
                      y2={ '100%' }
                      x1={ x(value) }
                      x2={ x(value) }
                      stroke={ 'rgba(0,0,0,0.2)' }
                  />
              ))
          }
      </G>
  )
}


const HorizontalLine = ({ y, threshold, color }) => {
  if ( isNaN(threshold))
    return null;

  console.log('HorizonalLine threshold ', threshold, ' color ', color);
  return(
    <Line
      key={ threshold }
      x1={ '0%' }
      x2={ '100%' }
      y1={ y(threshold) }
      y2={ y(threshold) }
      stroke={ color }
      strokeDasharray={ '4, 8' }
      strokeWidth={ 2 }
    />
  )
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

function getNodeColor(gateway_id, nodeID, nodeList) {
  for (let i in nodeList) {
    if (nodeList[i].gateway_id == gateway_id) {
      for (let j in nodeList[i].nodes) {
        if (nodeList[i].nodes[j].nodeID == nodeID) {
          return nodeList[i].nodes[j].color;
        }    
      }
    }
  }
  return 'red' //default color
}
class Histogram extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Histogram - componentDidMount');
    this.props.loadDefaultNodeData();
  }

  componentWillUnmount() {
    this.props.clearSelectedNodes();
  }

  render() {
    args = Object.assign({}, this.props);
    console.log('HistogramYAxis min', this.props.yAxisMin, 'max', this.props.yAxisMax, 'yAxisLabel', this.props.yAxisLabel, 'data', this.props.data,);
    
    let dataSets = [];
    console.log('Histogram args', args);
    for (let i in args.data) {
      for (let j in args.data[i].nodes) {
        let color = getNodeColor(args.data[i].gateway_id, args.data[i].nodes[j].nodeID, args.nodeList);
        console.log('Histogram - adding gw ', args.data[i].gateway_id, ' node ', args.data[i].nodes[j].nodeID);
        dataSets.push(
          <LineChart
            key={i*args.data.length+j}
            style={histogramStyles.overlayGraph}
            data={args.data[i].nodes[j].sensorData}
            yMax={args.yAxisMax}
            yMin={args.yAxisMin}
            yAccessor={args.yAccessor}
            xAccessor={args.xAccessor}
            xScale={d3Scale.scaleTime}
            svg={{ stroke: color }}
            contentInset={args.contentInsetY}
          >
          </LineChart>
        )
      }
    }
    //remove the first dataSet to avoid drawing the first graph twice
    dataSets.shift();
    let graphData = [];
    if(args.data.length > 0) {
      graphData = args.data[0].nodes[0].sensorData;
      console.log('Histogram - adding gw ', args.data[0].gateway_id, ' node ', args.data[0].nodes[0].nodeID);
      color = getNodeColor(args.data[0].gateway_id, args.data[0].nodes[0].nodeID, args.nodeList);
    } else {
      console.log('Histogram - no data to display');
      graphData = [{ value: -25, date: new Date(2019, 9, 3, 6, 0, 0) }, { value: -25, date: new Date(2019, 9, 4, 6, 0, 0) }]
      color = 'red';
    }

    return (
      <View>
        <View style={histogramStyles.histogramContainer}>
          <YAxis
            style={histogramStyles.histogramYLegend}
            data={graphData}
            min={args.yAxisMin}
            max={args.yAxisMax}
            yAccessor={args.yAccessor}
            contentInset={args.contentInsetY}
            svg={args.svgY}
            formatLabel={args.yAxisLabel}>
          </YAxis>
          <LineChart
            style={histogramStyles.histogram}
            data={graphData}
            yMax={args.yAxisMax}
            yMin={args.yAxisMin}
            yAccessor={args.yAccessor}
            xAccessor={args.xAccessor}
            xScale={d3Scale.scaleTime}
            svg={{ stroke: color }}
            contentInset={args.contentInsetY}
          >
            <HorizontalLine threshold={args.lowThreshold} color={'blue'} />
            <HorizontalLine threshold={args.highThreshold} color={'red'} />
            <CustomGrid />
            <GridBorder />
          </LineChart>
          {dataSets}
        </View>
        <View style={histogramStyles.histogramXLegend}>
          <XAxis
            data={graphData}
            xAccessor={args.xAccessor}
            scale={d3Scale.scaleTime}
            numberOfTicks={7}
            style={histogramStyles.histogramXLegend}
            formatLabel={(value) => format(value, 'HH:mm')}
            contentInset={args.contentInsetX}
            svg={args.svgX}
          />
        </View>
        <View style={histogramStyles.histogramXLegend}>
          <XAxis
            data={graphData}
            xAccessor={({ item }) => item.date}
            scale={d3Scale.scaleTime}
            numberOfTicks={7}
            style={histogramStyles.histogramXLegend}
            formatLabel={(value) => format(value, 'LLL dd')}
            contentInset={args.contentInsetX}
            svg={args.svgX}
          />
        </View>
      </View>
    )
  }


}

export default Histogram

const histogramStyles = StyleSheet.create({
  histogramContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 0,
    marginTop: 4,//40
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
