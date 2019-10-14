import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { PersistGate } from 'redux-persist/integration/react';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './components/App';
import AppReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['dashboardDataSet', 'histogramDataSet', 'yAxis', 'navigation'],
};

const persistedReducer = persistReducer(persistConfig, AppReducer);

const loggerMiddleware = createLogger();

let store = createStore(persistedReducer, applyMiddleware( thunkMiddleware ));
let persistor = persistStore(store);

//persistor.purge();

const SensorIoT = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
)


AppRegistry.registerComponent('SensorIoT', () => SensorIoT);
