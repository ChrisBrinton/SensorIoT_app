import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import SelectTempType from '../containers/SelectTempType'
import SetTextField from '../containers/SetTextField'
import DisplayNicknameList from '../containers/DisplayNicknameList'
import DisplaySettingsScrollView from '../containers/DisplaySettingsScrollView'
import SettingsActivityIndicator from '../containers/SettingsActivityIndicator'
import { fetchNicknames, saveNicknames } from '../actions';
import { connect } from 'react-redux';

let createHandlers = function(dispatch) {
  let componentDidFocus = function(payload) {
    console.log('SettingsScreen - didFocus ');
    dispatch(fetchNicknames());
  }

  let componentWillBlur = function() {
    console.log('SettingsScreen - didBlur');
    dispatch(saveNicknames());
  }

  return {
    componentDidFocus,
    componentWillBlur,
  };
}

class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
    //console.log('Output of createHandlers - this.handlers: ', this.handlers);
  }

  componentDidMount() {
    console.log('SettingsScreen - componentDidMount')
    this.subs = [
      this.props.navigation.addListener("didFocus", payload => {this.handlers.componentDidFocus(payload)}),
      this.props.navigation.addListener("willBlur", () => {this.handlers.componentWillBlur()})
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  render() {

    return (
      <View style={settingsScreenPortraitStyles.settingsContainer}>        
        <DisplaySettingsScrollView>
          <View style={settingsScreenPortraitStyles.MQTTrow}>
            <SetTextField
              title='MQTT Server'
              label='MQTT Server'
            />
          </View>
          <View style={settingsScreenPortraitStyles.GWIDrow}>
            <SetTextField
              title='Gateway ID'
              label='Gateway ID'
            />
          </View>
          <View style={settingsScreenPortraitStyles.tempSwitchRow}>
            <Text style={settingsScreenPortraitStyles.tempSwitchText}>
              Temperature Format
            </Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5 }}>

              <Text style={{ paddingRight: 6 }}>C</Text>
              <SelectTempType/>
              <Text style={{ paddingLeft: 6 }}>F</Text>
            </View>
          </View>
          <View style={settingsScreenPortraitStyles.nicknameList}>
              <Text>Node Nicknames</Text>
              <DisplayNicknameList/>
          </View>
        </DisplaySettingsScrollView>
        <SettingsActivityIndicator>
            Loading...
        </SettingsActivityIndicator>
      </View>
    )
  }
}

export default connect()(SettingsScreen);

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
//    color: 'steelblue',
//    backgroundColor: 'blue',
    margin: 10,
  },
  nicknameList: {
//    backgroundColor: '#AADDFF',
    margin: 5,
    marginLeft: 20,
//    borderWidth: 2,
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
    height: 45,
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
