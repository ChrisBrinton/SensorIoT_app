import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

const initialState = {
  isLoading: 0,
  myMQTTServer: 'myMQTTServer:5000',
  MQTTConfigured: false,
  gatewayConfigured: false,
  configVersion: '1.0',
  myGatewayIDList: ['myGatewayID'],
  settingsUpdated: false,
  configMessageAlert: false,
  nodeNicknamesList: [],
};

function replaceNodeNickname(newNicknames, newNodeNickName) {
  for (let k in newNicknames) {
    if (newNicknames[k].nodeID === newNodeNickName.node_id) {
      newNicknames[k].shortname = newNodeNickName.shortname;
      newNicknames[k].longname = newNodeNickName.longname;
      newNicknames[k].seq_no = newNodeNickName.seq_no;
      return;
    }
  }
  const obj = {
    nodeID: newNodeNickName.node_id,
    shortname: newNodeNickName.shortname,
    longname: newNodeNickName.longname,
    seq_no: newNodeNickName.seq_no,
    dirty: false,
  };
  newNicknames.push(obj);
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

// Async thunk for fetching nicknames
export const fetchNicknames = createAsyncThunk(
  'settings/fetchNicknames',
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

    const url = 'https://' + state.settings.myMQTTServer + '/SensorIoT/get_nicknames?' + gwList;
    console.log('get_nicknames using url:', url);

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

// Async thunk for saving nicknames
export const saveNicknames = createAsyncThunk(
  'settings/saveNicknames',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    if (!checkServerConfigured(state)) {
      return rejectWithValue('Server not configured');
    }

    // Check if any nicknames are dirty
    let clean = true;
    for (let i in state.settings.nodeNicknamesList) {
      if (state.settings.nodeNicknamesList[i].dirty === true) {
        clean = false;
      }
      for (let j in state.settings.nodeNicknamesList[i].nicknames) {
        if (state.settings.nodeNicknamesList[i].nicknames[j].dirty === true) {
          clean = false;
        }
      }
    }
    if (clean) {
      console.log('no nicknames have changed, not saving');
      return null;
    }

    const url = 'https://' + state.settings.myMQTTServer + '/SensorIoT/save_nicknames';
    const body = JSON.stringify(state.settings.nodeNicknamesList);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return true;
    } catch (error) {
      Alert.alert('Error communicating with Server');
      return rejectWithValue(error.message);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMQTTServer: (state, action) => {
      state.myMQTTServer = action.payload;
      state.MQTTConfigured = true;
      state.settingsUpdated = true;
    },
    setGatewayID: (state, action) => {
      const GWList = action.payload.split(',').map(s => s.trim());
      state.myGatewayIDList = GWList;
      state.gatewayConfigured = true;
      state.settingsUpdated = true;
    },
    queryServerConfigured: (state) => {
      state.configMessageAlert = true;
    },
    setShortNickname: (state, action) => {
      const { gateway_id, nodeID, value } = action.payload;
      let found = false;
      for (let i in state.nodeNicknamesList) {
        if (state.nodeNicknamesList[i].gateway_id === gateway_id) {
          for (let j in state.nodeNicknamesList[i].nicknames) {
            if (state.nodeNicknamesList[i].nicknames[j].nodeID === nodeID) {
              found = true;
              state.nodeNicknamesList[i].nicknames[j].shortname = value;
              state.nodeNicknamesList[i].nicknames[j].dirty = true;
            }
          }
          if (!found) {
            state.nodeNicknamesList[i].nicknames.push({
              nodeID: nodeID,
              shortname: value,
              longname: '',
              seq_no: 0,
              dirty: true,
            });
          }
        }
      }
    },
    setLongNickname: (state, action) => {
      const { gateway_id, nodeID, value } = action.payload;
      let found = false;
      for (let i in state.nodeNicknamesList) {
        if (state.nodeNicknamesList[i].gateway_id === gateway_id) {
          for (let j in state.nodeNicknamesList[i].nicknames) {
            if (state.nodeNicknamesList[i].nicknames[j].nodeID === nodeID) {
              found = true;
              state.nodeNicknamesList[i].nicknames[j].longname = value;
              state.nodeNicknamesList[i].nicknames[j].dirty = true;
            }
          }
          if (!found) {
            state.nodeNicknamesList[i].nicknames.push({
              nodeID: nodeID,
              shortname: '',
              longname: value,
              seq_no: 0,
              dirty: true,
            });
          }
        }
      }
    },
    setGWNickname: (state, action) => {
      const { gateway_id, value } = action.payload;
      let found = false;
      for (let i in state.nodeNicknamesList) {
        if (state.nodeNicknamesList[i].gateway_id === gateway_id) {
          found = true;
          state.nodeNicknamesList[i].longname = value;
          state.nodeNicknamesList[i].dirty = true;
        }
      }
      if (!found) {
        state.nodeNicknamesList.push({
          gateway_id: gateway_id,
          longname: value,
          seq_no: 0,
          dirty: true,
          nicknames: [],
        });
      }
    },
    resetDirtyNicknames: (state) => {
      for (let i in state.nodeNicknamesList) {
        state.nodeNicknamesList[i].dirty = false;
        for (let j in state.nodeNicknamesList[i].nicknames) {
          state.nodeNicknamesList[i].nicknames[j].dirty = false;
        }
      }
      state.isLoading = 1;
    },
    resetServerRequests: (state) => {
      state.isLoading = 0;
    },
    settingsSaved: (state) => {
      state.isLoading = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNicknames.pending, (state) => {
        state.isLoading = 1;
      })
      .addCase(fetchNicknames.fulfilled, (state, action) => {
        const json = action.payload;
        const newNicknamesList = JSON.parse(JSON.stringify(state.nodeNicknamesList));
        
        for (let i in json) {
          let foundGW = false;
          for (let j in newNicknamesList) {
            if (json[i].gateway_id === newNicknamesList[j].gateway_id) {
              foundGW = true;
              for (let k in json[i].nicknames) {
                newNicknamesList[j].longname = json[i].longname;
                newNicknamesList[j].seq_no = json[i].seq_no;
                newNicknamesList[j].dirty = false;
                replaceNodeNickname(newNicknamesList[j].nicknames, json[i].nicknames[k]);
              }
            }
          }
          if (!foundGW) {
            const obj = {
              gateway_id: json[i].gateway_id,
              longname: json[i].longname,
              seq_no: json[i].seq_no,
              dirty: false,
              nicknames: [],
            };
            for (let j in json[i].nicknames) {
              replaceNodeNickname(obj.nicknames, json[i].nicknames[j]);
            }
            newNicknamesList.push(obj);
          }
        }
        
        state.isLoading = 0;
        state.nodeNicknamesList = newNicknamesList;
      })
      .addCase(fetchNicknames.rejected, (state) => {
        state.isLoading = 0;
      })
      .addCase(saveNicknames.fulfilled, (state) => {
        state.isLoading = 0;
      })
      .addCase(saveNicknames.rejected, (state) => {
        state.isLoading = 0;
      });
  },
});

export const {
  setMQTTServer,
  setGatewayID,
  queryServerConfigured,
  setShortNickname,
  setLongNickname,
  setGWNickname,
  resetDirtyNicknames,
  resetServerRequests,
  settingsSaved,
} = settingsSlice.actions;

export default settingsSlice.reducer;
