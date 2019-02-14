import { connect } from 'react-redux'
import { setMQTTServer, setGatewayID, setShortNickname, setLongNickname, getNicknames, fetchNodeList, noAction } from '../actions'
import SettingsTextField from '../components/SettingsTextField'

const mapStateToProps = (state, ownProps) => {
  //console.log('SetTextField mapStateToProps ownProps: ', ownProps);
  let value
  let subTitle = '';
  let bits = [];
  if(ownProps.title.indexOf('nickname') !== -1){
    bits = ownProps.title.split(' ');
    subTitle = bits[0];
    bits = ownProps.title.split(':');
    nodeID = parseInt(bits[bits.length-1]);
  } else {
    subTitle = ownProps.title;
  }
  switch(subTitle) {
    case 'MQTT Server':
      value = state.settings.myMQTTServer;
      break;
    case 'Gateway ID':
      value = state.settings.myGatewayID;
      break;
    case 'nicknameShort':
      //console.log('state.settings.nodeNicknames ', state.settings.nodeNicknames);
      for(i=0;i<state.settings.nodeNicknames.length;i++){
        if(state.settings.nodeNicknames[i].nodeID == nodeID){
          value = state.settings.nodeNicknames[i].shortname;
        }
      }
      //console.log('SetTextField mapStateToProps nicknameShort nodeID ', nodeID, ' value ', value);
      break;
    case 'nicknameLong':
      for(i=0;i<state.settings.nodeNicknames.length;i++){
        if(state.settings.nodeNicknames[i].nodeID == nodeID){
          value = state.settings.nodeNicknames[i].longname;
        }
      }
      //console.log('SetTextField mapStateToProps nicknameLong nodeID ', nodeID, ' value ', value);
    break;
    default:
      value = undefined;
  }
  return ({
    value: value,
    title: ownProps.title,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('SetTextField mapDispatchToProps ownProps:', ownProps, 'value:', value);
  let action = noAction();
  let subTitle = '';
  let bits = [];
  if(ownProps.title.indexOf('nickname') !== -1){
    bits = ownProps.title.split(' ');
    subTitle = bits[0];
    nodeID = parseInt(bits[bits.length-1]);
  } else {
    subTitle = ownProps.title;
  }
  return {
    onChangeText: (value) => {
      //console.log('SetTextField mapDispatchToProps subTitle ', subTitle, ' nodeID ', nodeID, ' value ', value);
      switch(subTitle) {
        case 'MQTT Server':
          action = setMQTTServer(value);
          break;
        case 'Gateway ID':
          action = setGatewayID(value);
          break;
        case 'nicknameShort':
          //console.log('SetTextField mapDispatchToProps ShortName nodeID:', nodeID, 'value:', value);
          action = setShortNickname(nodeID, value);
          break;
        case 'nicknameLong':
          //console.log('SetTextField mapDispatchToProps LongName nodeID:', nodeID, 'value:', value);
          action = setLongNickname(nodeID, value);
          break;
        default:
          action = {};
      }
      return(dispatch(action));
    },
    onEndEditing: () => {
      console.log('TextInput onEndEditing');
      switch(subTitle) {
        case 'MQTT Server':
          dispatch(getNicknames());
          return(dispatch(fetchNodeList()));
        case 'Gateway ID':
          dispatch(getNicknames());
          return(dispatch(fetchNodeList()));
        case 'nicknameShort':
          //console.log('SetTextField mapDispatchToProps ShortName nodeID:', nodeID, 'value:', value);
          break;
        case 'nicknameLong':
          //console.log('SetTextField mapDispatchToProps LongName nodeID:', nodeID, 'value:', value);
          action = noAction();
          break;
        default:
          action = noAction();
      }
      return;
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (SettingsTextField)
