import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useSelector } from 'react-redux';

function Gauge({ type, value, size = 80, onPress }) {
  const yAxisDefaults = useSelector((state) => state.yAxis.yAxisMinMaxDefaults);
  const tempType = useSelector((state) => state.yAxis.tempType);

  // Get min/max for this gauge type
  let min = 0;
  let max = 100;
  let displayValue = value;
  let displayType = type;

  if (type === 'Temp') {
    if (tempType === 'F') {
      const defaults = yAxisDefaults.find((d) => d.dataType === 'TempF');
      if (defaults) {
        min = defaults.yMin;
        max = defaults.yMax;
      }
      displayType = '°F';
    } else {
      const defaults = yAxisDefaults.find((d) => d.dataType === 'TempC');
      if (defaults) {
        min = defaults.yMin;
        max = defaults.yMax;
      }
      // Convert F to C
      displayValue = (value - 32) / 1.8;
      displayType = '°C';
    }
  } else {
    const dataType = type === 'Hum' ? 'Hum' : type === 'Pres' ? 'Pres' : 'Batt';
    const defaults = yAxisDefaults.find((d) => d.dataType === dataType);
    if (defaults) {
      min = defaults.yMin;
      max = defaults.yMax;
    }
    
    if (type === 'Hum') {
      displayType = '%';
    } else if (type === 'Pres') {
      displayType = 'inHg';
    } else {
      displayType = 'V';
    }
  }

  // Clamp value to min/max
  if (displayValue > max) max = displayValue;
  if (displayValue < min) min = displayValue;

  // Calculate fill percentage
  const adjustedValue = ((displayValue - min) / (max - min)) * 100;

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#BFE6EB"
      style={styles.touchable}
    >
      <View style={styles.container}>
        <AnimatedCircularProgress
          size={size}
          width={8}
          fill={adjustedValue}
          rotation={-120}
          arcSweepAngle={240}
          tintColor="#00e0FF"
          backgroundColor="#3D5875"
          lineCap="round"
        >
          {() => (
            <Text style={styles.valueText}>
              {Number.parseFloat(displayValue).toFixed(1)}
            </Text>
          )}
        </AnimatedCircularProgress>
        <View style={[styles.minMaxContainer, { width: size }]}>
          <Text style={styles.minMaxText}>{min}</Text>
          <Text style={styles.minMaxText}>{max}</Text>
        </View>
        <Text style={styles.typeText}>{displayType}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
  },
  container: {
    alignItems: 'center',
    padding: 5,
  },
  valueText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  minMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  minMaxText: {
    fontSize: 10,
    color: '#666',
  },
  typeText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
    fontWeight: '500',
  },
});

export default Gauge;
