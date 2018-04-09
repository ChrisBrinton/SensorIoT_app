import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SelectTempType from '../containers/SelectTempType'
import SetTextField from '../containers/SetTextField'


const _onChangeText= () => {};

export class SettingsScreen extends Component<{}> {
  render() {

    return (
      <View style={settingsScreenPortraitStyles.settingsContainer}>
        <View style={settingsScreenPortraitStyles.MQTTrow}>
          <SetTextField
            label='MQTT Server'
          />
        </View>
        <View style={settingsScreenPortraitStyles.GWIDrow}>
          <SetTextField
            label='Gateway ID'
          />
        </View>
        <View style={settingsScreenPortraitStyles.tempSwitchRow}>
          <Text style={settingsScreenPortraitStyles.tempSwitchText}>
            Temperature Format
          </Text>
          <SelectTempType/>
        </View>
      </View>
    )
  }
}

const settingsScreenPortraitStyles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'powderblue',
  },
  settingsTextInput: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 40,
    width: 100,
    color: 'steelblue',
    backgroundColor: 'blue',
    margin: 10,
  },
  MQTTrow: {
    height: 75,
    backgroundColor: 'powderblue',
    margin:5,
    marginLeft:20,
//    backgroundColor: '#889900',
  },
  GWIDrow: {
    height: 75,
    backgroundColor: 'powderblue',
    margin:5,
    marginLeft:20,
//    backgroundColor: '#00AABB',
  },
  tempSwitchRow: {
    height: 75,
    justifyContent: 'center',
    backgroundColor: 'powderblue',
    margin:5,
    marginLeft:20,
//    backgroundColor: '#BBAA00',
  },
  tempSwitchText: {
    fontSize: 12,
    marginBottom: 5,
  },
});
