import React from 'React';
import { ScrollView, StyleSheet } from 'react-native';

const DashboardScrollView = ({ children, onScrollEndDrag }) => {
  //console.log('ControlsButton created with children:', children);
  return (
      <ScrollView
        style={styles.dashboardScrollView}
        onScrollEndDrag={onScrollEndDrag}>
        {children}
      </ScrollView>
  )
}

export default DashboardScrollView

const styles = StyleSheet.create({
  dashboardScrollView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'powderblue', 
  },
});
