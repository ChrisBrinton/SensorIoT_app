import React from 'React';
import { StyleSheet, Text, View } from 'react-native';
import DisplayGaugeRow from '../containers/DisplayGaugeRow';
import PropTypes from 'prop-types';

const DashboardList = ({ list }) => {
  console.log('DashboardList created with list:', list);
  let gaugeRows = [];
  for (let i=0; i < list.length; i++) {
    gaugeRows.push(
      <DisplayGaugeRow
        key={i}
        nodeIndex={i}
        style={styles.dashboardList}>
          {list[i].nodeID}
      </DisplayGaugeRow>
    )
  }

  //console.log('DashboardList returning gaugeRows', gaugeRows);
  return (
    gaugeRows
  )
}

export default DashboardList

const styles = StyleSheet.create({
    dashboardList: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: 'powderblue',   
    },
  });
  