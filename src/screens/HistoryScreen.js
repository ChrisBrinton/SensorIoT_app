import React, { useCallback } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import Histogram from '../components/Histogram';
import ControlsButtonList from '../components/ControlsButtonList';
import SelectSensorType from '../components/SelectSensorType';
import SelectRange from '../components/SelectRange';
import { fetchSensorData, setDefaultNode } from '../store/slices/histogramDataSetSlice';
import { setYAxisType } from '../store/slices/yAxisSlice';

function HistoryScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.histogramDataSet.isLoading > 0);
  const yAxisState = useSelector((state) => state.yAxis);
  const histogramData = useSelector((state) => state.histogramDataSet);
  
  // Get parameters passed from dashboard
  const defaultSensor = route.params?.sensor;
  const defaultNodeID = route.params?.defaultNode;
  const defaultGW = route.params?.gateway_id;

  useFocusEffect(
    useCallback(() => {
      console.log('HistoryScreen - focused', { defaultGW, defaultSensor, defaultNodeID });
      if (defaultGW && defaultNodeID) {
        dispatch(setDefaultNode({ gateway_id: defaultGW, nodeID: defaultNodeID }));
        if (defaultSensor) {
          dispatch(setYAxisType(defaultSensor));
        }
        dispatch(fetchSensorData());
      }
    }, [dispatch, defaultGW, defaultSensor, defaultNodeID])
  );

  const contentInsetY = { top: 10, bottom: 10, left: 0, right: 0 };
  const contentInsetX = { top: 0, bottom: 0, left: 15, right: 5 };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.appContainer}>
        <Histogram
          yAccessor={({ item }) => item.value}
          xAccessor={({ item }) => item.date}
          contentInsetY={contentInsetY}
          contentInsetX={contentInsetX}
          gateway_id={defaultGW}
          sensor={defaultSensor}
          nodeID={defaultNodeID}
        />
        <View style={styles.sensorTypeRow}>
          <SelectSensorType />
        </View>
        <View style={styles.controlsRow}>
          <ControlsButtonList />
        </View>
        <View style={styles.rangeRow}>
          <SelectRange />
        </View>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
  },
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'powderblue',
    paddingBottom: 20,
  },
  sensorTypeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  controlsRow: {
    marginTop: 10,
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default HistoryScreen;
