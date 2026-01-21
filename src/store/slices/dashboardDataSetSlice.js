import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

const initialState = {
  isLoading: 0,
  nodeData: [],
};

function matchLatestType(nodeElement, json) {
  switch (json.type) {
    case 'F':
      nodeElement.latestData.F = json.value;
      return;
    case 'H':
      nodeElement.latestData.H = json.value;
      return;
    case 'P':
      nodeElement.latestData.P = json.value;
      return;
    case 'BAT':
      nodeElement.latestData.BAT = json.value;
      return;
    case 'RSSI':
      nodeElement.latestData.RSSI = json.value;
      return;
  }
}

function unpackLatestData(nodeData, json) {
  const nodeId = parseInt(json.node_id);
  for (let i = 0; i < nodeData.length; i++) {
    if (nodeData[i].nodeID === nodeId) {
      matchLatestType(nodeData[i], json);
      // Store as ISO string to keep Redux state serializable
      nodeData[i].nodeTime = new Date(json.time * 1000).toISOString();
      return;
    }
  }
  const newData = {
    nodeID: nodeId,
    latestData: { F: 0, H: 0, P: 0, BAT: 0, RSSI: 0 },
  };
  matchLatestType(newData, json);
  // Store as ISO string to keep Redux state serializable
  newData.nodeTime = new Date(json.time * 1000).toISOString();
  nodeData.push(newData);
}

// Helper function to check if server is configured
const checkServerConfigured = (state) => {
  try {
    if (state.settings.MQTTConfigured && state.settings.gatewayConfigured && state.settings.configVersion === '1.0') {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};

// Async thunk for fetching node latest data
export const fetchNodeLatestData = createAsyncThunk(
  'dashboardDataSet/fetchNodeLatestData',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    if (!checkServerConfigured(state)) {
      return rejectWithValue('Server not configured');
    }

    let gwList = '';
    for (let i = 0; i < state.settings.myGatewayIDList.length - 1; i++) {
      gwList = gwList + 'gw=' + state.settings.myGatewayIDList[i] + '&';
    }
    gwList = gwList + 'gw=' + state.settings.myGatewayIDList[state.settings.myGatewayIDList.length - 1];

    const url = 'https://' + state.settings.myMQTTServer + '/latests?' + gwList;
    console.log('fetchNodeLatestData using url:', url);

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      Alert.alert('Error communicating with Server');
      return rejectWithValue(error.message);
    }
  }
);

const dashboardDataSetSlice = createSlice({
  name: 'dashboardDataSet',
  initialState,
  reducers: {
    resetServerRequests: (state) => {
      state.isLoading = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNodeLatestData.pending, (state) => {
        state.isLoading = 1;
      })
      .addCase(fetchNodeLatestData.fulfilled, (state, action) => {
        const json = action.payload;
        const gatewayMap = new Map();
        
        for (let i in json) {
          const gwId = json[i].gateway_id;
          if (!gatewayMap.has(gwId)) {
            gatewayMap.set(gwId, []);
          }
          const nodeDataArray = gatewayMap.get(gwId);
          for (let j in json[i].latest) {
            unpackLatestData(nodeDataArray, json[i].latest[j]);
          }
        }
        
        // Convert Map to array, ensuring unique gateway entries
        const newNodeData = Array.from(gatewayMap.entries()).map(([gateway_id, latest]) => ({
          gateway_id,
          latest,
        }));
        
        state.isLoading = 0;
        state.nodeData = newNodeData;
      })
      .addCase(fetchNodeLatestData.rejected, (state) => {
        state.isLoading = 0;
      });
  },
});

export const { resetServerRequests } = dashboardDataSetSlice.actions;
export default dashboardDataSetSlice.reducer;
