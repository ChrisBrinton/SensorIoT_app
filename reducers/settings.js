const initialState = {
  myMQTTServer: 'myMQTTServer:5000',
  myGatewayID: 'myGatewayID',
}

const settings = (state = initialState, action) => {
  //console.log('settings reducer - action', action, 'state', state);
  switch (action.type) {
    default:
      //console.log('settings reducer returning default state:', state);
      return state;
  }
}

export default settings;
