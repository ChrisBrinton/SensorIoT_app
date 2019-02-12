import React from 'React';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const SettingsScrollView = ({ children, onScrollEndDrag }) => {
  //console.log('ControlsButton created with children:', children);
  return (
      <ScrollView
        style={styles.scrollView}
        onScrollEndDrag={onScrollEndDrag}>
        {children}
      </ScrollView>
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
