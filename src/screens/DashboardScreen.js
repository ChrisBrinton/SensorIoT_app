import React, { useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import DashboardList from '../components/DashboardList';
import { fetchNodeList } from '../store/slices/histogramDataSetSlice';
import { fetchNodeLatestData } from '../store/slices/dashboardDataSetSlice';

function DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.dashboardDataSet.isLoading > 0);

  // Refresh data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      console.log('DashboardScreen - focused');
      dispatch(fetchNodeList());
      dispatch(fetchNodeLatestData());
    }, [dispatch])
  );

  const onRefresh = useCallback(() => {
    dispatch(fetchNodeList());
    dispatch(fetchNodeLatestData());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <DashboardList navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
  },
  scrollView: {
    flex: 1,
  },
});

export default DashboardScreen;
