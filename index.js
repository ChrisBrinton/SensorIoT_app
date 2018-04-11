import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './components/App';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['histogramDataSet'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
