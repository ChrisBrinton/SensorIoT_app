import React from 'React';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const RefreshActivityIndicator = ({isLoading}) => {
    let showSpinner = (isLoading > 0) ? true : false;
    console.log('RefreshActivityIndicator isLoading',isLoading,'showSpinner',showSpinner);
    if(showSpinner) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator
                    animating = {showSpinner}
                    color = 'powderblue'
                    size = 'large'
                    style = {styles.activityIndicator}
                />
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