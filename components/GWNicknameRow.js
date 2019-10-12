import React from 'react'
import SetTextField from '../containers/SetTextField'
import { StyleSheet, Text, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';

const GWNicknameRow = ({ label, viewcolor, titlecolor, onChangeShortText, onChangeLongText }) => {
  //console.log('NickNameRow - label', label, 'value', value, 'onChangeText', onChangeText);
  let longKey = 'nicknameGW ' + label;
  return (
    <View style={{marginLeft:5, marginRight:10, marginTop:10, borderRadius:8, backgroundColor: viewcolor}}>
      <Text style={{marginLeft:5, backgroundColor: titlecolor}}>
        {label}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <SetTextField
          title={longKey}
          label='Gateway Name'
          characterRestriction={20}
          containerStyle={ {width: 170, marginLeft: 10} }
          inputContainerPadding={2}
          labelHeight={18}
          >
        </SetTextField>
      </View>
    </View>
)}

export default GWNicknameRow
