import React from 'React';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const RefreshButton = ({ onPress }) => {
  return (
    <TouchableHighlight
    onPress={onPress}
    underlayColor="white">
    <View style={RefreshButtonStyles.refreshContainer}>
      <Text style={RefreshButtonStyles.refreshText}>
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
        margin: 10,
        marginTop: 5,
        height: 75,
      },
      refreshText: {
        textAlign: 'center',
        fontSize: 35,
      },
});
