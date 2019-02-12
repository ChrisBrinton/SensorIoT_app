import {
  Alert,
} from 'react-native';

export const yAxisTypes = {
  TempF: 'TempF',
  TempC: 'TempC',
  Hum: 'Hum',
  Pres: 'Pres',
  Batt: 'Batt',
}

//This shouldnt be handled by any reducer. It here to have a legit 'no op' passed through redux if necessary
export const noAction = () => ({
  type: 'NO_ACTION',
})

export const setYAxisType = (type) => ({
  type: 'SET_Y_AXIS_TYPE',
  yAxisType: type,
})

export const setYAxisRange = (min, max) => ({
  type: 'SET_Y_AXIS_RANGE',
  yAxisMin: min,
  yAxisMax: max,
})

export const setXDateRange = (days) => ({
  type: 'SET_X_DATE_RANGE',
  xDateRange: days,
})

export const toggleNode = (nodeIndex) => ({
  type: 'TOGGLE_NODE',
  nodeIndex: nodeIndex,
})

export function setDefaultNode(dispatch, state, nodeID, sensor) {
  
  dispatch(setYAxisType(sensor));

  return {type: 'SET_DEFAULT_NODE',
  nodeID : nodeID,
  sensor : sensor
  }
}

export const toggleTempType = () => ({
  type: 'TOGGLE_TEMP_TYPE',
})

export const setMQTTServer = value => ({
  type: 'SET_MQTT_SERVER',
  myMQTTServer: value,
})

export const setGatewayID = value => ({
  type: 'SET_GATEWAY_ID',
  myGatewayID: value,
})

export const setShortNickname = (nodeID, value) => ({
  type: 'SET_SHORT_NICKNAME',
  nodeID: nodeID,
  value: value,
})

export const setLongNickname = (nodeID, value) => ({
  type: 'SET_LONG_NICKNAME',
  nodeID: nodeID,
  value: value,
})

export const requestServerData = () => ({
  type: 'REQUEST_SERVER_DATA',
})

export const requestNodeLatestData = () => ({
  type: 'REQUEST_NODE_LATEST',
})

export const resetServerRequests = () => ({
  type: 'RESET_SERVER_REQUESTS',
})

export const queryServerConfigured = () => ({
  type: 'QUERY_SERVER_CONFIGURED',
})

export const saveNicknames = () => ({
  type: 'SAVE_NICKNAMES',
})

function serverConfigured(dispatch, state) {
  if (state.settings.MQTTConfigured && state.settings.gatewayConfigured) {
    return true;
  } else {
    if (state.settings.configMessageAlert == false) {
    dispatch(queryServerConfigured());
    Alert.alert('Please configure MQTT server and gateway in settings');
    return false;
    }
  }
}

function handleError(dispatch, error) {
  //console.log('Error caught',error,error.name,error.message);
  if (typeof error != 'undefined'){
    switch (error.message) {
      case 'Network request failed':
        Alert.alert('Network request failed. Check settings');
      default:
        Alert.alert('Error communicating with Server');
    }
    dispatch(resetServerRequests());
    return;
  } else {
    Alert.alert('Network error. Check settings');
    dispatch(resetServerRequests());
    return;
  }
}

export function fetchNodeLatestData() {
  console.log('fetchNodeLatestdata');
  return (dispatch, getState) => {
    currentState = getState();
    if (!serverConfigured(dispatch, currentState)) return;
    dispatch(requestNodeLatestData());
    let url = 'https://' 
              + currentState.settings.myMQTTServer
              + '/SensorIoT/latest/'+ currentState.settings.myGatewayID;
    console.log('fetchNodeLatestData using url:', url);
    return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveNodeLatestData(json)))
    .catch(error => handleError(dispatch, error))
  }
}

export const receiveNodeLatestData = (json) => ({
  type: 'RECEIVE_NODE_LATEST',
  json: json,
})

export function fetchSensorData() {
  //console.log('fetchSensorData nodeID', nodeID);
  return (dispatch, getState) => {
    currentState = getState();
    if (!serverConfigured(dispatch, currentState)) return;
    let nodes = '';
    for ( node in currentState.histogramDataSet.nodeList ) {
      nodeID = currentState.histogramDataSet.nodeList[node].nodeID;
      active = currentState.histogramDataSet.nodeList[node].isActive;
      if (active) {
        nodes += 'node=' + nodeID + '&'
      }
    }
    if ( nodes == '' ) return //if there are no nodes, dont fetch!
    dispatch(requestServerData());
    let url = 'https://' 
              + currentState.settings.myMQTTServer
              + '/SensorIoT/gw/'+ currentState.settings.myGatewayID 
              + '?' + nodes 
              + 'type=' + currentState.yAxis.dataQueryKey 
              + '&period=' + currentState.xAxis.xDateRange + '&timezone=EST5EDT';
    console.log('fetchSensorData using url:', url);
    return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveSensorData(currentState.histogramDataSet.nodeList[node].nodeID, json)))
    .catch(error => handleError(dispatch, error))
  }
}

export const receiveSensorData = (nodeID, json) => ({
  type: 'RECEIVE_SENSOR_DATA',
  nodeID: nodeID,
  json: json,
})

export function fetchNodeList() {
  return (dispatch, getState) => {
    currentState = getState();
    if (!serverConfigured(dispatch, currentState)) return;
    dispatch(requestServerData());
    let url = 'https://' 
              + currentState.settings.myMQTTServer
              + '/SensorIoT/nodelist/'+ currentState.settings.myGatewayID 
              + '?period=' + currentState.xAxis.xDateRange;
    console.log('fetchNodeList using url:', url);
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveNodeList(json)))
      .catch(error => handleError(dispatch, error));
  }
}

export const clearActiveFlags = () => ( 
  {
    type : 'CLEAR_ACTIVE_FLAGS'
  }
)

export const receiveNodeList = (json) => ({
  type: 'RECEIVE_NODELIST',
  json: json,
})

export const invalidateSensorData = () => ({
  type: 'INVALIDATE_SENSOR_DATA',
})
