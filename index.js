import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import createAppWithNavigationState from './components/AppNavigator'
import AppWithNavigationState from './components/AppNavigator'
import { AppRegistry } from 'react-native';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers'
//import { PersistGate } from 'redux-persist/integration/react'

/*
const SensorIoT = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
*/

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const addListener = createReduxBoundAddListener("root");

const store = createStore(
  rootReducer,
  applyMiddleware(middleware),
);

class SensorIoT extends React.Component {
  render() {
    return (
      <Provider store={store}>
          {createAppWithNavigationState(store)}
      </Provider>
    )
  }
}

AppRegistry.registerComponent('SensorIoT', () => AppWithNavigationState);
