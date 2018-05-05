import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { G, Line, Rect } from 'react-native-svg';
import { LineChart, YAxis, XAxis } from 'react-native-svg-charts';
import * as d3Scale from 'd3-scale';
import dateFns from 'date-fns';
import DisplayHistogram from '../containers/DisplayHistogram';
import SelectSensorType from '../containers/SelectSensorType';
import SelectRange from '../containers/SelectRange';
import NodeList from '../containers/NodeList';
import DisplayRefreshButton from '../containers/DisplayRefreshButton';
import HistoryActivityIndicator from '../containers/HistoryActivityIndicator';
import { yAxisTypes, fetchNodeList } from '../actions';

const refresh = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export class HistoryScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
   }

  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      title: 'History',
      headerStyle: {
        backgroundColor: 'powderblue',
      },
      heaterTintColor: 'steelblue',
      headerTitleStyle: {
        fontWeight: 'bold',
        width: '90%',
        textAlign: 'center',
        alignSelf: 'center',
      },
      headerLeft:(
        <View>
          <Button
            onPress={() => navigation.navigate('Dashboard', {parent: params.parent})}
            title="Dashboard"
            color="steelblue"
          />
        </View>
      ),
      headerRight:(
        <View>
          <Button
            onPress={() => navigation.navigate('Settings', {parent: params.parent})}
            title="Settings"
            color="steelblue"
          />
        </View>
      ),
    }
  };

  _onPressSettings = () => {
    this.props.navigation.navigate('Settings', {updateSettings: () => this.updateSettings()});
  }

  render() {

    const contentInsetY = { top: 10, bottom: 10, left: 0, right: 0 };
    const contentInsetX = { top: 0, bottom: 0, left: 15, right: 5 };

    const CustomGrid = ({ x, y, data, ticks }) => {

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

    return (
      <View style={sensorioScreenPortraitStyles.appContainer}>
        <DisplayHistogram
          yAccessor={({ item }) => item.value}
          xAccessor={({ item }) => item.date}
          contentInsetY={ contentInsetY }
          contentInsetX={ contentInsetX }
          svgY={{
            fontSize: 10,
          }}
          renderGrid={ CustomGrid }
          svgX={{
            fill: 'black',
            fontSize: 8,
            fontWeight: 'bold',
            rotation: 0,
            originY: 0,
            y: 3,
          }}
        />
        <View style={sensorioScreenPortraitStyles.controlsContainer}>
          <View style={sensorioScreenPortraitStyles.controlsRowContainer}>
            <SelectRange xDateRange={'1'}>
              1 D
            </SelectRange>
            <SelectRange xDateRange={'7'}>
              1 W
            </SelectRange>
            <SelectRange xDateRange={'30'}>
              1 M
            </SelectRange>
            <SelectRange xDateRange={'93'}>
              3 M
            </SelectRange>
          </View>
          <View style={sensorioScreenPortraitStyles.controlsRowContainer}>
            <SelectSensorType yAxisType={yAxisTypes.TempF}>
              Temp
            </SelectSensorType>
            <SelectSensorType yAxisType={yAxisTypes.Hum}>
              Hum
            </SelectSensorType>
            <SelectSensorType yAxisType={yAxisTypes.Pres}>
              Pres
            </SelectSensorType>
            <SelectSensorType yAxisType={yAxisTypes.Batt}>
              Batt
            </SelectSensorType>
          </View>
          <View style={sensorioScreenPortraitStyles.controlsRowContainer}>
            <NodeList>
            </NodeList>
          </View>
        </View>
        <View style={sensorioScreenPortraitStyles.refreshContainer}>
          <DisplayRefreshButton/>
        </View>
        <View style={sensorioScreenPortraitStyles.finePrintContainer}>
          <Text style={sensorioScreenPortraitStyles.finePrintText}>
          {refresh}
          </Text>
        </View>
        <HistoryActivityIndicator>
          Loading...
        </HistoryActivityIndicator>
      </View>
    );
  }
}
const sensorioScreenPortraitStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'powderblue',
  },
  controlsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginBottom: 5,
    marginTop:5,
    height: 150,
//    backgroundColor: '#AAAAAA',
  },
  controlsRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    height: 45,
//    backgroundColor: '#776655'
  },
  refreshButtonText: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 35,
  },
  refreshContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'powderblue',
    margin: 10,
    marginTop: 5,
    height: 75,
  },
  finePrintContainer: {
    backgroundColor: 'powderblue',
    margin: 10,
    marginTop: 5,
  },
  finePrintText: {
    textAlign: 'center',
  }
});
