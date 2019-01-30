import { parse } from "date-fns";

const initialState = {
  myMQTTServer: 'myMQTTServer:5000',
  MQTTConfigured: false,
  myGatewayID: 'myGatewayID',
  gatewayConfigured: false,
  settingsUpdated: false,
  configMessageAlert: false,
  nodeNicknames: [ {nodeID:1, shortname:'GW', longname:'Gateway'},
                    {nodeID:2, shortname:'Num2', longname:'Second Node'},
                  ],
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
        }
      }
      if(!found) {
        let obj = {nodeID: action.nodeID, shortname: action.value, longname: ''}
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
        }
      }
      if(!found) {
        newNicknames.push({nodeID: action.nodeID, shortname: '', longname: action.value});
      }
      //console.log('SET_LONG_NICKNAMES - newNicknames ', newNicknames);
      return({
        ...state,
        nodeNicknames: newNicknames,
      })
    default:
      //console.log('settings reducer returning default state:', state);
      return state;
  }
}

export default settings;
