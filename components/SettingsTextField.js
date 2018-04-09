import React from 'react'
import { TextField } from 'react-native-material-textfield';

const SettingsTextField = ({ label, value, onChangeText }) => {
  console.log('SettingsTextField - label', label, 'value', value, 'onChangeText', onChangeText);
  return (
    <TextField
      label={label}
      value={value}
      onChangeText={onChangeText}>
    </TextField>
)}

export default SettingsTextField
