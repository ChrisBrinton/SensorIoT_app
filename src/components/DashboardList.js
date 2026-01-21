import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import GaugeRow from './GaugeRow';

function DashboardList({ navigation }) {
  const nodeData = useSelector((state) => state.dashboardDataSet.nodeData);
  const nicknames = useSelector((state) => state.settings.nodeNicknamesList);

  const renderGateway = ({ item: gateway }) => {
    // Find nickname for this gateway
    const gwNickname = nicknames.find((n) => n.gateway_id === gateway.gateway_id);
    const gwDisplayName = gwNickname?.longname || gateway.gateway_id;

    return (
      <View style={styles.gatewayContainer}>
        <Text style={styles.gatewayTitle}>{gwDisplayName}</Text>
        {gateway.latest?.map((node) => {
          // Find nickname for this node
          const nodeNickname = gwNickname?.nicknames?.find(
            (n) => n.nodeID === node.nodeID
          );
          const nodeDisplayName = nodeNickname?.shortname || `Node ${node.nodeID}`;

          return (
            <GaugeRow
              key={`${gateway.gateway_id}-${node.nodeID}`}
              gateway_id={gateway.gateway_id}
              nodeID={node.nodeID}
              nodeName={nodeDisplayName}
              latestData={node.latestData}
              navigation={navigation}
            />
          );
        })}
      </View>
    );
  };

  if (!nodeData || nodeData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No sensor data available</Text>
        <Text style={styles.emptySubtext}>
          Pull down to refresh or check your settings
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={nodeData}
      renderItem={renderGateway}
      keyExtractor={(item) => item.gateway_id}
      scrollEnabled={false}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  gatewayContainer: {
    marginBottom: 15,
  },
  gatewayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'steelblue',
    marginBottom: 10,
    paddingLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default DashboardList;
