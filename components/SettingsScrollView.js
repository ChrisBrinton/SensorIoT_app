import React from 'React';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const SettingsScrollView = ({ children, onScrollEndDrag }) => {
  //console.log('ControlsButton created with children:', children);
  return (
      <KeyboardAwareScrollView
        style={styles.scrollView}
        onScrollEndDrag={onScrollEndDrag}>
        {children}
      </KeyboardAwareScrollView>
  )
}

export default SettingsScrollView

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'powderblue', 
  },
});
