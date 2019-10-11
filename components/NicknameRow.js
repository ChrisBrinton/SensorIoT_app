import React from 'react'
import SetTextField from '../containers/SetTextField'
import { StyleSheet, Text, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';

const NicknameRow = ({ label, viewcolor, titlecolor, onChangeShortText, onChangeLongText }) => {
  //console.log('NickNameRow - label', label, 'value', value, 'onChangeText', onChangeText);
  let shortKey = 'nicknameShort ' + label;
  let longKey = 'nicknameLong ' + label;
  return (
    <View style={{marginLeft:30, marginRight:10, marginTop:10, borderRadius:8, backgroundColor: viewcolor}}>
      <Text style={{marginLeft:5, backgroundColor: titlecolor}}>
        {label}
      </Text>
      <View style={styles.row}>
        <SetTextField
          title={shortKey}
          label='Short name'
          characterRestriction={6}
          containerStyle={ {width: 100, marginLeft:5} }
          inputContainerPadding={2}
          labelHeight={18}
          >
        </SetTextField>
        <SetTextField
          title={longKey}
          label='Long name'
          characterRestriction={20}
          containerStyle={ {width: 170, marginLeft: 10} }
          inputContainerPadding={2}
          labelHeight={18}
          >
        </SetTextField>
      </View>
    </View>
)}

export default NicknameRow

const styles = StyleSheet.create({
  rowContainer: {
//    backgroundColor: '#999999',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
});