const initialState = {
  myMQTTServer: 'myMQTTServer:5000',
  MQTTConfigured: false,
  myGatewayID: 'myGatewayID',
  gatewayConfigured: false,
  settingsUpdated: false,
  configMessageAlert: false,
}

const settings = (state = initialState, action) => {
  //console.log('settings reducer - action', action, 'state', state);
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
    default:
      //console.log('settings reducer returning default state:', state);
      return state;
  }
}

export default settings;
