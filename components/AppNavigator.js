/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator, } from 'react-navigation';
import { SensorIoTScreen } from './SensorIoTScreen';
import { SettingsScreen } from './SettingsScreen';

export const AppNavigator = StackNavigator (
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
  }
);

export class AppWithNavigationState extends Component {
  render () {
    console.log('AppWithNavigationState props', this.props);
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={{
          dispatch,
          state: nav,
          addListener,
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export function createAppWithNavigationState(store) {
  return (
    connect(mapStateToProps)(AppWithNavigationState)
  )
}
