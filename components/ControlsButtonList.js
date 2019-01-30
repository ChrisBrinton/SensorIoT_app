import React from 'React';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import SelectNodes from '../containers/SelectNodes';
import PropTypes from 'prop-types';

const getNicknameForNodeID = (nodeID, nicknames) => {
  let label=nodeID;
  for( i=0; i<nicknames.length; i++ ) {
    if (nodeID == nicknames[i].nodeID) {
      label = nicknames[i].shortname;
    }
  }
  return label;
}

const ControlsButtonList = ({ list, nicknames, children }) => {
  console.log('controlsButtonList created with list:', list);
  let nodeButtons = [];
  for (let i=0; i < list.length; i++) {
    label = getNicknameForNodeID(list[i].nodeID, nicknames);
    nodeButtons.push(
      <SelectNodes
        key={i}
        nodeIndex={i}>
          {label}
      </SelectNodes>
    )
  }

  //console.log('ControlsButtonList returning nodeButtons',nodeButtons);
  return (
    nodeButtons
  )
}

export default ControlsButtonList
