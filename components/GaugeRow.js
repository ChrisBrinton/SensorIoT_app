import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import DisplayGauge from '../containers/DisplayGauge';
import DisplayBattRSSI from '../containers/DisplayBattRSSI';
import { format } from 'date-fns';
import {withNavigation} from 'react-navigation'

const GaugeRow = ({ gateway_id, node, label, navigation ,children }) => {
    let deviceWidth = Dimensions.get('window').width;
    let gaugeSize = parseInt((deviceWidth - 20*2)/4 - 2*2);

    //console.log('GaugeRow created with node:', node, deviceWidth, gaugeSize);

    if(label){
        showlabel = label;
    } else {
        showlabel = 'Sensor ' + node.nodeID;
    }
    return (
        <View style={{ marginBottom: 10, backgroundColor: '#BFE6EB' }}>
            <Text style={GaugeRowPortraitStyles.dashboardRowLabel}>
                {showlabel} - {format(node.nodeTime, 'MM/dd/yyyy HH:mm')}
            </Text>
            <View style={GaugeRowPortraitStyles.dashboardRow}>
                <DisplayGauge
                    type='Temp'
                    size={gaugeSize}
                    value={node.latestData.F}
                    onPress={() => { navigation.navigate('History', {gateway_id: gateway_id, defaultNode: node.nodeID, sensor: 'TempF'}) } }>
                </DisplayGauge>
                <DisplayGauge
                    type='Hum'
                    size={gaugeSize}
                    value={node.latestData.H}
                    onPress={() => { navigation.navigate('History', {gateway_id: gateway_id, defaultNode: node.nodeID, sensor: 'Hum'}) } }>
                </DisplayGauge>
                <DisplayGauge
                    type='Pres'
                    size={gaugeSize}
                    value={node.latestData.P}
                    onPress={() => { navigation.navigate('History', {gateway_id: gateway_id, defaultNode: node.nodeID, sensor: 'Pres'}) } }>
                </DisplayGauge>
                <DisplayBattRSSI
                    type='Batt'
                    size={gaugeSize}
                    batVal={node.latestData.BAT}
                    sigVal={node.latestData.RSSI}
                    onPress={() => { navigation.navigate('History', {gateway_id: gateway_id, defaultNode: node.nodeID, sensor: 'Batt'}) } }>
                </DisplayBattRSSI>
            </View>
        </View>
    )
}

export default GaugeRow
const GaugeRowPortraitStyles = StyleSheet.create({
    dashboardRowLabel: {
        fontSize: 18,
        textAlign: 'center',
        marginLeft: 20,
        marginBottom: 0,
        //backgroundColor: '#443322',
    },
    dashboardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 120,
        //backgroundColor: 'powderblue',
        margin:0,
        marginLeft:10,
        marginRight:10,
        //backgroundColor: '#889900',
  },
})