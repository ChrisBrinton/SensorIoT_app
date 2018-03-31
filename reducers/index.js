import { combineReducers } from 'redux'
import axisLabels from './axisLabels'
import { auth, nav } from './NavReducers'


const AppReducer = combineReducers({
  axisLabels,
  nav,
  auth,
});

export default AppReducer;
