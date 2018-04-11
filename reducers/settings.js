const initialState = {
  myMQTTServer: 'myMQTTServer:5000',
  myGatewayID: 'myGatewayID',
}

const settings = (state = initialState, action) => {
  //console.log('settings reducer - action', action, 'state', state);
  switch (action.type) {
    case 'SET_MQTT_SERVER':
      return ({
        ...state,
        myMQTTServer: action.myMQTTServer,
      })
      case 'SET_GATEWAY_ID':
      return ({
        ...state,
        myGatewayID: action.myGatewayID,
      })
    default:
      //console.log('settings reducer returning default state:', state);
      return state;
  }
}

export default settings;
