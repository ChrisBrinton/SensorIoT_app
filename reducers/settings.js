const initialState = {
  myMQTTServer: 'myMQTTServer:5000',
  MQTTConfigured: false,
  myGatewayID: 'myGatewayID',
  gatewayConfigured: false,
}

const settings = (state = initialState, action) => {
  //console.log('settings reducer - action', action, 'state', state);
  switch (action.type) {
    case 'SET_MQTT_SERVER':
      return ({
        ...state,
        myMQTTServer: action.myMQTTServer,
        MQTTConfigured: true,
      })
      case 'SET_GATEWAY_ID':
      return ({
        ...state,
        myGatewayID: action.myGatewayID,
        gatewayConfigured: true,
      })
    default:
      //console.log('settings reducer returning default state:', state);
      return state;
  }
}

export default settings;
