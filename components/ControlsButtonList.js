import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import SelectNodes from '../containers/SelectNodes';

const getNicknameForNodeID = (nodeID, gateway_id, nicknamesList) => {
  let label=nodeID;
  for(let i in nicknamesList){
    if(nicknamesList[i].gateway_id == gateway_id){
      for(let j in nicknamesList[i].nicknames){
        if(nicknamesList[i].nicknames[j].nodeID == nodeID){
          label = nicknamesList[i].nicknames[j].shortname;
        }
      }  
    }
  }
  //console.log('Found label: ', label, ' for gateway_id: ', gateway_id, ' and nodeID: ', nodeID);
  return label;
}

function getGWNickname(gateway_id, nicknames) {
  for (i in nicknames) {
    if (nicknames[i].gateway_id == gateway_id && nicknames[i].longname != '') {
      return nicknames[i].longname;
    }
  }
  return 'Gateway: ' + gateway_id;
}

const ControlsButtonList = ({ list, nicknames }) => {
  //console.log('controlsButtonList created with list:', list, ' nicknames: ', nicknames);
  let buttonList = [];
  key=0;
  for (i in list) {

    color = "#C5E8ED";
    if (i % 2 == 0) {
      color = "#9ED9E0";
    }

    let nodeButtons = [];    
    buttonList.push(
      <View key={key++} style={{flexDirection: 'row', alignSelf: 'stretch', textAlign: 'center', backgroundColor: color}}>
        <Text 
          key={key++}
          style={{fontSize: 14, textAlign: 'center', color: 'steelblue'}}
        >
          {getGWNickname(list[i].gateway_id, nicknames)}
        </Text>
      </View>
    );
    
    for (j in list[i].nodes) {
      label = getNicknameForNodeID(list[i].nodes[j].nodeID, list[i].gateway_id, nicknames);
      nodeButtons.push(
        <SelectNodes
          key={key++}
          nodeID={list[i].nodes[j].nodeID}
          gateway_id={list[i].gateway_id}
          viewColor={color}>
            {label}
        </SelectNodes>
      )  
    }

    buttonList.push(
      <View key={key++} style={{flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', backgroundColor: color}}>
        <View key={key++} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
          {nodeButtons}
        </View>
      </View>
    );

  }

  //console.log('ControlsButtonList returning nodeButtons',nodeButtons);
  return (
    <View style={{flexDirection: 'column', alignItems: 'center'}}>
      {buttonList}
    </View>
  )
}

export default ControlsButtonList

const styles = StyleSheet.create({
  controlsButtonListGWLabel: {
    fontSize: 18,
    textAlign: "center",
    marginLeft: 20,
    marginBottom: 0
    //backgroundColor: '#443322',
  },
  controlsButtonListGWLabelView: {
    flexDirection: 'row',
    //fontSize: 14,
    textAlign: "left",
    //marginLeft: 20,
    //marginBottom: 5,
    //backgroundColor: '#443322',
  },
});
