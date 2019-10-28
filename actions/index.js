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

export const toggleNode = (gateway_id, nodeID) => ({
  type: 'TOGGLE_NODE',
  gateway_id: gateway_id,
  nodeID: nodeID,
})

export function setDefaultNode(dispatch, gateway_id, sensor, nodeID) {
  dispatch(setYAxisType(sensor));

  return {type: 'SET_DEFAULT_NODE',
    gateway_id: gateway_id,
    sensor : sensor,
    nodeID : nodeID,
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
  myGatewayIDList: value,
})

export const setShortNickname = (gateway_id, nodeID, value) => ({
  type: 'SET_SHORT_NICKNAME',
  gateway_id: gateway_id,
  nodeID: nodeID,
  value: value,
})

export const setLongNickname = (gateway_id, nodeID, value) => ({
  type: 'SET_LONG_NICKNAME',
  gateway_id: gateway_id,
  nodeID: nodeID,
  value: value,
})

export const setGWNickname = (gateway_id, value) => ({
  type: 'SET_GW_NICKNAME',
  gateway_id: gateway_id,
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

export const requestNicknames = () => ({
  type: 'REQUEST_NICKNAMES',
})

export const settingsSaved = () => ({
  type: 'SETTINGS_SAVED',
})

export const queryServerConfigured = () => ({
  type: 'QUERY_SERVER_CONFIGURED',
})

export function fetchNicknames() {
  console.log('fetchNicknames');
  return (dispatch, getState) => {
    currentState = getState();
    if (!serverConfigured(dispatch, currentState)) return;
    dispatch(requestNicknames());
    let gwList = '';
    for(let i=0; i<(currentState.settings.myGatewayIDList.length-1); i++){
      gwList = gwList + 'gw=' + currentState.settings.myGatewayIDList[i] + '&';
    }  
    gwList = gwList + 'gw=' + currentState.settings.myGatewayIDList[currentState.settings.myGatewayIDList.length-1];

    let url = 'https://' 
    + currentState.settings.myMQTTServer
    + '/SensorIoT/get_nicknames?' + gwList;
    console.log('get_nicknames using url:', url);

    return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveNicknames(json)))
    .catch(error => handleError(dispatch, error))
  }
}

export const receiveNicknames = (json) => ({
  type: 'RECEIVE_NICKNAMES',
  json: json,
})

export function saveNicknames() {
  console.log('saveNicknames');
  return (dispatch, getState) => {
    currentState = getState();
    if (!serverConfigured(dispatch, currentState)) return;
    let clean = true;
    console.log('nodeNicknamesList ', currentState.settings.nodeNicknamesList);
    for (let i in currentState.settings.nodeNicknamesList) {
      if (currentState.settings.nodeNicknamesList[i].dirty == true) {
        clean = false;
      }
      for (let j in currentState.settings.nodeNicknamesList[i].nicknames) {
        if (currentState.settings.nodeNicknamesList[i].nicknames[j].dirty == true) {
          clean = false;
        }
      }
    }
    if(clean){
      console.log('no nicknames have changed, not saving');
      return;
    }

    dispatch(resetDirtyNicknames());

    let url = 'https://' 
    + currentState.settings.myMQTTServer
    + '/SensorIoT/save_nicknames';

    let config = { 'gatewayConfig': currentState.settings.nodeNicknamesList };

    let body = JSON.stringify(currentState.settings.nodeNicknamesList);
    console.log('saveNicknames using url:', url, 'with body ', body);
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
      }
    )
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(function(response) {
      console.log("saveNicknames received success from server");
      dispatch(settingsSaved());
    })
    .catch(error => handleError(dispatch, error))
  }
}

export const resetDirtyNicknames = () => ({
  type: 'RESET_DIRTY_NICKNAMES',
})

function serverConfigured(dispatch, state) {
  let configured = false;
  try {
    //The version is hard coded here. When the structure changes in a non backwards compatible way, this needs to be manually
    //incremented.
    if (state.settings.MQTTConfigured && state.settings.gatewayConfigured && state.settings.configVersion == "1.0") {
      configured = true;
    } else {
      configured = false;
      }
  } catch(error) {
    console.error(error);
    configured = false;
  }

  if (configured == true) {
    return true;
  } else {
    console.log('server is not configured - state.settings.configMessageAlert is ', state.settings.configMessageAlert);
    if (state.settings.configMessageAlert == false) {
      dispatch(queryServerConfigured());
      Alert.alert('Please configure MQTT server and gateway in settings');
      return false;
    }
  }
}

function handleError(dispatch, error) {
  console.log('Error caught',error,error.name,error.message);
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

    let gwList = '';
    for(let i=0; i<(currentState.settings.myGatewayIDList.length-1); i++){
      gwList = gwList + 'gw=' + currentState.settings.myGatewayIDList[i] + '&';
    }  
    gwList = gwList + 'gw=' + currentState.settings.myGatewayIDList[currentState.settings.myGatewayIDList.length-1];

    let url = 'https://' 
      + currentState.settings.myMQTTServer
      + '/SensorIoT/latests?' + gwList;
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
  console.log('fetchSensorData');
  return (dispatch, getState) => {
    dispatch(clearServerData());
    currentState = getState();
    if (!serverConfigured(dispatch, currentState)) return;

    //then loop through each GW and recieve any nicknames for that GW
    console.log('fetchSensorData finding nodes to query in ', currentState.histogramDataSet.nodeList);
    for(let i in currentState.histogramDataSet.nodeList){
      let nodes = '';
      for (let j in currentState.histogramDataSet.nodeList[i].nodes) {
        nodeID = currentState.histogramDataSet.nodeList[i].nodes[j].nodeID;
        active = currentState.histogramDataSet.nodeList[i].nodes[j].isActive;
        if (active) {
          nodes += 'node=' + nodeID + '&';
        }
      }
      if ( nodes == '' ) {
        console.log(' no nodes to fetch. nodeList ', currentState.histogramDataSet.nodeList);
      } else {
        console.log('fetchSensorData for gw ', currentState.histogramDataSet.nodeList[i].gateway_id, ' for nodes', nodes);
        dispatch(requestServerData());
        let url = 'https://' 
                  + currentState.settings.myMQTTServer
                  + '/SensorIoT/gw/'+ currentState.histogramDataSet.nodeList[i].gateway_id 
                  + '?' + nodes 
                  + 'type=' + currentState.yAxis.dataQueryKey 
                  + '&period=' + currentState.xAxis.xDateRange + '&timezone=EST5EDT';
        console.log('fetchSensorData using url:', url);
        fetch(url)
        .then(response => response.json())
        .then(json => dispatch(receiveSensorData(currentState.histogramDataSet.nodeList[i].gateway_id, json)))
        .catch(error => handleError(dispatch, error))  
      }
    }
    return;
  }
}

export const receiveSensorData = (gateway_id, json) => ({
  type: 'RECEIVE_SENSOR_DATA',
  gateway_id: gateway_id,
  json: json,
})

export function fetchNodeList() {
  return (dispatch, getState) => {
    currentState = getState();
    if (!serverConfigured(dispatch, currentState)) return;
    dispatch(requestServerData());

    let gwList = '';
    for(let i=0; i<(currentState.settings.myGatewayIDList.length-1); i++){
      gwList = gwList + 'gw=' + currentState.settings.myGatewayIDList[i] + '&';
    }  
    gwList = gwList + 'gw=' + currentState.settings.myGatewayIDList[currentState.settings.myGatewayIDList.length-1];

    let url = 'https://' 
            + currentState.settings.myMQTTServer
            + '/SensorIoT/nodelists?'+ gwList 
            + '&period=' + currentState.xAxis.xDateRange;
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

export const clearServerData = () => ({
  type: 'CLEAR_SERVER_DATA',
})
