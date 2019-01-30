import React from 'React';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

function getButtonStyle(active, nodeColor) {
  let currentColor = 'steelblue';
  let currentBackgroundColor = 'steelblue';
  if (active) {
    if (typeof nodeColor != 'undefined') {
      currentBackgroundColor = nodeColor;
    } else {
      currentBackgroundColor = 'steelblue';
    }
    newStyle = {
      textAlign: 'center',
      fontSize: 18,
      color: 'powderblue',
      backgroundColor: currentBackgroundColor,
      borderRadius: 8,
      overflow: 'hidden',
      }
  } else {
    if (typeof nodeColor != 'undefined') {
      currentColor = nodeColor;
    } else {
      currentColor = 'steelblue';
    }
    newStyle = {
      textAlign: 'center',
      fontSize: 18,
      color: currentColor,
    }
  }
  //console.log('ControlsButton getButtonStyle returning', newStyle, 'based on active', active, 'nodeColor', nodeColor,'currentColor', currentColor, 'currentBackgroundColor', currentBackgroundColor);
  return newStyle;
}

const ControlsButton = ({ active, nodeColor, children, onPress }) => {
  //console.log('ControlsButton created with children:', children);
  return (
    <TouchableHighlight
      onPress={onPress}
      style={controlsButtonStyles.buttonStyle}
      underlayColor="white"
      >
      <View style={controlsButtonStyles.controlsButton}>
        <Text style={getButtonStyle(active, nodeColor)}>
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
    margin:5, //10
    width: 75,
//    borderWidth: 1,
//    borderRadius: 8,
//    borderColor: '#318f9b',
    backgroundColor: 'powderblue',
  },
  controlsButtonText: {
    textAlign: 'center',
    fontSize: 18,
  },
  controlsOnButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'powderblue',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
