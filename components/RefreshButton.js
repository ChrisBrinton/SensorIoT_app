import React from 'React';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const RefreshButton = ({ onPress }) => {
  return (
    <TouchableHighlight 
      style={RefreshButtonStyles.refreshContainer}
      onPress={onPress}
      underlayColor="white">
      <View style={RefreshButtonStyles.refreshContainer}>
        <Text 
          style={RefreshButtonStyles.refreshText}
          adjustFontSizeToFit={true}
          >
          Refresh
        </Text>
      </View>
    </TouchableHighlight>
  )
}

export default RefreshButton

RefreshButton.propTypes = {
  onPress: PropTypes.func.isRequired,
}

const RefreshButtonStyles = StyleSheet.create({
    refreshContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'powderblue',
        margin: 1,//10
//        marginTop: 1,//5
//        padding: 1,
//        height: 40,
//        backgroundColor: '#FFDDAA',
      },
      refreshText: {
        textAlign: 'center',
        fontSize: 35, //35
//        marginTop: 10,
//        paddingTop: 0,
//        backgroundColor: '#DDCCFF',
      },
});
