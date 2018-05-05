import dateFns from 'date-fns';

const initialState = {
    isLoading: 0,
    nodeData: [ {nodeID: 1, latestData: {F: 65.1, H: 45.5, P: 29.8, BAT: 2.99, RSSI: -25}, nodeTime: dateFns.setHours(new Date(2018, 1, 2), 6)},
                {nodeID: 2, latestData: {F: 35.1, H: 25.8, P: 30.1, BAT: 1.25, RSSI: -50}, nodeTime: dateFns.setHours(new Date(2018, 1, 2), 6)},
                {nodeID: 3, latestData: {F: 85.1, H: 85.0, P: 30.3, BAT: 3.99, RSSI: -75}, nodeTime: dateFns.setHours(new Date(2018, 1, 2), 6)},
              ],
}

function matchLatestType( nodeElement, json ) {
    switch (json.type) {
        case "F":
            nodeElement.latestData.F = json.value;
            return;
        case "H":
            nodeElement.latestData.H = json.value;
            return;
        case "P":
            nodeElement.latestData.P = json.value;
            return;
        case "BAT":
            nodeElement.latestData.BAT = json.value;
            return;
        case "RSSI":
            nodeElement.latestData.RSSI = json.value;
            return;
    }
}

function unpackLatestData(nodeData, json) {
    for (let i = 0; i < nodeData.length; i++) {
        if (nodeData[i].nodeID == parseInt(json.node_id)) {
            matchLatestType(nodeData[i], json);
            nodeData[i].nodeTime = new Date((json.time * 1000)); //js expects epoch time in num of millis
            return;
            }
        }
    //If it made it this far, it didnt fine a nodeID match in nodeData, so add a new record
    newData = {nodeID: json.node_id, latestData: {F: 0, H: 0, P: 0, BAT: 0, RSSI: 0}}        
    matchLatestType(newData, json);
    newData.nodeTime = new Date((json.time * 1000)); //js expects epoch time in num of millis
    nodeData.push(newData);
}
          
const dashboardDataSet = (state = initialState, action) => {
    //console.log('dashboardDataSet reducer - action', action, 'state:', state);
    switch (action.type) {
      case 'REQUEST_NODE_LATEST':
          return Object.assign({}, state, {isLoading: 1});
      case 'RECEIVE_NODE_LATEST':
        //console.log('dashboardDataSet reducer - action', action, 'state:', state);
        let newData = [];
        for ( let i=0; i< action.json.length; i++ ) {
            unpackLatestData(newData, action.json[i]);
        }
        console.log('receiveSensorData newData', newData);
        return Object.assign({}, state, {
            isLoading: 0,
            nodeData: newData,
        })
      case 'RESET_SERVER_REQUESTS':
        return Object.assign({}, state, {
            isLoading: 0,
            })              
      default:
      return state;
  }
}

export default dashboardDataSet;
