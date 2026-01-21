import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { G, Line, Rect } from 'react-native-svg';
import { format } from 'date-fns';
import * as d3Scale from 'd3-scale';

const { width: screenWidth } = Dimensions.get('window');

// Custom grid component
const CustomGrid = ({ x, y, data, ticks }) => {
  if (!data || data.length === 0) return null;
  
  const xValues = data.map((item) => item.date);
  const xDomain = d3Scale.scaleTime().domain(xValues).range([0, 0]);
  const xTicks = xDomain.ticks(7);

  return (
    <G>
      {/* Horizontal grid */}
      {ticks.map((tick) => (
        <Line
          key={tick}
          x1="0%"
          x2="100%"
          y1={y(tick)}
          y2={y(tick)}
          stroke="rgba(0,0,0,0.2)"
        />
      ))}
      {/* Vertical grid */}
      {xTicks.map((value, index) => (
        <Line
          key={index}
          y1="0%"
          y2="100%"
          x1={x(value)}
          x2={x(value)}
          stroke="rgba(0,0,0,0.2)"
        />
      ))}
    </G>
  );
};

// Horizontal threshold line
const HorizontalLine = ({ y, threshold, color }) => {
  if (isNaN(threshold)) return null;

  return (
    <Line
      key={threshold}
      x1="0%"
      x2="100%"
      y1={y(threshold)}
      y2={y(threshold)}
      stroke={color}
      strokeDasharray="4, 8"
      strokeWidth={2}
    />
  );
};

// Grid border
const GridBorder = ({ width, height }) => (
  <Rect
    key="grid-border"
    x="0"
    y="0"
    width={width - 1}
    height={height - 1}
    fillOpacity="0"
    strokeWidth="1"
    stroke="grey"
  />
);

function getNodeColor(gateway_id, nodeID, nodeList) {
  for (let i in nodeList) {
    if (nodeList[i].gateway_id === gateway_id) {
      for (let j in nodeList[i].nodes) {
        if (nodeList[i].nodes[j].nodeID === nodeID) {
          return nodeList[i].nodes[j].color;
        }
      }
    }
  }
  return '#C14242'; // default color
}

function getLabelFromType(type) {
  switch (type) {
    case 'TempF':
      return (value) => `${value}°F`;
    case 'TempC':
      return (value) => `${value}°C`;
    case 'Hum':
      return (value) => `${value}%`;
    case 'Pres':
      return (value) => `${value}inHg`;
    case 'Batt':
      return (value) => `${value}V`;
    default:
      return (value) => `${value}`;
  }
}

function Histogram({ contentInsetY, contentInsetX }) {
  const dispatch = useDispatch();
  const yAxis = useSelector((state) => state.yAxis);
  const histogramDataSet = useSelector((state) => state.histogramDataSet);

  // Get range from type
  let yAxisMin = 0;
  let yAxisMax = 100;
  for (let i in yAxis.yAxisMinMaxDefaults) {
    if (yAxis.yAxisType === yAxis.yAxisMinMaxDefaults[i].dataType) {
      yAxisMin = yAxis.yAxisMinMaxDefaults[i].yMin;
      yAxisMax = yAxis.yAxisMinMaxDefaults[i].yMax;
      break;
    }
  }

  // Process data - convert to C if needed
  let data = histogramDataSet.data;
  if (yAxis.yAxisType === 'TempC') {
    data = [];
    for (let i in histogramDataSet.data) {
      const newData = [];
      for (let j in histogramDataSet.data[i].nodes) {
        newData.push({
          nodeID: histogramDataSet.data[i].nodes[j].nodeID,
          sensorData: histogramDataSet.data[i].nodes[j].sensorData.map((item) => ({
            value: (item.value - 32) / 1.8,
            date: item.date,
          })),
        });
      }
      data.push({
        gateway_id: histogramDataSet.data[i].gateway_id,
        nodes: newData,
      });
    }
  }

  const yAxisLabel = getLabelFromType(yAxis.yAxisType);

  // Flatten all data for the chart
  const allSeries = [];
  for (let i in data) {
    for (let j in data[i].nodes) {
      const node = data[i].nodes[j];
      // Check if node is active
      const isActive = histogramDataSet.nodeList[i]?.nodes?.find(
        (n) => n.nodeID === node.nodeID
      )?.isActive;

      if (isActive && node.sensorData && node.sensorData.length > 0) {
        allSeries.push({
          gateway_id: data[i].gateway_id,
          nodeID: node.nodeID,
          data: node.sensorData,
          color: getNodeColor(data[i].gateway_id, node.nodeID, histogramDataSet.nodeList),
        });
      }
    }
  }

  if (allSeries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No data to display</Text>
        <Text style={styles.emptySubtext}>
          Select a node from the controls below
        </Text>
      </View>
    );
  }

  // Get date range for x-axis
  let minDate = new Date();
  let maxDate = new Date(0);
  allSeries.forEach((series) => {
    series.data.forEach((point) => {
      if (point.date < minDate) minDate = point.date;
      if (point.date > maxDate) maxDate = point.date;
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <YAxis
          data={[yAxisMin, yAxisMax]}
          contentInset={contentInsetY}
          svg={{ fontSize: 10, fill: 'grey' }}
          formatLabel={yAxisLabel}
          numberOfTicks={6}
          style={styles.yAxis}
        />
        <View style={styles.chartArea}>
          {allSeries.map((series, index) => (
            <LineChart
              key={`${series.gateway_id}-${series.nodeID}`}
              style={[StyleSheet.absoluteFill]}
              data={series.data}
              yAccessor={({ item }) => item.value}
              xAccessor={({ item }) => item.date}
              yMin={yAxisMin}
              yMax={yAxisMax}
              xMin={minDate}
              xMax={maxDate}
              contentInset={{ ...contentInsetY, ...contentInsetX }}
              svg={{ stroke: series.color, strokeWidth: 2 }}
            >
              {index === 0 && <Grid svg={{ stroke: 'rgba(0,0,0,0.1)' }} />}
              {index === 0 && yAxis.lowThreshold && (
                <HorizontalLine threshold={yAxis.lowThreshold} color="blue" />
              )}
              {index === 0 && yAxis.highThreshold && (
                <HorizontalLine threshold={yAxis.highThreshold} color="red" />
              )}
            </LineChart>
          ))}
        </View>
      </View>
      <XAxis
        data={[minDate, maxDate]}
        xAccessor={({ item }) => item}
        contentInset={contentInsetX}
        svg={{ fontSize: 10, fill: 'grey' }}
        formatLabel={(value) => format(new Date(value), 'MM/dd')}
        numberOfTicks={5}
        style={styles.xAxis}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
  },
  chartContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  yAxis: {
    width: 50,
  },
  chartArea: {
    flex: 1,
  },
  xAxis: {
    marginLeft: 50,
    height: 20,
  },
  emptyContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  emptySubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default Histogram;
