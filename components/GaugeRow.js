import React from 'React';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import DisplayGauge from '../containers/DisplayGauge';
import { format } from 'date-fns';

const GaugeRow = ({ node, children }) => {
    //console.log('GaugeRow created with node:', node);
    return (
        <View style={{ marginBottom: 10, backgroundColor: '#BFE6EB' }}>
            <Text style={GaugeRowPortraitStyles.dashboardRowLabel}>
                Sensor {node.nodeID} - Updated: {format(node.nodeTime, 'MM/DD/YYYY HH:mm')}
            </Text>
            <View style={GaugeRowPortraitStyles.dashboardRow}>
                <DisplayGauge
                    type='Temp'
                    value={node.latestData.F}>
                </DisplayGauge>
                <DisplayGauge
                    type='Hum'
                    value={node.latestData.H}>
                </DisplayGauge>
                <DisplayGauge
                    type='Pres'
                    value={node.latestData.P}>
                </DisplayGauge>
                <DisplayGauge
                    type='Batt'
                    value={node.latestData.BAT}>
                </DisplayGauge>
            </View>
        </View>
    )
}

export default GaugeRow
const GaugeRowPortraitStyles = StyleSheet.create({
    dashboardRowLabel: {
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 20,
        marginBottom: 0,
        //backgroundColor: '#443322',
    },
    dashboardRow: {
        flexDirection: 'row',
        height: 120,
        //backgroundColor: 'powderblue',
        margin:0,
        marginLeft:20,
        marginRight:20,
        //backgroundColor: '#889900',
  },
})