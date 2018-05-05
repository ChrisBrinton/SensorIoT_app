import { connect } from 'react-redux'
import { setMQTTServer, setGatewayID } from '../actions'
import SettingsTextField from '../components/SettingsTextField'

const mapStateToProps = (state, ownProps) => {
  console.log('SetTextField mapStateToProps');
  let value
  switch(ownProps.label) {
    case 'MQTT Server':
      value = state.settings.myMQTTServer;
      break;
    case 'Gateway ID':
      value = state.settings.myGatewayID;
      break;
    default:
      value = undefined;
  }
  return ({
    value: value,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  onChangeText: (value) => {
      console.log('SetTextField mapDispatchToProps ownProps:', ownProps, 'value:', value);
      let action = {};
      switch(ownProps.label) {
        case 'MQTT Server':
          action = setMQTTServer(value);
          break;
        case 'Gateway ID':
          action = setGatewayID(value);
          break;
        default:
          action = {};
      }
      return(dispatch(action));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (SettingsTextField)
