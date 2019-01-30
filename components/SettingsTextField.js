import React from 'react'
import { TextField } from 'react-native-material-textfield';

const SettingsTextField = ({ label, 
                              value, 
                              onChangeText, 
                              key, 
                              characterRestriction, 
                              containerStyle, 
                              inputContainerPadding, 
                              labelHeight }) => {
  //console.log('SettingsTextField - label', label, 'value', value, 'key', key);
  return (
    <TextField
      label={label}
      value={value}
      onChangeText={onChangeText}
      key={key}
      characterRestriction={characterRestriction}
      containerStyle={containerStyle}
      inputContainerPadding={inputContainerPadding}
      labelHeight={labelHeight}>
    </TextField>
)}

export default SettingsTextField
