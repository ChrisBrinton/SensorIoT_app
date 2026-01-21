import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Gauge from './Gauge';

function GaugeRow({ gateway_id, nodeID, nodeName, latestData, navigation }) {
  const handleGaugePress = (sensor) => {
    navigation.navigate('History', {
      gateway_id,
      defaultNode: nodeID,
      sensor,
    });
  };

  if (!latestData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.nodeName}>{nodeName}</Text>
      <View style={styles.gaugeContainer}>
        <Gauge
          type="Temp"
          value={latestData.F || 0}
          size={80}
          onPress={() => handleGaugePress('Temp')}
        />
        <Gauge
          type="Hum"
          value={latestData.H || 0}
          size={80}
          onPress={() => handleGaugePress('Hum')}
        />
        <Gauge
          type="Pres"
          value={latestData.P || 0}
          size={80}
          onPress={() => handleGaugePress('Pres')}
        />
      </View>
      <View style={styles.battRssiContainer}>
        <Text style={styles.smallText}>
          Batt: {(latestData.BAT || 0).toFixed(2)}V
        </Text>
        <Text style={styles.smallText}>
          RSSI: {latestData.RSSI || 0}dBm
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F4F8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  nodeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  gaugeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  battRssiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  smallText: {
    fontSize: 12,
    color: '#666',
  },
});

export default GaugeRow;
