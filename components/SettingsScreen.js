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
import { TextField } from 'react-native-material-textfield';
import { Switch } from 'react-native-switch';


export class SettingsScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      myMQTTServer: 'myMQTTServer:5000',
      myGatewayID: 'myGatewayID',
      tempStyle: 'F',
    };
  }

  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: 'powderblue',
    },
    heaterTintColor: 'steelblue',
    headerTitleStyle: {
      fontWeight: 'bold',
      width: '75%',
      alignSelf: 'center',
      textAlign: 'center',
    },
  }

  componentDidMount() {
    AsyncStorage.getItem('myMQTTServer').then((value) => {
      if (value !== null){
        this.setState({myMQTTServer: value});
      }
    }).done();
    AsyncStorage.getItem('myGatewayID').then((value) => {
      if (value !== null){
        this.setState({myGatewayID: value});
      }
      console.log('myGatewayID', value);
    }).done();
    AsyncStorage.getItem('tempStyle').then((value) => {
      if (value !== null){
        this.setState({tempStyle: value});
      }
      let dataType = (value == 'F') ? value = 'TempF' : value = 'TempC';
      console.log('selectedDataType', dataType);
      this.setState({
        selectedDataType: dataType
      });
    }).done();
  }

  render() {
    let { myMQTTServer } = this.state;
    let { myGatewayID } = this.state;
    let { tempStyle } = this.state;
    let tempSwitchState = (tempStyle == 'F')? true : false;

    return (
      <View style={settingsScreenPortraitStyles.settingsContainer}>
        <View style={settingsScreenPortraitStyles.MQTTrow}>
          <TextField
            label='MQTT Server'
            value={myMQTTServer}
            onChangeText={ (myMQTTServer) => {
                AsyncStorage.setItem('myMQTTServer', myMQTTServer);
                this.setState({
                  myMQTTServer,
                });
              }
            }
          />
        </View>
        <View style={settingsScreenPortraitStyles.GWIDrow}>
          <TextField
            label='Gateway ID'
            value={myGatewayID}
            onChangeText={ (myGatewayID) => {
                AsyncStorage.setItem('myGatewayID', myGatewayID);
                this.setState({
                  myGatewayID,
                });
              }
            }
          />
        </View>
        <View style={settingsScreenPortraitStyles.tempSwitchRow}>
          <Text style={settingsScreenPortraitStyles.tempSwitchText}>
            Temperature Format
          </Text>
          <Switch
            value={tempSwitchState}
            disabled={false}
            activeText={'F'}
            inActiveText={'C'}
            backgroundActive={'green'}
            backgroundInactive={'green'}
            style={{marginTop:0}}
            onValueChange={ (value) => {
                let tempStyle = (value) ? 'F' : 'C';
                console.log('Setting tempStyle to', tempStyle);
                AsyncStorage.setItem('tempStyle', tempStyle);
                this.setState({
                  tempStyle,
                });
                this.props.navigation.state.params.parent.updateSettings(myMQTTServer, myGatewayID, tempStyle);
              }
            }
          />
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
