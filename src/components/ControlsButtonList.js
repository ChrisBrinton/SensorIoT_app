import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleNode } from '../store/slices/histogramDataSetSlice';
import { fetchSensorData } from '../store/slices/histogramDataSetSlice';

function ControlsButtonList() {
  const dispatch = useDispatch();
  const nodeList = useSelector((state) => state.histogramDataSet.nodeList);
  const nicknames = useSelector((state) => state.settings.nodeNicknamesList);

  const handleToggle = (gateway_id, nodeID) => {
    dispatch(toggleNode({ gateway_id, nodeID }));
    dispatch(fetchSensorData());
  };

  const getNodeName = (gateway_id, nodeID) => {
    const gw = nicknames.find((n) => n.gateway_id === gateway_id);
    if (gw) {
      const node = gw.nicknames?.find((n) => n.nodeID === nodeID);
      if (node && node.shortname) {
        return node.shortname;
      }
    }
    return `Node ${nodeID}`;
  };

  // Flatten all nodes into a single list with gateway info
  const allNodes = [];
  nodeList.forEach((gw) => {
    gw.nodes?.forEach((node) => {
      allNodes.push({
        gateway_id: gw.gateway_id,
        nodeID: node.nodeID,
        isActive: node.isActive,
        color: node.color,
        name: getNodeName(gw.gateway_id, node.nodeID),
      });
    });
  });

  const renderNode = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.nodeButton,
        item.isActive && { backgroundColor: item.color },
      ]}
      onPress={() => handleToggle(item.gateway_id, item.nodeID)}
    >
      <Text
        style={[
          styles.nodeButtonText,
          item.isActive && styles.nodeButtonTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  if (allNodes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No nodes available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={allNodes}
        renderItem={renderNode}
        keyExtractor={(item) => `${item.gateway_id}-${item.nodeID}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  nodeButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E8F4F8',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  nodeButtonText: {
    fontSize: 14,
    color: '#666',
  },
  nodeButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
});

export default ControlsButtonList;
