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
import * as d3Scale from 'd3-scale'
import dateFns from 'date-fns'
import VisibleYAxis from '../containers/VisibleYAxis'

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
      selectedDataType: 'TempF',
      selectedDisplayInterval: '1D',
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
      histogramTestLegendValues: ['A','B','C','D','E','F','G','H'],
      isLoading: true,
      myMQTTServer: '',
      myGatewayID: '',
      tempStyle: 'F',
      currentYmin: 0,
      currentYMax: 105,
      nodeList: [ {'nodeID': 1, 'isActive': false},
                  {'nodeID': 2, 'isActive': false},
                  {'nodeID': 3, 'isActive': false},
                ],
    };
  }

  updateSettings(MQTTServer, GatewayID, tempStyle) {
    this.setState({myMQTTServer: MQTTServer});
    this.setState({myGatewayID: GatewayID});
    this.setState({tempStyle: tempStyle});
    let value = (tempStyle == 'F') ? value = 'TempF' : value = 'TempC'
    this.setState({
      selectedDataType: value
    });
}

  componentDidMount() {
    AsyncStorage.getItem('myMQTTServer').then((value) => {
      if (value !== null){
        this.setState({myMQTTServer: value});
      }
      AsyncStorage.getItem('myGatewayID').then((value) => {
        if (value !== null){
          this.setState({myGatewayID: value});
        }
        //Need to nest these so that we have a MQTT Server and GatewayID before we try to fetch.
        this.retrieveNodeList(this.state.myMQTTServer, this.state.myGatewayID, this.state.selectedDisplayInterval);

        this.retrieveDataArray(this.state.myMQTTServer, this.state.myGatewayID, this.state.selectedDataType, this.state.selectedDisplayInterval);

      }).done();
    }).done();

    this.props.navigation.setParams({ parent: this });

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

  _onPressTemp = () => {
    let value = (this.state.tempStyle == 'F') ? value = 'TempF' : value = 'TempC'
    this.retrieveDataArray(this.state.myMQTTServer, this.state.myGatewayID, value, this.state.selectedDisplayInterval);
    store.dispatch(setYAxisScale, value);
  }
  _onPressHum = () => {
    this.retrieveDataArray(this.state.myMQTTServer, this.state.myGatewayID, 'Hum', this.state.selectedDisplayInterval);
    store.dispatch(setYAxisScale, 'Hum');
  }

  _onPressPres = () => {
    this.retrieveDataArray(this.state.myMQTTServer, this.state.myGatewayID, 'Pres', this.state.selectedDisplayInterval);
    store.dispatch(setYAxisScale, 'Pres');
  }

  _onPressBatt = () => {
    this.retrieveDataArray(this.state.myMQTTServer, this.state.myGatewayID, 'Batt', this.state.selectedDisplayInterval);
    store.dispatch(setYAxisScale, 'Batt');
  }

  _onPressNode = (nodeID) => {
    let newNodeList = this.state.nodeList;
    let index = this.findNode(newNodeList, nodeID);
    if (newNodeList[index].isActive == true) {
      newNodeList[index].isActive = false;
    } else {
      newNodeList[index].isActive = true;
    }
    this.setState({
      nodeList: newNodeList,
    })
  }

  findNode(nodeList, nodeID) {
    for (let i=0; i <nodeList.length; i++) {
      if (nodeList[i].nodeID === nodeID) {
        return i;
      }
    }
    return null;
  }

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

    let nodeRows = [];
    for (let i=0; i <this.state.nodeList.length; i++) {
      nodeRows.push(
        <TouchableHighlight
          key={i}
          onPress={() => {this._onPressNode(this.state.nodeList[i].nodeID)}}
          underlayColor="white">
          <View style={sensorioScreenPortraitStyles.controlsButton}>
            <Text style={(this.state.nodeList[i].isActive) ? sensorioScreenPortraitStyles.controlsOnButtonText : sensorioScreenPortraitStyles.controlsButtonText}>
              {this.state.nodeList[i].nodeID}
            </Text>
          </View>
        </TouchableHighlight>
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
            <TouchableHighlight
              onPress={this._onPressOneDay}
              underlayColor="white">
              <View style={sensorioScreenPortraitStyles.controlsButton}>
                <Text style={(this.state.selectedDisplayInterval == '1D') ? sensorioScreenPortraitStyles.controlsOnButtonText : sensorioScreenPortraitStyles.controlsButtonText}>
                  1 D
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._onPressOneWeek}
              underlayColor="white">
              <View style={sensorioScreenPortraitStyles.controlsButton}>
                <Text style={(this.state.selectedDisplayInterval == '1W') ? sensorioScreenPortraitStyles.controlsOnButtonText : sensorioScreenPortraitStyles.controlsButtonText}>
                  1 W
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._onPressOneMonth}
              underlayColor="white">
              <View style={sensorioScreenPortraitStyles.controlsButton}>
                <Text style={(this.state.selectedDisplayInterval == '1M') ? sensorioScreenPortraitStyles.controlsOnButtonText : sensorioScreenPortraitStyles.controlsButtonText}>
                  1 M
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._onPressThreeMonths}
              underlayColor="white">
              <View style={sensorioScreenPortraitStyles.controlsButton}>
                <Text style={(this.state.selectedDisplayInterval == '3M') ? sensorioScreenPortraitStyles.controlsOnButtonText : sensorioScreenPortraitStyles.controlsButtonText}>
                  3 M
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={sensorioScreenPortraitStyles.controlsRowContainer}>
            <TouchableHighlight
              style={sensorioScreenPortraitStyles.buttonStyle}
              onPress={this._onPressTemp}
              underlayColor="white">
              <View style={sensorioScreenPortraitStyles.controlsButton}>
                <Text style={((this.state.selectedDataType == 'TempF') || (this.state.selectedDataType == 'TempC'))? sensorioScreenPortraitStyles.controlsOnButtonText : sensorioScreenPortraitStyles.controlsButtonText}>
                  Temp
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._onPressHum}
              underlayColor="white">
              <View style={sensorioScreenPortraitStyles.controlsButton}>
                <Text style={(this.state.selectedDataType == 'Hum') ? sensorioScreenPortraitStyles.controlsOnButtonText : sensorioScreenPortraitStyles.controlsButtonText}>
                  Hum
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._onPressPres}
              underlayColor="white">
              <View style={sensorioScreenPortraitStyles.controlsButton}>
                <Text style={(this.state.selectedDataType == 'Pres') ? sensorioScreenPortraitStyles.controlsOnButtonText : sensorioScreenPortraitStyles.controlsButtonText}>
                  Pres
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._onPressBatt}
              underlayColor="white">
              <View style={sensorioScreenPortraitStyles.controlsButton}>
                <Text style={(this.state.selectedDataType == 'Batt') ? sensorioScreenPortraitStyles.controlsOnButtonText : sensorioScreenPortraitStyles.controlsButtonText}>
                  Batt
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={sensorioScreenPortraitStyles.controlsRowContainer}>
          {nodeRows}
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
  controlsButton: {
    margin:10,
    width: 60,
    backgroundColor: 'powderblue',
  },
  controlsButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'steelblue',
  },
  controlsOnButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'powderblue',
    backgroundColor: 'steelblue',
    borderRadius: 8,
    overflow: 'hidden',
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
