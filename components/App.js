import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { SettingsScreen } from './components/SettingsScreen';
import { SensorIoTScreen } from './components/SensorIoTScreen';

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

export default class App extends Component<Props> {
  render() {
    return <RootStack />
  }
}
