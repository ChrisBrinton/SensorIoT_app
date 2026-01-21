import React, { useCallback } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import SettingsTextField from '../components/SettingsTextField';
import TypeSwitch from '../components/TypeSwitch';
import NicknameList from '../components/NicknameList';
import { fetchNicknames, saveNicknames, setMQTTServer, setGatewayID } from '../store/slices/settingsSlice';
import { toggleTempType } from '../store/slices/yAxisSlice';

function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const tempType = useSelector((state) => state.yAxis.tempType);
  const isLoading = settings.isLoading > 0;

  useFocusEffect(
    useCallback(() => {
      console.log('SettingsScreen - focused');
      dispatch(fetchNicknames());
      
      // Save nicknames when leaving
      return () => {
        console.log('SettingsScreen - blur');
        dispatch(saveNicknames());
      };
    }, [dispatch])
  );

  const handleMQTTChange = (value) => {
    dispatch(setMQTTServer(value));
  };

  const handleGatewayChange = (value) => {
    dispatch(setGatewayID(value));
  };

  const handleTempTypeToggle = () => {
    dispatch(toggleTempType());
  };

  return (
    <View style={styles.settingsContainer}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.MQTTrow}>
          <SettingsTextField
            title="MQTT Server"
            label="MQTT Server"
            value={settings.myMQTTServer}
            onChangeText={handleMQTTChange}
          />
        </View>
        <View style={styles.GWIDrow}>
          <SettingsTextField
            title="Gateway IDs"
            label="Gateway IDs (comma separated list)"
            value={settings.myGatewayIDList.join(', ')}
            onChangeText={handleGatewayChange}
          />
        </View>
        <View style={styles.tempSwitchRow}>
          <Text style={styles.tempSwitchText}>Temperature Format</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>C</Text>
            <TypeSwitch
              value={tempType === 'F'}
              onValueChange={handleTempTypeToggle}
            />
            <Text style={styles.switchLabel}>F</Text>
          </View>
        </View>
        <View style={styles.nicknameList}>
          <Text style={styles.sectionTitle}>Node Nicknames</Text>
          <NicknameList />
        </View>
      </ScrollView>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="steelblue" />
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'powderblue',
  },
  MQTTrow: {
    height: 75,
    backgroundColor: 'powderblue',
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  GWIDrow: {
    height: 75,
    backgroundColor: 'powderblue',
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  tempSwitchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 10,
  },
  tempSwitchText: {
    fontSize: 16,
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    paddingHorizontal: 6,
    fontSize: 16,
  },
  nicknameList: {
    margin: 5,
    marginLeft: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});

export default SettingsScreen;
