import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { fetchNodeList } from '../store/slices/histogramDataSetSlice';
import { fetchNodeLatestData } from '../store/slices/dashboardDataSetSlice';
import { fetchNicknames } from '../store/slices/settingsSlice';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: 'powderblue',
  },
  headerTintColor: 'steelblue',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
};

// Simple header button component
function HeaderButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.headerButton}>
      <Text style={styles.headerButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function AppNavigator() {
  const dispatch = useDispatch();
  const { MQTTConfigured, gatewayConfigured, configVersion } = useSelector(
    (state) => state.settings
  );

  const isConfigured = MQTTConfigured && gatewayConfigured && configVersion === '1.0';

  useEffect(() => {
    // Hide splash screen after app is loaded
    try {
      SplashScreen.hide();
    } catch (e) {
      console.log('SplashScreen not available');
    }
    
    if (isConfigured) {
      dispatch(fetchNodeList());
      dispatch(fetchNodeLatestData());
      dispatch(fetchNicknames());
    } else {
      Alert.alert('Please configure MQTT server and gateway in settings');
    }
  }, [isConfigured, dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isConfigured ? 'Dashboard' : 'Settings'}
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={({ navigation }) => ({
            title: 'Dashboard',
            headerLeft: () => (
              <HeaderButton
                title="History"
                onPress={() => navigation.navigate('History')}
              />
            ),
            headerRight: () => (
              <HeaderButton
                title="Settings"
                onPress={() => navigation.navigate('Settings')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={({ navigation }) => ({
            title: 'History',
            headerLeft: () => (
              <HeaderButton
                title="Dashboard"
                onPress={() => navigation.navigate('Dashboard')}
              />
            ),
            headerRight: () => (
              <HeaderButton
                title="Settings"
                onPress={() => navigation.navigate('Settings')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={({ navigation }) => ({
            title: 'Settings',
            headerLeft: () => (
              <HeaderButton
                title="Dashboard"
                onPress={() => navigation.navigate('Dashboard')}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerButtonText: {
    color: 'steelblue',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppNavigator;
