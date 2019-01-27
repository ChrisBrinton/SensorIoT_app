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

import DisplayHistogram from '../containers/DisplayHistogram';
import SelectSensorType from '../containers/SelectSensorType';
import SelectRange from '../containers/SelectRange';
import NodeList from '../containers/NodeList';
import DisplayRefreshButton from '../containers/DisplayRefreshButton';
import HistoryActivityIndicator from '../containers/HistoryActivityIndicator';
import { yAxisTypes, fetchNodeList } from '../actions';

export class HistoryScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('HistoryScreen - componentDidMount')
  }

  componentWillMount() {
    console.log('HistoryScreen - componentWillMount')
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

    return (
      <View style={sensoriotScreenPortraitStyles.appContainer}>
        <DisplayHistogram
          yAccessor={({ item }) => item.value}
          xAccessor={({ item }) => item.date}
          contentInsetY={ contentInsetY }
          contentInsetX={ contentInsetX }
          svgY={{
            fontSize: 10,
          }}
          svgX={{
            fill: 'black',
            fontSize: 8,
            fontWeight: 'bold',
            rotation: 0,
            originY: 0,
            y: 3,
          }}
          >
        </DisplayHistogram>
        <View style={sensoriotScreenPortraitStyles.controlsContainer}>
          <View style={sensoriotScreenPortraitStyles.controlsRowContainer}>
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
          <View style={sensoriotScreenPortraitStyles.controlsRowContainer}>
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
          <View style={sensoriotScreenPortraitStyles.controlsRowContainer}>
            <NodeList>
            </NodeList>
          </View>
          <View style={sensoriotScreenPortraitStyles.refreshContainer}>
            <DisplayRefreshButton/>
          </View>
        </View>
        <HistoryActivityIndicator>
          Loading...
        </HistoryActivityIndicator>
      </View>
    );
  }
}
const sensoriotScreenPortraitStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
//    height: 900,
    alignItems: 'stretch',
    backgroundColor: 'powderblue',
//    backgroundColor: '#CCDDEE',
},
  controlsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10, //10
    marginTop: 20,
//    marginBottom: 5,
//    marginTop:5,
//    height: 150,
//    backgroundColor: '#AAAAAA',
  },
  controlsRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 1, //5
//    height: 45,
//    backgroundColor: '#776655',
  },
  refreshButtonText: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 15, //35
  },
  refreshContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'powderblue',
    margin: 1, //10
    marginTop: 1, //5
//    height: 75,
//    backgroundColor: '#665544',
  },
});
