import { combineReducers } from 'redux';
import yAxis from './yAxis';
import xAxis from './xAxis';
import settings from './settings';
import histogramDataSet from './histogramDataSet';


const AppReducer = combineReducers({
  yAxis,
  xAxis,
  histogramDataSet,
  settings,
});

export default AppReducer;
