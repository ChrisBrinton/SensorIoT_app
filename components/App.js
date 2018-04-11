import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { SettingsScreen } from './SettingsScreen';
import { SensorIoTScreen } from './SensorIoTScreen';
import { connect } from 'react-redux'
import { fetchNodeList, fetchSensorData } from '../actions';

//static navigationOptions = ({navigation}) => {
const RootStack = StackNavigator(
    {
      SensorIoT: {
        screen: SensorIoTScreen,
      },
      Settings: {
        screen: SettingsScreen,
      },
    },
    {
      initialRouteName: 'SensorIoT',
    },
);

class App extends Component {
  componentDidMount() {
    this.props.fetchNodeList();
    this.props.fetchSensorData();
  }

  render() {
    return <RootStack />
  }
}

const mapStateToProps = (state) => ({
  init: state.init
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNodeList: () => {
      return(dispatch(fetchNodeList()))
    },
    fetchSensorData: () => {
      return(dispatch(fetchSensorData()))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
