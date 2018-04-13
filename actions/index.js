export const yAxisTypes = {
  TempF: 'TempF',
  TempC: 'TempC',
  Hum: 'Hum',
  Pres: 'Pres',
  Batt: 'Batt',
}

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

export const requestServerData = () => ({
  type: 'REQUEST_SERVER_DATA',
})

export function fetchSensorData(nodeID) {
  //console.log('fetchSensorData nodeID', nodeID);
  return (dispatch, getState) => {
    dispatch(requestServerData());
    currentState = getState();
    let url = 'http://' 
              + currentState.settings.myMQTTServer
              + '/gw/'+ currentState.settings.myGatewayID 
              + '/42?type=' + currentState.yAxis.dataQueryKey 
              + '&period=' + currentState.xAxis.xDateRange + '&timezone=EST5EDT';
    console.log('fetchSensorData using url:', url);
    return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveSensorData(nodeID, json)))
    .catch(error => console.error(error))
  }
}

export function fetchNodeList() {
  return (dispatch, getState) => {
    dispatch(requestServerData());
    currentState = getState();
    let url = 'http://' 
              + currentState.settings.myMQTTServer
              + '/nodelist/'+ currentState.settings.myGatewayID 
              + '?period=' + currentState.xAxis.xDateRange;
    console.log('fetchNodeList using url:', url);
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveNodeList(json)))
      .catch(error => console.error(error));
  }
}

export const receiveSensorData = (nodeID, json) => ({
  type: 'RECEIVE_SENSOR_DATA',
  nodeID: nodeID,
  json: json,
})

export const receiveNodeList = (json) => ({
  type: 'RECEIVE_NODELIST',
  json: json,
})

export const invalidateSensorData = () => ({
  type: 'INVALIDATE_SENSOR_DATA',
})
