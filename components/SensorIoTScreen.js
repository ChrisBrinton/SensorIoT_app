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
import VisibleYAxis from '../containers/VisibleYAxis';
import SelectSensorType from '../containers/SelectSensorType';
import SelectRange from '../containers/SelectRange';
import NodeList from '../containers/NodeList';
import { yAxisTypes } from '../actions';

const refresh = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export class SensorIoTScreen extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      histogramData: [ {value:1,date:dateFns.setHours(new Date(2018, 1, 2), 6)},
                       {value:2,date:dateFns.setHours(new Date(2018, 1, 3), 6)},
                       {value:3,date:dateFns.setHours(new Date(2018, 1, 4), 6)},
                       {value:4,date:dateFns.setHours(new Date(2018, 1, 5), 6)},
                       {value:5,date:dateFns.setHours(new Date(2018, 1, 6), 6)},
                       {value:6,date:dateFns.setHours(new Date(2018, 1, 7), 6)},
                       {value:7,date:dateFns.setHours(new Date(2018, 1, 8), 6)},
                       {value:8,date:dateFns.setHours(new Date(2018, 1, 9), 6)},
                       {value:8,date:dateFns.setHours(new Date(2018, 1, 13), 6)},
                       {value:9,date:dateFns.setHours(new Date(2018, 1, 14), 6)},
                       {value:10,date:dateFns.setHours(new Date(2018, 1, 15), 6)},
                       {value:11,date:dateFns.setHours(new Date(2018, 1, 16), 6)},
                       {value:12,date:dateFns.setHours(new Date(2018, 1, 17), 6)},
                       {value:13,date:dateFns.setHours(new Date(2018, 1, 18), 6)},
                       {value:14,date:dateFns.setHours(new Date(2018, 1, 19), 6)},
                       {value:15,date:dateFns.setHours(new Date(2018, 1, 20), 6)},
                       {value:16,date:dateFns.setHours(new Date(2018, 1, 21), 6)} ],
      histogramXLegendValues: [ {'date':'Feb 19','time':'10AM'},
                                {'date':'Feb 20','time':'04PM'},
                                {'date':'Feb 21','time':'11AM'},
                                {'date':'Feb 22','time':'04PM'},
                                {'date':'Feb 23','time':'11AM'},
                              ],
      isLoading: false,
    };
  }

  componentDidMount() {
    //this.retrieveNodeList(this.state.myMQTTServer, this.state.myGatewayID, this.state.selectedDisplayInterval);

    //this.retrieveDataArray(this.state.myMQTTServer, this.state.myGatewayID, this.state.selectedDataType, this.state.selectedDisplayInterval);
  }

  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      title: 'Sensorio',
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
            onPress={() => navigation.navigate('Settings', {parent: params.parent})}
            title="Settings"
            color="steelblue"
          />
        </View>
      ),
      headerRight:(
        <View>
        </View>
      ),
    }
  };

  _onPressSettings = () => {
    Alert.alert('navigating!');
    this.props.navigation.navigate('Settings', {updateSettings: () => this.updateSettings()});
  }
  _onPressRefresh = () => {
    jsonArray = this.retrieveDataArray(this.state.myMQTTServer, this.state.myGatewayID, this.state.selectedDataType, this.state.selectedDisplayInterval);
  }
  _onPressOneDay = () => {
    this.retrieveNodeList(this.state.myMQTTServer, this.state.myGatewayID, this.state.selectedDisplayInterval);
    this.setState({
      selectedDisplayInterval: '1D'
    });
  }
  _onPressOneWeek = () => {
    this.retrieveNodeList(this.state.myMQTTServer, this.state.myGatewayID, this.state.selectedDisplayInterval);
    this.setState({
      selectedDisplayInterval: '1W'
    });
  }
  _onPressOneMonth = () => {
    this.retrieveNodeList(this.state.myMQTTServer, this.state.myGatewayID, this.state.selectedDisplayInterval);
    this.setState({
      selectedDisplayInterval: '1M'
    });
  }

  _onPressThreeMonths = () => {
    this.retrieveNodeList(this.state.myMQTTServer, this.state.myGatewayID, this.state.selectedDisplayInterval);
    this.setState({
      selectedDisplayInterval: '3M'
    });
  }
/*
  retrieveNodeList(MQTTGateway, gatewayID, selectedDisplayInterval) {
    let period;
    switch (selectedDisplayInterval) {
      case '1D':
        period = 1;
        break;
      case '1W':
        period = 7;
        break;
      case '1M':
        period = 30;
        break;
      case '3M':
        period = 90;
        break;
      }

    let url = 'http://' + MQTTGateway + '/nodelist/'+ gatewayID + '?period=' + period;

    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let data = [];
        for (let i = 0; i < responseJson.length; i++) {
          let j = this.findNode(this.state.nodeList, responseJson[i])
          let oldIsActive = false;
          if (j != null) {
            oldIsActive = this.state.nodeList[j].isActive;
          }
          let obj = {'nodeID': responseJson[i], 'isActive': oldIsActive};
          data.push(obj);
        }
        this.setState({
          nodeList: data,
        })
      })
      .catch((error) => {
      console.error(error);
    });
  }
*/
  retrieveDataArray(MQTTGateway, gatewayID, selectedDataType, selectedDisplayInterval) {

    this.setState({
      isLoading: true,
    });

    let period;
    switch (selectedDisplayInterval) {
      case '1D':
        period = 1;
        break;
      case '1W':
        period = 7;
        break;
      case '1M':
        period = 30;
        break;
      case '3M':
        period = 90;
        break;
      }
    let dataQueryType;
    switch (selectedDataType) {
      case 'TempF':
        dataQueryType = 'F';
        break;
      case 'TempC':
        dataQueryType = 'F';
        break;
      case 'Hum':
        dataQueryType = 'H';
        break;
      case 'Pres':
        dataQueryType = 'P';
        break;
      case 'Batt':
        dataQueryType = 'BAT';
        break;
      default:
        dataQueryType = 'F';
    }
    let url = 'http://' + MQTTGateway + '/gw/'+ gatewayID + '/42?type=' + dataQueryType + '&period=' + period + '&timezone=EST5EDT';

    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let data = [];
        let xLegendValues = [];
        let count = 0;
        for (j in responseJson[0]) {
          xLegendValues[count] = responseJson[0][j];
          count++;
        }
        for (let i = 1; i < responseJson.length; i++) {
          let valueDate = new Date((responseJson[i].time * 1000)); //js expects epoch time in num of millis
          data[i-1] = {value: responseJson[i].value, date: valueDate}
        }
        this.setState({
          isLoading: false,
          histogramData: data,
          histogramXLegendValues: xLegendValues,
        })
      })
      .catch((error) => {
      console.error(error);
    });

  }

  render() {

    const contentInsetY = { top: 10, bottom: 10, left: 0, right: 0 };
    const contentInsetX = { top: 0, bottom: 0, left: 15, right: 5 };
    const HorizontalLine = (({ y }) => (
      <Line
        key={ 'freeze-axis' }
        x1={ '0%' }
        x2={ '100%' }
        y1={ y(32) }
        y2={ y(32) }
        stroke={ 'red' }
        strokeDasharray={ [ 4, 8 ] }
        strokeWidth={ 2 }
      />
    ))

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
        <View style={sensorioScreenPortraitStyles.histogramContainer}>
          <VisibleYAxis
            style={sensorioScreenPortraitStyles.histogramYLegend}
            data={ this.state.histogramData }
            yAccessor={({ item }) => item.value}
            contentInset={ contentInsetY }
            svg={{
              fontSize: 10,
            }}
          />
          <LineChart
            style={sensorioScreenPortraitStyles.histogram}
            data={ this.state.histogramData }
            gridMax={105}
            gridMin={0}
            yAccessor={({ item }) => item.value}
            xAccessor={({ item }) => item.date}
            xScale={d3Scale.scaleTime}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={ contentInsetY }
            renderGrid={ CustomGrid }
            extras={ [ HorizontalLine, GridBorder ] }
          />
        </View>
        <View style={sensorioScreenPortraitStyles.histogramXLegend}>
          <XAxis
            data={ this.state.histogramData }
            xAccessor={({ item }) => item.date}
            scale={d3Scale.scaleTime}
            numberOfTicks={7}
            style={sensorioScreenPortraitStyles.histogramXLegend}
            formatLabel={ (value) => dateFns.format(value, 'HH:mm')}
            contentInset={ contentInsetX }
            svg={{
                fill: 'black',
                fontSize: 8,
                fontWeight: 'bold',
                rotation: 0,
                originY: 0,
                y: 3,
            }}
          />
        </View>
        <View style={sensorioScreenPortraitStyles.histogramXLegend}>
          <XAxis
            data={ this.state.histogramData }
            xAccessor={({ item }) => item.date}
            scale={d3Scale.scaleTime}
            numberOfTicks={7}
            style={sensorioScreenPortraitStyles.histogramXLegend}
            formatLabel={ (value) => dateFns.format(value, 'MMM DD')}
            contentInset={ contentInsetX }
            svg={{
                fill: 'black',
                fontSize: 8,
                fontWeight: 'bold',
                rotation: 0,
                originY: 0,
                y: 2,
            }}
          />
        </View>
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
          <TouchableHighlight
            onPress={this._onPressRefresh}
            underlayColor="white">
            <View style={sensorioScreenPortraitStyles.refreshContainer}>
              <Text style={sensorioScreenPortraitStyles.refreshButtonText}>
                Refresh
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={sensorioScreenPortraitStyles.finePrintContainer}>
          <Text style={sensorioScreenPortraitStyles.finePrintText}>
          {refresh}
          </Text>
        </View>
        {this.state.isLoading &&
          <View style={sensorioScreenPortraitStyles.activityIndicatorContainer}>
            <ActivityIndicator
              animating = {this.state.isLoading}
              color = 'powderblue'
              size = 'large'
              style = {sensorioScreenPortraitStyles.activityIndicator}
            />
          </View>
        }
      </View>
    );
  }
}
const sensorioScreenPortraitStyles = StyleSheet.create({
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    backgroundColor: 'black',
    opacity: .7,
    borderRadius: 8,
    overflow: 'hidden',
  },
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'powderblue',
  },
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
  refreshText: {
    textAlign: 'center',
    fontSize: 35,
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
