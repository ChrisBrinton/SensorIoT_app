import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setYAxisType } from '../store/slices/yAxisSlice';
import { fetchSensorData } from '../store/slices/histogramDataSetSlice';

const sensorTypes = [
  { key: 'Temp', label: 'Temp' },
  { key: 'Hum', label: 'Humidity' },
  { key: 'Pres', label: 'Pressure' },
  { key: 'Batt', label: 'Battery' },
];

function SelectSensorType() {
  const dispatch = useDispatch();
  const yAxisType = useSelector((state) => state.yAxis.yAxisType);

  const handleSelect = (type) => {
    dispatch(setYAxisType(type));
    dispatch(fetchSensorData());
  };

  // Determine which type is currently selected
  const getCurrentType = () => {
    if (yAxisType.includes('Temp')) return 'Temp';
    return yAxisType;
  };

  const currentType = getCurrentType();

  return (
    <View style={styles.container}>
      {sensorTypes.map((type) => (
        <TouchableOpacity
          key={type.key}
          style={[
            styles.button,
            currentType === type.key && styles.buttonActive,
          ]}
          onPress={() => handleSelect(type.key)}
        >
          <Text
            style={[
              styles.buttonText,
              currentType === type.key && styles.buttonTextActive,
            ]}
          >
            {type.label}
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
    paddingHorizontal: 15,
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
    fontSize: 14,
    color: '#666',
  },
  buttonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
});

export default SelectSensorType;
