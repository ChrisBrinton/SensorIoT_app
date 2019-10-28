import { connect } from "react-redux";
import {
  setMQTTServer,
  setGatewayID,
  setShortNickname,
  setLongNickname,
  setGWNickname,
  fetchNicknames,
  fetchNodeList,
  noAction
} from "../actions";
import SettingsTextField from "../components/SettingsTextField";

const mapStateToProps = (state, ownProps) => {
  //console.log("SetTextField mapStateToProps ownProps: ", ownProps);
  let value;
  let subTitle = "";
  let bits = [];
  if (ownProps.title.indexOf("nickname") !== -1) {
    bits = ownProps.title.split(" ");
    subTitle = bits[0];
    //bits = ownProps.title.split(":");
    //nodeID = parseInt(bits[bits.length - 1]);
    //gateway_id = bits[bits.length - 1].trim();
    nodeID = ownProps.nodeID;
    gateway_id = ownProps.gateway_id;
  } else {
    subTitle = ownProps.title;
  }
  switch (subTitle) {
    case "MQTT Server":
      value = state.settings.myMQTTServer;
      break;
    case "Gateway IDs":
      value = state.settings.myGatewayIDList.toString();
      break;
    case "nicknameShort":
      //console.log('state.settings.nodeNicknamesList ', state.settings.nodeNicknamesList);
      let found = false;
      for (let i in state.settings.nodeNicknamesList) {
        if(state.settings.nodeNicknamesList[i].gateway_id == gateway_id) {
          for (let j in state.settings.nodeNicknamesList[i].nicknames) {
            if (state.settings.nodeNicknamesList[i].nicknames[j].nodeID == nodeID) {
              value = state.settings.nodeNicknamesList[i].nicknames[j].shortname;
              found = true;
              if(nodeID == 1){
                console.log('nodeID 1 - gateway_id ', gateway_id, ' value ', value, ' nodeNicknamesList ', state.settings.nodeNicknamesList);
              }
            }
          }  
        }
      }
      if(!found){
        console.warn('SetTextField mapStateToProps nicknameShort gateway_id ', gateway_id, ' nodeID ', nodeID, ' not found! nodeNicknamesList: ', state.settings.nodeNicknamesList);
      }
      break;
    case "nicknameLong":
      for (let i in state.settings.nodeNicknamesList) {
        if(state.settings.nodeNicknamesList[i].gateway_id == gateway_id) {
          for (let j in state.settings.nodeNicknamesList[i].nicknames) {
            if (state.settings.nodeNicknamesList[i].nicknames[j].nodeID == nodeID) {
              value = state.settings.nodeNicknamesList[i].nicknames[j].longname;
            }
          }
        }
      }
      //console.log('SetTextField mapStateToProps nicknameLong nodeID ', nodeID, ' value ', value);
      break;
    case "nicknameGW":
      console.log( "subTitle: ", subTitle, " nodeID: ", nodeID, " gateway_id: ", gateway_id);
      for (let i in state.settings.nodeNicknamesList) {
        if (state.settings.nodeNicknamesList[i].gateway_id == gateway_id) {
          value = state.settings.nodeNicknamesList[i].longname;
          //console.log('SetTextField mapStateToProps nicknameLong gateway_id ', gateway_id, ' value ', value);
        }
      }
      break;
    default:
      value = undefined;
  }
  return {
    value: value,
    title: ownProps.title
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('SetTextField mapDispatchToProps ownProps:', ownProps, 'value:', value);
  return {
    onChangeText: value => {
      let action = noAction();
      let subTitle = "";
      let bits = [];
      let nodeID = 0;
      if (ownProps.title.indexOf("nickname") !== -1) {
        bits = ownProps.title.split(" ");
        subTitle = bits[0];
        //nodeID = parseInt(bits[bits.length - 1]);
        //gateway_id = bits[bits.length - 1].trim();
        nodeID = ownProps.nodeID;
        gateway_id = ownProps.gateway_id;
      } else {
        subTitle = ownProps.title;
      }
      //console.log("SetTextField mapDispatchToProps onChangeText title ", ownProps.title, "subTitle ", subTitle, " nodeID ", nodeID, " value ", value);
      switch (subTitle) {
        case "MQTT Server":
          action = setMQTTServer(value);
          break;
        case "Gateway IDs":
          action = setGatewayID(value);
          break;
        case "nicknameShort":
          console.log('SetTextField mapDispatchToProps ShortName gateway_id:', gateway_id, 'nodeID:', nodeID, 'value:', value);
          action = setShortNickname(gateway_id, nodeID, value);
          break;
        case "nicknameLong":
          //console.log('SetTextField mapDispatchToProps LongName nodeID:', nodeID, 'value:', value);
          action = setLongNickname(gateway_id, nodeID, value);
          break;
        case "nicknameGW":
          console.log('SetTextField mapDispatchToProps gateway_id ', gateway_id, ' value ', value);
          action = setGWNickname(gateway_id, value);
          break;
        default:
          action = {};
      }
      return dispatch(action);
    },
    onEndEditing: () => {
      let subTitle = "";
      let bits = [];
      if (ownProps.title.indexOf("nickname") !== -1) {
        bits = ownProps.title.split(" ");
        subTitle = bits[0];
        //nodeID = parseInt(bits[bits.length - 1]);
        nodeID = ownProps.nodeID;
      } else {
        subTitle = ownProps.title;
      }
      console.log('TextInput onEndEditing subTitle ', subTitle);
      switch (subTitle) {
        case "MQTT Server":
          dispatch(fetchNicknames());
          return dispatch(fetchNodeList());
        case "Gateway IDs":
          dispatch(fetchNicknames());
          return dispatch(fetchNodeList());
        case "nicknameShort":
          //console.log('SetTextField mapDispatchToProps ShortName nodeID:', nodeID, 'value:', value);
          action = noAction();
          break;
        case "nicknameLong":
          //console.log('SetTextField mapDispatchToProps LongName nodeID:', nodeID, 'value:', value);
          action = noAction();
          break;
        case "nicknameGW":
          //console.log('SetTextField mapDispatchToProps LongName nodeID:', nodeID, 'value:', value);
          action = noAction();
          break;
        default:
          action = noAction();
      }
      return;
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsTextField);
