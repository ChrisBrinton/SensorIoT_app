import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setShortNickname, setLongNickname, setGWNickname } from '../store/slices/settingsSlice';

function NicknameList() {
  const dispatch = useDispatch();
  const nodeNicknamesList = useSelector((state) => state.settings.nodeNicknamesList);

  const handleGWNicknameChange = (gateway_id, value) => {
    dispatch(setGWNickname({ gateway_id, value }));
  };

  const handleShortNicknameChange = (gateway_id, nodeID, value) => {
    dispatch(setShortNickname({ gateway_id, nodeID, value }));
  };

  const handleLongNicknameChange = (gateway_id, nodeID, value) => {
    dispatch(setLongNickname({ gateway_id, nodeID, value }));
  };

  const renderGateway = ({ item: gw }) => (
    <View style={styles.gatewayContainer}>
      <View style={styles.gwRow}>
        <Text style={styles.gwLabel}>Gateway: {gw.gateway_id}</Text>
        <TextInput
          style={styles.gwInput}
          value={gw.longname || ''}
          onChangeText={(text) => handleGWNicknameChange(gw.gateway_id, text)}
          placeholder="Gateway nickname"
          placeholderTextColor="#999"
        />
      </View>
      {gw.nicknames?.map((node) => (
        <View key={node.nodeID} style={styles.nodeRow}>
          <Text style={styles.nodeLabel}>Node {node.nodeID}:</Text>
          <View style={styles.nodeInputs}>
            <TextInput
              style={styles.shortInput}
              value={node.shortname || ''}
              onChangeText={(text) =>
                handleShortNicknameChange(gw.gateway_id, node.nodeID, text)
              }
              placeholder="Short"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.longInput}
              value={node.longname || ''}
              onChangeText={(text) =>
                handleLongNicknameChange(gw.gateway_id, node.nodeID, text)
              }
              placeholder="Long name"
              placeholderTextColor="#999"
            />
          </View>
        </View>
      ))}
    </View>
  );

  if (!nodeNicknamesList || nodeNicknamesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No nicknames configured</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={nodeNicknamesList}
      renderItem={renderGateway}
      keyExtractor={(item) => item.gateway_id}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  gatewayContainer: {
    marginBottom: 15,
    backgroundColor: '#E8F4F8',
    borderRadius: 10,
    padding: 10,
  },
  gwRow: {
    marginBottom: 10,
  },
  gwLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'steelblue',
    marginBottom: 5,
  },
  gwInput: {
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    fontSize: 14,
  },
  nodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nodeLabel: {
    width: 70,
    fontSize: 12,
    color: '#666',
  },
  nodeInputs: {
    flex: 1,
    flexDirection: 'row',
  },
  shortInput: {
    flex: 1,
    height: 32,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    fontSize: 12,
    marginRight: 5,
  },
  longInput: {
    flex: 2,
    height: 32,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    fontSize: 12,
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

export default NicknameList;
