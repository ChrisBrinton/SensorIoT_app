import React from 'React';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const ControlsButton = ({active, children, onPress }) => {
  console.log('ControlsButton created with children:', children);
  return (
    <TouchableHighlight
      onPress={onPress}
      style={controlsButtonStyles.buttonStyle}
      underlayColor="white"
      >
      <View style={controlsButtonStyles.controlsButton}>
        <Text style={(active) ? controlsButtonStyles.controlsOnButtonText : controlsButtonStyles.controlsButtonText}>
          {children}
        </Text>
      </View>
      </TouchableHighlight>
  )
}

export default ControlsButton

ControlsButton.propTypes = {
  onPress: PropTypes.func.isRequired,
}

const controlsButtonStyles = StyleSheet.create({
  controlsButton: {
    margin:10,
    width: 60,
    backgroundColor: 'powderblue',
  },
  controlsButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'steelblue',
  },
  controlsOnButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'powderblue',
    backgroundColor: 'steelblue',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
