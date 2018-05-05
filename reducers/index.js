import { combineReducers } from 'redux';
import yAxis from './yAxis';
import xAxis from './xAxis';
import settings from './settings';
import histogramDataSet from './histogramDataSet';
import dashboardDataSet from './dashboardDataSet';

const AppReducer = combineReducers({
  yAxis,
  xAxis,
  histogramDataSet,
  dashboardDataSet,
  settings,
});

export default AppReducer;
