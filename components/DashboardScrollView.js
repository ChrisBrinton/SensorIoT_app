import React from 'React';
import { Dimensions, RefreshControl, ScrollView, StyleSheet } from 'react-native';

//_onRefresh = () => {
//  console.log('refreshing');
//}

const DashboardScrollView = ({ children, onScrollEndDrag, onRefresh }) => {
  console.log('DashboardScrollview created with Dimensions ', Dimensions);
  return (
      <ScrollView

        style={styles.dashboardScrollView}
        refreshControl={ 
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            />
         }
//        onScrollEndDrag={onScrollEndDrag}

      >
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
