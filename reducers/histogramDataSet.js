const initialState = {
  nodeList: [ {'nodeID': 1, 'isActive': false},
              {'nodeID': 2, 'isActive': false},
              {'nodeID': 3, 'isActive': false},
            ],
}

function _toggleNode(state, nodeIndex) {
  //console.log('toggleNode state:', state, 'nodeIndex', nodeIndex);
  //console.log('toggleNode returning', newState);
  let newList = [];
  for (i in state.nodeList) {
    if (i == nodeIndex){
      newList.push({nodeID: state.nodeList[i].nodeID,
                     isActive: !state.nodeList[i].isActive});
      } else {
        newList.push(state.nodeList[i]);
      }
    }
  let newState = {nodeList: newList};
  return newState;
}

const histogramDataSet = (state = initialState, action) => {
  console.log('histogramDataSet reducer - action', action, 'state:', state);
  switch (action.type) {
    case 'TOGGLE_NODE':
      return (_toggleNode(state,action.nodeIndex));
    default:
      return state;
  }
}

export default histogramDataSet;
