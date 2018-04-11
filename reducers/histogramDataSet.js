import dateFns from 'date-fns';

const initialState = {
  nodeList: [ {'nodeID': 1, 'isActive': false},
              {'nodeID': 2, 'isActive': false},
              {'nodeID': 3, 'isActive': false},
            ],
  isLoading: false,
  data: [ {value:1,date:dateFns.setHours(new Date(2018, 1, 2), 6)},
          {value:2,date:dateFns.setHours(new Date(2018, 1, 3), 6)},
          {value:3,date:dateFns.setHours(new Date(2018, 1, 4), 6)},
          {value:4,date:dateFns.setHours(new Date(2018, 1, 5), 6)},
          {value:5,date:dateFns.setHours(new Date(2018, 1, 6), 6)},
          {value:6,date:dateFns.setHours(new Date(2018, 1, 7), 6)},
          {value:7,date:dateFns.setHours(new Date(2018, 1, 8), 6)},
          {value:8,date:dateFns.setHours(new Date(2018, 1, 9), 6)},
          {value:8,date:dateFns.setHours(new Date(2018, 1, 13), 6)},
          {value:9,date:dateFns.setHours(new Date(2018, 1, 14), 6)},
          {value:10,date:dateFns.setHours(new Date(2018, 1, 15), 6)},
          {value:11,date:dateFns.setHours(new Date(2018, 1, 16), 6)},
          {value:12,date:dateFns.setHours(new Date(2018, 1, 17), 6)},
          {value:13,date:dateFns.setHours(new Date(2018, 1, 18), 6)},
          {value:14,date:dateFns.setHours(new Date(2018, 1, 19), 6)},
          {value:15,date:dateFns.setHours(new Date(2018, 1, 20), 6)},
          {value:16,date:dateFns.setHours(new Date(2018, 1, 21), 6)} ],
}

function _toggleNode(state, nodeIndex) {
  //console.log('toggleNode state:', state, 'nodeIndex', nodeIndex);
  //console.log('toggleNode returning', newState);
  let newList = [];
  for (i in state.nodeList) {
    if (i == nodeIndex){
      newList.push({nodeID: state.nodeList[i].nodeID,
                     isActive: !state.nodeList[i].isActive});
      } else {
        newList.push(state.nodeList[i]);
      }
    }
  let newState = {nodeList: newList};
  return newState;
}

function findNode(nodeList, nodeID) {
  for (let i=0; i <nodeList.length; i++) {
    if (nodeList[i].nodeID === nodeID) {
      return i;
    }
  }
  return null;
}

const histogramDataSet = (state = initialState, action) => {
  console.log('histogramDataSet reducer - action', action, 'state:', state);
  switch (action.type) {
    case 'TOGGLE_NODE':
      return Object.assign({}, state, _toggleNode(state, action.nodeIndex));
    case 'REQUEST_SERVER_DATA':
      return Object.assign({}, state, {isLoading: true});
    case 'RECEIVE_NODELIST':
      let nodeData = [];
      for (let i = 0; i < action.json.length; i++) {
        let j = findNode(state.nodeList, action.json[i])
        let oldIsActive = false;
        if (j != null) {
          oldIsActive = state.nodeList[j].isActive;
        }
        let obj = {'nodeID': action.json[i], 'isActive': oldIsActive};
        nodeData.push(obj);
      }
      console.log('processing receiveNodeList json', action.json,'nodeData',nodeData);
      return Object.assign({}, state, {
        isLoading: false,
        nodeList: nodeData,
      })
    case 'RECEIVE_SENSOR_DATA':
      //console.log('histogramDataSet reducer - action', action, 'state:', state);
      let sensorData = [];
      let xLegendValues = [];
      let count = 0;
      for (j in action.json[0]) {
        xLegendValues[count] = action.json[0][j];
        count++;
      }
      for (let i = 1; i < action.json.length; i++) {
        let valueDate = new Date((action.json[i].time * 1000)); //js expects epoch time in num of millis
        sensorData[i-1] = {value: action.json[i].value, date: valueDate}
      }
      return Object.assign({}, state, {
        isLoading: false,
        data: sensorData,
      })

    case 'INVALIDATE_SENSOR_DATA':
            
    default:
      return state;
  }
}

export default histogramDataSet;
