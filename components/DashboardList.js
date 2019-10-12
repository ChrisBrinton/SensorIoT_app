import React from "React";
import { StyleSheet, Text, View } from "react-native";
import DisplayGaugeRow from "../containers/DisplayGaugeRow";
import PropTypes from "prop-types";

function getGWNickname(gateway_id, nicknames) {
  for (i in nicknames) {
    if (nicknames[i].gateway_id == gateway_id && nicknames[i].longname != '') {
      return nicknames[i].longname;
    }
  }
  return 'Gateway: ' + gateway_id;
}

const DashboardList = ({ list, nicknames, navigation }) => {
  //console.log("DashboardList created with list:", list);
  let gaugeRows = [];
  for (i in list) {
    if (list.length > 1) {
      gaugeRows.push(
        <Text 
          style={styles.dashboardGWLabel}
          key={i}
        >
          {getGWNickname(list[i].gateway_id, nicknames)}
        </Text>
      );
    }
    for (j in list[i].latest) {
      gaugeRows.push(
        <DisplayGaugeRow
          key={i * list.length + j}
          gateway_id={list[i].gateway_id}
          node_id={list[i].latest[j].nodeID}
          nodeIndex={j}
          style={styles.dashboardList}
          navigation={navigation}
        >
          {list[i].latest[j].nodeID}
        </DisplayGaugeRow>
      );
    }
  }

  //console.log('DashboardList returning gaugeRows', gaugeRows);
  return gaugeRows;
};

export default DashboardList;

const styles = StyleSheet.create({
  dashboardGWLabel: {
    fontSize: 18,
    textAlign: "center",
    marginLeft: 20,
    marginBottom: 0
    //backgroundColor: '#443322',
  },
  dashboardList: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "powderblue"
  }
});
