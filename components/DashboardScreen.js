import React, { Component } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import DisplayDashboardList from '../containers/DisplayDashboardList';
import DashboardActivityIndicator from '../containers/DashboardActivityIndicator';
import DisplayDashboardRefresh from '../containers/DisplayDashboardRefresh';
import DisplayDashboardScrollView from '../containers/DisplayDashboardScrollView';

export class DashboardScreen extends Component {

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
    
        return {
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: 'powderblue',
          },
          heaterTintColor: 'steelblue',
          headerTitleStyle: {
            fontWeight: 'bold',
            width: '90%',
            textAlign: 'center',
            alignSelf: 'center',
          },
          headerLeft:(
            <View>
              <Button
                onPress={() => navigation.navigate('History', {parent: params.parent})}
                title="History"
                color="steelblue"
              />
            </View>
          ),
          headerRight:(
            <View>
              <Button
                onPress={() => navigation.navigate('Settings', {parent: params.parent})}
                title="Settings"
                color="steelblue"
              />
            </View>
          ),
        }
      };

    render() {
        return (
            <DisplayDashboardScrollView >
                <DisplayDashboardList/>
                <DashboardActivityIndicator/>
            </DisplayDashboardScrollView>
        )
    }
}

