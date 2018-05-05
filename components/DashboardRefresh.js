import React from 'React';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DashboardRefresh = ({onPress}) => {
    console.log('DashboardRefresh ');
    return (
        <TouchableOpacity
            onPress = {onPress}
            style = {styles.dashboardRefreshContainer}>
            <View/>
        </TouchableOpacity>
    )
}

export default DashboardRefresh;

const styles = StyleSheet.create({
    dashboardRefreshContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});