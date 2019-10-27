import dateFns from "date-fns";

const nodeColors = [
  "#C14242",
  "#3F3FBF",
  "#3FBF3F",
  "#DD7C1C",
  "#B33BB3",
  "#990033",
  "#6666FF",
  "#33CCCC",
  "#CC6600",
  "#FFB3FF",
  "#AAB3FF",
  "#BBFFAA",
  "#AABBFF"
];

const initialState = {
  nodeList: [],
  isLoading: 0,
  data: [],
  initialized: false,
  /* test data 
  nodeList: [ { gateway_id: "111111",
                nodes: [ { nodeID: 1, isActive: false, color: "#fc3b19" },
                         { nodeID: 2, isActive: false, color: "#19bffc" },
                         { nodeID: 3, isActive: false, color: "#e52de5" }
                       ]
              },
              { gateway_id: "222222",
                nodes: [{ nodeID: 4, isActive: false, color: "#fc3b19" }]
              },
            ],
  data: [ { gateway_id: "111111",
            nodes: [ { nodeID: 1,
                       sensorData: [
                        { value: 25, date: dateFns.setHours(new Date(2019, 9, 3), 6) },
                        { value: 55, date: dateFns.setHours(new Date(2019, 10, 3), 6) }
                       ]
                      },
                     { nodeID: 2,
                       sensorData: [
                        { value: 55, date: dateFns.setHours(new Date(2019, 9, 3), 6) },
                        { value: 25, date: dateFns.setHours(new Date(2019, 10, 3), 6) }
                       ]
                      }
                    ]
          },
          { gateway_id: "222222",
            nodes: [ { nodeID: 4,
                       sensorData: [
                        { value: 25, date: dateFns.setHours(new Date(2019, 9, 3), 6) },
                        { value: 55, date: dateFns.setHours(new Date(2019, 10, 3), 6) }
                       ]
                      }
                    ]
          }
        ],
  */
};

function _toggleNode(state, gateway_id, nodeID) {
  let newState = [];
  for (i in state.nodeList) {
    if (state.nodeList[i].gateway_id == gateway_id) {
      let newList = [];
      for (j in state.nodeList[i].nodes) {
        if (state.nodeList[i].nodes[j].nodeID == nodeID) {
          newList.push({
            nodeID: state.nodeList[i].nodes[j].nodeID,
            isActive: !state.nodeList[i].nodes[j].isActive,
            color: state.nodeList[i].nodes[j].color
          });
        } else {
          newList.push(state.nodeList[i].nodes[j]);
        }
      }
      newState.push({ gateway_id: gateway_id, nodes: newList });
    } else {
      newState.push(state.nodeList[i]);
    }
  }

  let obj = { nodeList: newState };

  console.log("toggleNode returning", obj);
  return obj;
}

function _setDefaultNode(state, gateway_id, nodeID) {
  //This is a neat trick for deep copying objects
  //unfortunately, it doesnt work for date objects so this needs to be fixed after
  let newState = JSON.parse(JSON.stringify(state));
  //fix the dates from the deep copy
  for (let i in newState.data) {
    for (let j in newState.data[i].nodes) {
      for (let k in newState.data[i].nodes[j].sensorData) {
        newState.data[i].nodes[j].sensorData[k].date =
          state.data[i].nodes[j].sensorData[k].date;
      }
    }
  }

  //The default node must be passed in
  for (let i in newState.nodeList) {
    if (newState.nodeList[i].gateway_id == gateway_id) {
      for (let j in newState.nodeList[i].nodes) {
        if (newState.nodeList[i].nodes[j].nodeID == nodeID) {
          newState.nodeList[i].nodes[j].isActive = true;
        }
      }  
    }
  }

  return newState;
}

function findNode(nodeList, gateway_id, nodeID) {
  for (let i in nodeList) {
    if (nodeList[i].gateway_id == gateway_id) {
      for (let j in nodeList[i].nodes) {
        if (nodeList[i].nodes[j].nodeID === nodeID) {
          return j;
        }
      }
    }
  }
  return null;
}

function unpackSensorData(json) {
  list = [];
  //console.log('unpackSensorData json', json);
  for (let i in json) {
    let valueDate = new Date(json[i].time * 1000); //js expects epoch time in num of millis
    list[i] = { value: json[i].value, date: valueDate };
  }
  return list;
}

//this will receive a list of nodes with data and insert it into the state object in the right place
function insertSensorData(data, gw, nodeData) {
  //console.log('insertSensorData - data ', data, ' gw ', gw, ' nodeData ', nodeData);
  let results = [];
  let found = false;
  for (let i in data) {
    let obj = { gateway_id: data[i].gateway_id, nodes: [] };
    if (data[i].gateway_id == gw) {
      obj.nodes = nodeData;
      found = true;
    } else {
      obj.nodes = data[i].nodes;
    }
    results.push(obj);
  }
  if (!found) {
    results.push({ gateway_id: gw, nodes: nodeData });
  }
  return results;
}

function clearActiveFlags(state) {
  //This is a neat trick for deep copying objects (doesnt work for dates though)
  let newState = JSON.parse(JSON.stringify(state));
  //fix the dates from the deep copy
  for (let i in newState.data) {
    for (let j in newState.data[i].nodes) {
      for (let k in newState.data[i].nodes[j].sensorData) {
        newState.data[i].nodes[j].sensorData[k].date =
          state.data[i].nodes[j].sensorData[k].date;
      }
    }
  }

  for (let i in state.nodeList) {
    for (let j in state.nodeList[i].nodes) {
      newState.nodeList[i].nodes[j].isActive = false;
    }
  }
  newState.initialized = false;

  //console.log("clearActiveFlags returns ", newState);
  return newState;
}

const histogramDataSet = (state = initialState, action) => {
  //console.log('histogramDataSet reducer - action', action, 'state:', state);
  switch (action.type) {
    case "QUERY_SERVER_CONFIGURED":
      return {
        ...initialState,
      };
    case "CLEAR_SERVER_DATA":
      let newState = Object.assign({}, state, { data: [] });
      //console.log('CLEAR_SERVER_DATA newState ', newState);
      return newState;

    case "CLEAR_ACTIVE_FLAGS":
      return clearActiveFlags(state);

    case "SET_DEFAULT_NODE":
      if (state.initialized) {
        console.log("already initialized");
        return state;
      }

      console.log("initializing in historgramDataSet action: ", action);

      newState = Object.assign(
        {},
        state,
        _setDefaultNode(state, action.gateway_id, action.nodeID),
        { initialized: true }
      );

      console.log('SET_DEFAULT_NODE - newState ', newState);
      return newState;

    case "TOGGLE_NODE":
      console.log(
        "TOGGLE_NODE histogramDataSet.nodeList: ",
        state.nodeList,
        " action: ",
        action
      );
      return Object.assign(
        {},
        state,
        _toggleNode(state, action.gateway_id, action.nodeID)
      );

    case "REQUEST_SERVER_DATA":
      return Object.assign({}, state, { isLoading: state.isLoading + 1 });

    case "RECEIVE_NODELIST":
      let nodesArray = [];
      let colorCount = 0;
      for (let i in action.json) {
        let nodeData = [];
        for (let j in action.json[i].nodes) {
          let h = findNode(
            state.nodeList,
            action.json[i].gateway_id,
            action.json[i].nodes[j]
          );
          let oldIsActive = false;
          if (h != null) {
            oldIsActive = state.nodeList[i].nodes[h].isActive;
          }
          if (colorCount >= nodeColors.length) {
            colorCount = nodeColors.length-1;
          } 
          let obj = {
            nodeID: action.json[i].nodes[j],
            isActive: oldIsActive,
            color: nodeColors[colorCount]
          };
          colorCount++;
          nodeData.push(obj);
        }
        let gw_obj = {
          gateway_id: action.json[i].gateway_id,
          nodes: nodeData
        };
        nodesArray.push(gw_obj);
      }
      //console.log('processing receiveNodeList json', action.json,' nodeArray ',nodesArray);
      if (state.isLoading > 0) {
        return Object.assign({}, state, {
          isLoading: state.isLoading - 1,
          nodeList: nodesArray
        });
      } else {
        return Object.assign({}, state, {
          isLoading: 0,
          nodeList: nodesArray
        });
      }
    case "RECEIVE_SENSOR_DATA":
      //console.log('histogramDataSet reducer - action', action, 'state:', state);
      let newNodeData = [];
      for (let i in action.json) {
        console.log("receiving sensor data for node ", action.json[i].nodeID);
        newNodeData.push({
          nodeID: action.json[i].nodeID,
          sensorData: unpackSensorData(action.json[i].sensorData)
        });
      }

      let newData = insertSensorData(
        state.data,
        action.json[0]["gateway_id"],
        newNodeData,
      );

      //console.log('receiveSensorData newData', newData);
      if (state.isLoading > 0) {
        return Object.assign({}, state, {
          isLoading: state.isLoading - 1,
          data: newData
        });
      } else {
        return Object.assign({}, state, {
          isLoading: 0,
          data: newData
        });
      }

    case "RESET_SERVER_REQUESTS":
      return Object.assign({}, state, {
        isLoading: 0
      });
    default:
      return state;
  }
};

export default histogramDataSet;
