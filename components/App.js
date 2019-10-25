import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SettingsScreen from './SettingsScreen';
import { HistoryScreen } from './HistoryScreen';
import DashboardScreen from './DashboardScreen';
import SettingsCheckScreen from './SettingsCheckScreen';
import { connect } from 'react-redux'
import { fetchNodeList, fetchNicknames, fetchNodeLatestData } from '../actions';
import SplashScreen from 'react-native-splash-screen';

const RootStack = createStackNavigator(
    {
      Dashboard: DashboardScreen,
      History: HistoryScreen,
      Settings: SettingsScreen,
    }
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  }
)
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      SettingsCheck: SettingsCheckScreen,
      Root: RootStack,
      Settings: SettingsStack,
    },
    {
      initialRouteName: 'SettingsCheck',
    }
  )
);

class App extends Component {
  componentDidMount() {
    this.props.fetchNodeList();
    //this.props.fetchSensorData();
    this.props.fetchNodeLatestData();
    this.props.fetchNicknames();
    SplashScreen.hide();
  }

  render() {
    return <AppContainer
      onNavigationStateChange={handleNavigationChange}
      uriPrefix="/app"
     />
  }
}

function handleNavigationChange() {
  console.log("handleNavigationChange");
  return;
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
    fetchNicknames: () => {
      return(dispatch(fetchNicknames()))
    },
    fetchNodeLatestData: () => {
      return(dispatch(fetchNodeLatestData()))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
