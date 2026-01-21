import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

const nodeColors = [
  '#C14242', '#3F3FBF', '#3FBF3F', '#DD7C1C', '#B33BB3',
  '#990033', '#6666FF', '#33CCCC', '#CC6600', '#FFB3FF',
  '#AAB3FF', '#BBFFAA', '#AABBFF',
];

const initialState = {
  nodeList: [],
  isLoading: 0,
  data: [],
  initialized: false,
};

function findNode(nodeList, gateway_id, nodeID) {
  for (let i in nodeList) {
    if (nodeList[i].gateway_id === gateway_id) {
      for (let j in nodeList[i].nodes) {
        if (nodeList[i].nodes[j].nodeID === nodeID) {
          return j;
        }
      }
    }
  }
  return null;
}

function unpackSensorData(json) {
  const list = [];
  for (let i in json) {
    // Store timestamp as number to keep Redux state serializable
    // The chart component will convert to Date when needed
    list[i] = { value: json[i].value, date: json[i].time * 1000 };
  }
  return list;
}

function insertSensorData(data, gw, nodeData) {
  const results = [];
  let found = false;
  for (let i in data) {
    const obj = { gateway_id: data[i].gateway_id, nodes: [] };
    if (data[i].gateway_id === gw) {
      obj.nodes = nodeData;
      found = true;
    } else {
      obj.nodes = data[i].nodes;
    }
    results.push(obj);
  }
  if (!found) {
    results.push({ gateway_id: gw, nodes: nodeData });
  }
  return results;
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

// Async thunk for fetching node list
export const fetchNodeList = createAsyncThunk(
  'histogramDataSet/fetchNodeList',
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

    const url = 'https://' + state.settings.myMQTTServer + '/nodelists?' + gwList + '&period=' + state.xAxis.xDateRange;
    console.log('fetchNodeList using url:', url);

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

// Async thunk for fetching sensor data
export const fetchSensorData = createAsyncThunk(
  'histogramDataSet/fetchSensorData',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    if (!checkServerConfigured(state)) {
      return rejectWithValue('Server not configured');
    }

    const results = [];
    
    for (let i in state.histogramDataSet.nodeList) {
      let nodes = '';
      for (let j in state.histogramDataSet.nodeList[i].nodes) {
        const nodeID = state.histogramDataSet.nodeList[i].nodes[j].nodeID;
        const active = state.histogramDataSet.nodeList[i].nodes[j].isActive;
        if (active) {
          nodes += 'node=' + nodeID + '&';
        }
      }
      
      if (nodes !== '') {
        const gateway_id = state.histogramDataSet.nodeList[i].gateway_id;
        const url = 'https://' + state.settings.myMQTTServer + '/gw/' + gateway_id +
          '?' + nodes + 'type=' + state.yAxis.dataQueryKey + '&period=' + state.xAxis.xDateRange + '&timezone=EST5EDT';
        
        try {
          const response = await fetch(url);
          const json = await response.json();
          results.push({ gateway_id, json });
        } catch (error) {
          console.error('Error fetching sensor data:', error);
        }
      }
    }
    
    return results;
  }
);

const histogramDataSetSlice = createSlice({
  name: 'histogramDataSet',
  initialState,
  reducers: {
    toggleNode: (state, action) => {
      const { gateway_id, nodeID } = action.payload;
      for (let i in state.nodeList) {
        if (state.nodeList[i].gateway_id === gateway_id) {
          for (let j in state.nodeList[i].nodes) {
            if (state.nodeList[i].nodes[j].nodeID === nodeID) {
              state.nodeList[i].nodes[j].isActive = !state.nodeList[i].nodes[j].isActive;
            }
          }
        }
      }
    },
    setDefaultNode: (state, action) => {
      const { gateway_id, nodeID } = action.payload;
      if (state.initialized) {
        return;
      }
      
      for (let i in state.nodeList) {
        if (state.nodeList[i].gateway_id === gateway_id) {
          for (let j in state.nodeList[i].nodes) {
            if (state.nodeList[i].nodes[j].nodeID === nodeID) {
              state.nodeList[i].nodes[j].isActive = true;
            }
          }
        }
      }
      state.initialized = true;
    },
    clearActiveFlags: (state) => {
      for (let i in state.nodeList) {
        for (let j in state.nodeList[i].nodes) {
          state.nodeList[i].nodes[j].isActive = false;
        }
      }
      state.initialized = false;
    },
    clearServerData: (state) => {
      state.data = [];
    },
    resetServerRequests: (state) => {
      state.isLoading = 0;
    },
    queryServerConfigured: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNodeList.pending, (state) => {
        state.isLoading = state.isLoading + 1;
      })
      .addCase(fetchNodeList.fulfilled, (state, action) => {
        const json = action.payload;
        const nodesArray = [];
        let colorCount = 0;
        
        for (let i in json) {
          const nodeData = [];
          for (let j in json[i].nodes) {
            const h = findNode(state.nodeList, json[i].gateway_id, json[i].nodes[j]);
            let oldIsActive = false;
            if (h !== null && state.nodeList[i]) {
              oldIsActive = state.nodeList[i].nodes[h].isActive;
            }
            if (colorCount >= nodeColors.length) {
              colorCount = nodeColors.length - 1;
            }
            nodeData.push({
              nodeID: json[i].nodes[j],
              isActive: oldIsActive,
              color: nodeColors[colorCount],
            });
            colorCount++;
          }
          nodesArray.push({
            gateway_id: json[i].gateway_id,
            nodes: nodeData,
          });
        }
        
        state.isLoading = Math.max(0, state.isLoading - 1);
        state.nodeList = nodesArray;
      })
      .addCase(fetchNodeList.rejected, (state) => {
        state.isLoading = Math.max(0, state.isLoading - 1);
      })
      .addCase(fetchSensorData.pending, (state) => {
        state.isLoading = state.isLoading + 1;
        state.data = [];
      })
      .addCase(fetchSensorData.fulfilled, (state, action) => {
        const results = action.payload;
        let newData = state.data;
        
        for (const result of results) {
          const { gateway_id, json } = result;
          const newNodeData = [];
          for (let i in json) {
            newNodeData.push({
              nodeID: json[i].nodeID,
              sensorData: unpackSensorData(json[i].sensorData),
            });
          }
          newData = insertSensorData(newData, gateway_id, newNodeData);
        }
        
        state.isLoading = Math.max(0, state.isLoading - 1);
        state.data = newData;
      })
      .addCase(fetchSensorData.rejected, (state) => {
        state.isLoading = Math.max(0, state.isLoading - 1);
      });
  },
});

export const {
  toggleNode,
  setDefaultNode,
  clearActiveFlags,
  clearServerData,
  resetServerRequests,
  queryServerConfigured,
} = histogramDataSetSlice.actions;

export default histogramDataSetSlice.reducer;
