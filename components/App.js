import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { SettingsScreen } from './SettingsScreen';
import { HistoryScreen } from './HistoryScreen';
import { DashboardScreen } from './DashboardScreen';
import { connect } from 'react-redux'
import { fetchNodeList, fetchSensorData, fetchNodeLatestData } from '../actions';
import SplashScreen from 'react-native-splash-screen';

//static navigationOptions = ({navigation}) => {
const RootStack = StackNavigator(
    {
      Dashboard: {
        screen: DashboardScreen,
      },
      History: {
        screen: HistoryScreen,
      },
      Settings: {
        screen: SettingsScreen,
      },
    },
    {
      initialRouteName: 'Dashboard',
    },
);

class App extends Component {
  componentDidMount() {
    this.props.fetchNodeList();
    //this.props.fetchSensorData();
    this.props.fetchNodeLatestData();
    SplashScreen.hide();
  }

  render() {
    return <RootStack />
  }
}

const mapStateToProps = (state) => ({
  init: state.init
})

const mapDispatchToProps = (dispatch, getState) => {
  return {
    fetchNodeList: () => {
      return(dispatch(fetchNodeList()))
    },
    fetchSensorData: () => {
      return(dispatch(fetchSensorData()))
    },
    fetchNodeLatestData: () => {
      return(dispatch(fetchNodeLatestData()))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
