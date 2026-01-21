import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setXDateRange } from '../store/slices/xAxisSlice';
import { fetchSensorData } from '../store/slices/histogramDataSetSlice';

const rangeOptions = [
  { days: 1, label: '1 Day' },
  { days: 7, label: '1 Week' },
  { days: 30, label: '1 Month' },
  { days: 90, label: '3 Months' },
];

function SelectRange() {
  const dispatch = useDispatch();
  const xDateRange = useSelector((state) => state.xAxis.xDateRange);

  const handleSelect = (days) => {
    dispatch(setXDateRange(days));
    dispatch(fetchSensorData());
  };

  return (
    <View style={styles.container}>
      {rangeOptions.map((option) => (
        <TouchableOpacity
          key={option.days}
          style={[
            styles.button,
            xDateRange === option.days && styles.buttonActive,
          ]}
          onPress={() => handleSelect(option.days)}
        >
          <Text
            style={[
              styles.buttonText,
              xDateRange === option.days && styles.buttonTextActive,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 5,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E8F4F8',
    margin: 3,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonActive: {
    backgroundColor: 'steelblue',
    borderColor: 'steelblue',
  },
  buttonText: {
    fontSize: 12,
    color: '#666',
  },
  buttonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
});

export default SelectRange;
