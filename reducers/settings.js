import { parse } from "date-fns";

const initialState = {
  isLoading: 0,
  myMQTTServer: "myMQTTServer:5000",
  MQTTConfigured: false,
  gatewayConfigured: false,
  configVersion: "1.0",
  myGatewayIDList: ["myGatewayID"],
  settingsUpdated: false,
  configMessageAlert: false,
  nodeNicknamesList: [],
  /* test data
  nodeNicknamesList: [ {gateway_id: "111111", longname: "CT Basement GW", seq_no: 0, dirty: false,
                         nicknames: [ { nodeID: 1, shortname: "GW", longname: "Gateway", seq_no: 0, dirty: false },
                                      { nodeID: 2, shortname: "OUT",longname: "Outdoors",seq_no: 0, dirty: false },
                                      { nodeID: 3, shortname: "Bedrm", longname: "Bedroom", seq_no: 0, dirty: false },
                                    ],
                        },
                       { gateway_id: "222222", longname: "CT GW2", seq_no:0, dirty: false,
                         nicknames: [ { nodeID: 4, shortname: "GW2", longname: "Gateway2", seq_no: 0, dirty: false },
                                    ],
                        },
                      ],
  */
};

function replaceNodeNickname(newNicknames, newNodeNickName) {
  for (k = 0; k < newNicknames.length; k++) {
    if (newNicknames[k].nodeID == newNodeNickName.node_id) {
      newNicknames[k].shortname = newNodeNickName.shortname;
      newNicknames[k].longname = newNodeNickName.longname;
      newNicknames[k].seq_no = newNodeNickName.seq_no;
      return;
    }
  }
  let obj = {
    nodeID: newNodeNickName.node_id,
    shortname: newNodeNickName.shortname,
    longname: newNodeNickName.longname,
    seq_no: newNodeNickName.seq_no,
    dirty: false
  };

  newNicknames.push(obj);
}

const settings = (state = initialState, action) => {
  //console.log('settings reducer - action', action, 'state', state);
  let newNicknames = [];
  switch (action.type) {
    case "SET_MQTT_SERVER":
      return {
        ...state,
        myMQTTServer: action.myMQTTServer,
        MQTTConfigured: true,
        settingsUpdated: true
      };
    case "SET_GATEWAY_ID":
      //turn the comma separated list of GWs into an array of trimmed strings
      let GWList = action.myGatewayIDList.split(",").map(s => s.trim());
      console.log("GWList after split ", GWList);
      return {
        ...state,
        myGatewayIDList: GWList,
        gatewayConfigured: true,
        settingsUpdated: true
      };
    case "QUERY_SERVER_CONFIGURED":
      return {
        ...initialState,
        configMessageAlert: true
      };
    case "RECEIVE_NICKNAMES":
      if (state.nodeNicknamesList) {
        //This is a neat trick for deep copying objects
        newNicknamesList = JSON.parse(JSON.stringify(state.nodeNicknamesList));
      }
      //Loop through in the incoming nicknames and add or replace in the internal struct as needed
      //console.log('RECEIVE_NICKNAMES - action.json ', action.json);
      for (let i in action.json) {
        let foundGW = false;
        for (let j in newNicknamesList) {
          if (action.json[i].gateway_id == newNicknamesList[j].gateway_id) {
            foundGW = true;
            for (let k in action.json[i].nicknames) {
              newNicknamesList[j].longname = action.json[i].longname;
              newNicknamesList[j].seq_no = action.json[i].seq_no;
              newNicknamesList[j].dirty = false;
              newNicknameRow = action.json[i].nicknames[k];
              replaceNodeNickname(newNicknamesList[j].nicknames, newNicknameRow);
            }
          }
        }
        //If the gateway_id wasnt in our internal list, add it.
        if (foundGW != true) {
          let obj = {
            gateway_id: action.json[i].gateway_id,
            longname: action.json[i].longname,
            seq_no: action.json[i].seq_no,
            dirty: false,
            nicknames: []
          };
          for (let j in action.json[i].nicknames) {
            newNicknameRow = action.json[i].nicknames[j];
            replaceNodeNickname(obj.nicknames, newNicknameRow);
          }
          newNicknamesList.push(obj);
        }
      }
      //console.log("Nicknames set to ", newNicknamesList);
      return {
        ...state,
        isLoading: 0,
        nodeNicknamesList: newNicknamesList
      };
    case "RESET_DIRTY_NICKNAMES":
      newNicknamesList = JSON.parse(JSON.stringify(state.nodeNicknamesList));
      console.log('RESET_DIRTY_NICKNAMES newNicknamesList ', newNicknamesList);
      for (i in newNicknamesList) {
        newNicknamesList[i].dirty = false;
        for (j in newNicknamesList[i].nicknames) {
          newNicknamesList[i].nicknames[j].dirty = false;
        }
      }
      return {
        ...state,
        isLoading: 1,
        nodeNicknamesList: newNicknamesList
      };
    case "SET_SHORT_NICKNAME":
      if (state.nodeNicknamesList) {
        //This is a neat trick for deep copying objects
        newNicknamesList = JSON.parse(JSON.stringify(state.nodeNicknamesList));
        //console.log('copying state.nodeNicknamesList ', state.nodeNicknamesList, ' to newNicknames ', newNicknamesList);
      }
      found = false;
      for (i in newNicknamesList) {
        for (j in newNicknamesList[i].nicknames) {
          if (newNicknamesList[i].nicknames[j].nodeID == action.nodeID) {
            found = true;
            newNicknamesList[i].nicknames[j].shortname = action.value;
            newNicknamesList[i].nicknames[j].dirty = true;
          }
        }
        if (!found) {
          let obj = {
            nodeID: action.nodeID,
            shortname: action.value,
            longname: "",
            seq_no: 0,
            dirty: true
          };
          newNicknamesList[i].nicknames.push(obj);
          //console.log('adding new nickname obj ', obj, ' to newNicknames ', newNicknames);
        }
      }
      //console.log('SET_SHORT_NICKNAMES - newNicknames ', newNicknames);
      return {
        ...state,
        nodeNicknamesList: newNicknamesList
      };
    case "SET_LONG_NICKNAME":
      if (state.nodeNicknamesList) {
        //This is a neat trick for deep copying objects
        newNicknamesList = JSON.parse(JSON.stringify(state.nodeNicknamesList));
      }
      found = false;
      for (i in newNicknamesList) {
        for (j in newNicknamesList[i].nicknames) {
          if (newNicknamesList[i].nicknames[j].nodeID == action.nodeID) {
            found = true;
            newNicknamesList[i].nicknames[j].longname = action.value;
            newNicknamesList[i].nicknames[j].dirty = true;
          }
        }
        if (!found) {
          newNicknamesList[i].nicknames.push({
            nodeID: action.nodeID,
            shortname: "",
            longname: action.value,
            seq_no: 0,
            dirty: true
          });
        }
        //console.log('SET_LONG_NICKNAMES - newNicknames ', newNicknames);
      }
      return {
        ...state,
        nodeNicknamesList: newNicknamesList
      };
    case "SET_GW_NICKNAME":
      if (state.nodeNicknamesList) {
        //This is a neat trick for deep copying objects
        newNicknames = JSON.parse(JSON.stringify(state.nodeNicknamesList));
      }
      found = false;
      for (i in newNicknames) {
        if (newNicknames[i].gateway_id == action.gateway_id) {
          found = true;
          newNicknames[i].longname = action.value;
          newNicknames[i].dirty = true;
        }
      }
      if (!found) {
        newNicknames.push({
          gateway_id: action.gateway_id,
          longname: action.value,
          seq_no: 0,
          dirty: true
        });
      }
      console.log('SET_GW_NICKNAMES - action ', action, ' newNicknames ', newNicknames);
      return {
        ...state,
        nodeNicknamesList: newNicknames
      };
    case "REQUEST_NICKNAMES":
      return Object.assign({}, state, { isLoading: 1 });
    case "SETTINGS_SAVED":
      return Object.assign({}, state, { isLoading: 0 });
    default:
      //console.log('settings reducer returning default state:', state);
      return state;
  }
};

export default settings;
