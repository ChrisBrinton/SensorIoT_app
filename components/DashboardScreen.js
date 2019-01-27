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
import DisplayDashboardScrollView from '../containers/DisplayDashboardScrollView';
import { fetchNodeList, fetchNodeLatestData } from '../actions';
import { connect } from 'react-redux';

let createHandlers = function(dispatch) {
  let componentDidFocus = function(payload) {
    console.log('DashboardScreen - didFocus ');
    dispatch(fetchNodeList());
    dispatch(fetchNodeLatestData());
  }

  let componentWillBlur = function() {
    console.log('DashboardScreen - didBlur');
  }

  return {
    componentDidFocus,
    componentWillBlur,
  };
}

class DashboardScreen extends Component {

  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
    //console.log('Output of createHandlers - this.handlers: ', this.handlers);
  }

  componentDidMount() {
    console.log('DashboardScreen - componentDidMount')
    this.subs = [
      this.props.navigation.addListener("didFocus", payload => {this.handlers.componentDidFocus(payload)}),
      this.props.navigation.addListener("willBlur", () => {this.handlers.componentWillBlur()})
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  componentWillMount() {
    console.log('DashboardScreen - componentWillMount')
  }
 
  static navigationOptions = ({navigation}) => {
      const params = navigation.state.params || {};
  
      return {
        title: 'Dashboard',
        headerStyle: {
          backgroundColor: 'powderblue',
        },
        headerTintColor: 'steelblue',
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

export default connect()(DashboardScreen);