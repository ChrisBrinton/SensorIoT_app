import React from 'React';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import SelectNodes from '../containers/SelectNodes';
import PropTypes from 'prop-types';

const ControlsButtonList = ({ list, children }) => {
  console.log('controlsButtonList created with list:', list);
  let nodeButtons = [];
  for (let i=0; i < list.length; i++) {
    nodeButtons.push(
      <SelectNodes
        key={i}
        nodeIndex={i}>
          {list[i].nodeID}
      </SelectNodes>
    )
  }

  //console.log('ControlsButtonList returning nodeButtons',nodeButtons);
  return (
    nodeButtons
  )
}

export default ControlsButtonList
