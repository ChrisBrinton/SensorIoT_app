import React from 'React'
import { StyleSheet, Text } from 'react-native'
import { Switch } from 'react-native'

const TypeSwitch = ({ tempType, onValueChange }) => {
  //console.log('TypeSwitch created with tempType:', tempType, 'onValueChange:', onValueChange);
  let value = (tempType == 'F') ? true : false;
  return (
    <Switch
      value={value}
      disabled={false}
      activeText={'Farenheit'}
      inActiveText={'Celcius'}
      backgroundActive={'green'}
      backgroundInactive={'grey'}
      circleActiveColor={'#30a566'}
      circleInActiveColor={'#000000'}
      onValueChange={onValueChange}>
    </Switch>
  )
}

export default TypeSwitch

const typeSwitchStyles = StyleSheet.create({
  switchStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'powderblue',
      margin: 1,
      borderWidth: 2,
    },

});
