import { parse } from "date-fns";

const initialState = {
  isLoading: 0,
  myMQTTServer: 'myMQTTServer:5000',
  MQTTConfigured: false,
  myGatewayID: 'myGatewayID',
  gatewayConfigured: false,
  settingsUpdated: false,
  configMessageAlert: false,
  nodeNicknames: [ {nodeID: 1, shortname: 'GW', longname: 'Gateway', seq_no: 0, dirty: false},
                  ],
}

function replaceNicknameRow(newNicknames, newNickNameRow) {
  for(k=0; k<newNicknames.length; k++){

      if(newNicknames[k]['nodeID'] == newNicknameRow['node_id']){
        newNicknames[k]['shortname'] = newNicknameRow['shortname'];
        newNicknames[k]['longname'] = newNicknameRow['longname'];
        newNicknames[k]['seq_no'] = newNicknameRow['seq_no'];    
        return;    
      }
    
  }
}

const settings = (state = initialState, action) => {
  //console.log('settings reducer - action', action, 'state', state);
  let newNicknames=[];
  switch (action.type) {
    case 'SET_MQTT_SERVER':
      return ({
        ...state,
        myMQTTServer: action.myMQTTServer,
        MQTTConfigured: true,
        settingsUpdated: true,
        configMessageAlert: false,
      })
    case 'SET_GATEWAY_ID':
      return ({
        ...state,
        myGatewayID: action.myGatewayID,
        gatewayConfigured: true,
        settingsUpdated: true,
        configMessageAlert: false,
      })
    case 'QUERY_SERVER_CONFIGURED':
      return ({
        ...state,
        configMessageAlert: true,
      })
    case 'RECEIVE_NICKNAMES':
      if(state.nodeNicknames){
        //This is a neat trick for deep copying objects
        newNicknames = JSON.parse(JSON.stringify( state.nodeNicknames ));
      }
      //If we've received a nickname list back from the server, overwrite what we have
//      console.log('receive nicknames action.json ', action.json);
      for (i=0; i<action.json.length; i++) {
        for (j=0; j<action.json[i]['nicknames'].length; j++) {
          newNicknameRow = action.json[i]['nicknames'][j];
//          console.log('before replaceNicknameRow newNicknames ', newNicknames, ' newNicknameRow ', newNicknameRow);
          replaceNicknameRow(newNicknames, newNicknameRow);
        }
      }
      return({
        ...state,
        isLoading: 0,
        nodeNicknames: newNicknames,
      })
    case 'RESET_DIRTY_NICKNAMES':
      newNicknames = JSON.parse(JSON.stringify( state.nodeNicknames ));
      for(i=0; i<newNicknames.length; i++) {
          newNicknames[i].dirty = false;
      }
      return ({
        ...state,
        isLoading: 1,
        nodeNicknames: newNicknames,
      })
    case 'SET_SHORT_NICKNAME':
      if(state.nodeNicknames){
        //This is a neat trick for deep copying objects
        newNicknames = JSON.parse(JSON.stringify( state.nodeNicknames ));
        //console.log('copying state.nodeNicknames ', state.nodeNicknames, ' to newNicknames ', newNicknames);
      }
      found = false;
      for(i=0;i<newNicknames.length;i++) {
        if(newNicknames[i].nodeID == action.nodeID){
          found = true;
          newNicknames[i].shortname = action.value;
          newNicknames[i].dirty = true;
        }
      }
      if(!found) {
        let obj = {nodeID: action.nodeID, shortname: action.value, longname: '', seq_no: 0, dirty: true};
        newNicknames.push(obj);
        //console.log('adding new nickname obj ', obj, ' to newNicknames ', newNicknames);
      }
      //console.log('SET_SHORT_NICKNAMES - newNicknames ', newNicknames);
      return({
        ...state,
        nodeNicknames: newNicknames,
      })
    case 'SET_LONG_NICKNAME':
      if(state.nodeNicknames){
        //This is a neat trick for deep copying objects
        newNicknames = JSON.parse(JSON.stringify( state.nodeNicknames ));
      }
      found = false;
      for(i=0;i<newNicknames.length;i++) {
        if(newNicknames[i].nodeID == action.nodeID){
          found = true;
          newNicknames[i].longname = action.value;
          newNicknames[i].dirty = true;
        }
      }
      if(!found) {
        newNicknames.push({nodeID: action.nodeID, shortname: '', longname: action.value, seq_no: 0, dirty: true});
      }
      //console.log('SET_LONG_NICKNAMES - newNicknames ', newNicknames);
      return({
        ...state,
        nodeNicknames: newNicknames,
      })
    case 'REQUEST_NICKNAMES':
      return Object.assign({}, state, {isLoading: 1});
    case 'SETTINGS_SAVED':
    return Object.assign({}, state, {isLoading: 0});      
    default:
      //console.log('settings reducer returning default state:', state);
      return state;
  }
}

export default settings;
