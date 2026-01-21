import React from 'react';
import { Switch, StyleSheet } from 'react-native';

function TypeSwitch({ value, onValueChange }) {
  return (
    <Switch
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={value}
      style={styles.switch}
    />
  );
}

const styles = StyleSheet.create({
  switch: {
    marginHorizontal: 5,
  },
});

export default TypeSwitch;
