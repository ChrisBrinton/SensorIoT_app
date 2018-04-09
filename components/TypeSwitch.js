import React from 'React'
import { TouchableHighlight, Text } from 'react-native'
import PropTypes from 'prop-types'
import { Switch } from 'react-native-switch';

const TypeSwitch = ({ tempType, onValueChange }) => {
  //console.log('TypeSwitch created with tempType:', tempType, 'onValueChange:', onValueChange);
  let value = (tempType == 'F') ? true : false;
  return (
    <Switch
      value={value}
      disabled={false}
      activeText={'F'}
      inActiveText={'C'}
      backgroundActive={'green'}
      backgroundInactive={'green'}
      style={{marginTop:0}}
      onValueChange={onValueChange}>
    </Switch>
  )
}

export default TypeSwitch
