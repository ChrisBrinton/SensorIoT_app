import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const RefreshActivityIndicator = ({children, isLoading}) => {
    let showSpinner = (isLoading > 0) ? true : false;
    console.log('RefreshActivityIndicator isLoading',isLoading,'showSpinner',showSpinner);
    if(showSpinner) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <View style={styles.activityIndicator}>
                    <ActivityIndicator
                        animating = {showSpinner}
                        color = 'powderblue'
                        size = 'large'>
                    </ActivityIndicator>
                    <Text style={{color: 'powderblue', justifyContent: 'space-between'}}>
                        {children}
                    </Text>
                </View>
            </View>
            )
        } else {
            return(
                <View />
            )
        }
}

export default RefreshActivityIndicator;

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        backgroundColor: 'black',
        opacity: .7,
        borderRadius: 8,
        overflow: 'hidden',
    },
});