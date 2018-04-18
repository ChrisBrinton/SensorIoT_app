import dateFns from 'date-fns';

const nodeColors = ['#C14242','#3F3FBF','#3FBF3F','#DD7C1C','#B33BB3'];
const initialState = {
  nodeList: [ {'nodeID': 1, 'isActive': false, 'color': '#fc3b19'},
              {'nodeID': 2, 'isActive': false, 'color': '#19bffc'},
              {'nodeID': 3, 'isActive': false, 'color': '#e52de5'},
            ],
  isLoading: 0,
  data: [ {nodeID: 1,
           sensorData:  [ {value:1,date:dateFns.setHours(new Date(2018, 1, 2), 6)},
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
        ]
}

function _toggleNode(state, nodeIndex) {
  //console.log('toggleNode state:', state, 'nodeIndex', nodeIndex);
  //console.log('toggleNode returning', newState);
  let newList = [];
  for (i in state.nodeList) {
    if (i == nodeIndex){
      newList.push({nodeID: state.nodeList[i].nodeID,
                    isActive: !state.nodeList[i].isActive,
                    color: state.nodeList[i].color});
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

function unpackSensorData(json) {
  list = [];
  //console.log('unpackSensorData json', json);
  for (let i = 0; i < json.length; i++) {
    let valueDate = new Date((json[i].time * 1000)); //js expects epoch time in num of millis
    list[i] = {value: json[i].value, date: valueDate}
  }
  return list;
}

const histogramDataSet = (state = initialState, action) => {
  //console.log('histogramDataSet reducer - action', action, 'state:', state);
  switch (action.type) {
    case 'TOGGLE_NODE':
      return Object.assign({}, state, _toggleNode(state, action.nodeIndex));
    case 'REQUEST_SERVER_DATA':
      return Object.assign({}, state, {isLoading: state.isLoading+1});
    case 'RECEIVE_NODELIST':
      let nodeData = [];
      for (let i = 0; i < action.json.length; i++) {
        let j = findNode(state.nodeList, action.json[i])
        let oldIsActive = false;
        if (j != null) {
          oldIsActive = state.nodeList[j].isActive;
        }
        let obj = {'nodeID': action.json[i], 'isActive': oldIsActive, 'color': nodeColors[i]};
        nodeData.push(obj);
      }
      //console.log('processing receiveNodeList json', action.json,'nodeData',nodeData);
      return Object.assign({}, state, {
        isLoading: state.isLoading-1,
        nodeList: nodeData,
      })
    case 'RECEIVE_SENSOR_DATA':
      //console.log('histogramDataSet reducer - action', action, 'state:', state);
      let newData = [];
      for ( let i=0; i< action.json.length; i++ ) {
        newData.push({ nodeID: action.json[i].nodeID,
                       sensorData: unpackSensorData(action.json[i].sensorData),
                       })
      }
      console.log('receiveSensorData newData', newData);
      return Object.assign({}, state, {
        isLoading: state.isLoading-1,
        data: newData,
      })

    case 'INVALIDATE_SENSOR_DATA':
            
    default:
      return state;
  }
}

export default histogramDataSet;
