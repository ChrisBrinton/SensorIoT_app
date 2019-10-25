import React from 'react';
import { Alert, ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';

let configured = false;

class SettingsCheckScreen extends React.Component {
    componentDidMount() {
        //This is where we need to decide whether the app has been configured or not
        //If it has, send the user to the DashboardScreen, otherwise they are sent to the
        //SettingsScreen
        if(configured) {
            console.log('SettingsCheckScreen componentDidMount - app is configured');
            this.props.navigation.navigate('Dashboard');
        } else {
            console.log('SettingsCheckScreen componentDidMount - app is NOT configured');
            Alert.alert('Please configure MQTT server and gateway');
            this.props.navigation.navigate('Settings');
        }
    }

    render() {
        return(
            <View>
                <ActivityIndicator />
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    if (state.settings.MQTTConfigured && state.settings.gatewayConfigured && state.settings.configVersion == "1.0") {
        configured = true;
    } else {
        console.log('SettingsCheckScreen mapStateToProps')
    }
    console.log('SettingsCheckScreen mapStateToProps - configured is ', configured);

    return({
        configured: configured,
    })
}

export default connect(mapStateToProps)(SettingsCheckScreen);