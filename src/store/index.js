import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

import yAxisReducer from './slices/yAxisSlice';
import xAxisReducer from './slices/xAxisSlice';
import settingsReducer from './slices/settingsSlice';
import histogramDataSetReducer from './slices/histogramDataSetSlice';
import dashboardDataSetReducer from './slices/dashboardDataSetSlice';

const rootReducer = combineReducers({
  yAxis: yAxisReducer,
  xAxis: xAxisReducer,
  settings: settingsReducer,
  histogramDataSet: histogramDataSetReducer,
  dashboardDataSet: dashboardDataSetReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['dashboardDataSet', 'histogramDataSet'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
