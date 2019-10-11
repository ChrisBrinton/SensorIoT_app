import { connect } from 'react-redux'
import { toggleNode } from '../actions'
import ControlsButton from '../components/ControlsButton'


import RefreshButton from '../components/RefreshButton';
import { fetchSensorData } from '../actions';

function getNodeObj(histogramDataSet, gateway_id, nodeID) {
  let obj={};
  //console.log('getNodeObj - histogramDataSet ', histogramDataSet, ' gateway_id ', gateway_id, ' nodeID ', nodeID);
  for(i in histogramDataSet.nodeList){
    if(histogramDataSet.nodeList[i].gateway_id == gateway_id){
      for(j in histogramDataSet.nodeList[i].nodes){
        if(histogramDataSet.nodeList[i].nodes[j].nodeID == nodeID){
          obj = histogramDataSet.nodeList[i].nodes[j];
        }
      }  
    }
  }
  return obj;
}

const mapStateToProps = (state, ownProps) => {
  let isActive = getNodeObj(state.histogramDataSet, ownProps.gateway_id, ownProps.nodeID).isActive;
  let nodeColor = getNodeObj(state.histogramDataSet, ownProps.gateway_id, ownProps.nodeID).color;
  //console.log('SelectNodes mapStateToProps ownProps:', ownProps, ' isActive ', isActive, ' nodeColor ', nodeColor);
  return ({
    nodeID: ownProps.nodeID,
    gateway_id: ownProps.gateway_id,
    active: isActive,
    nodeColor: nodeColor,
    viewColor: ownProps.viewColor,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('SelectNodes mapDispatchToProps ownProps:', ownProps);
  return {
  onPress: () => {
      console.log('SelectNodes onPress ownProps:', ownProps);
      dispatch(toggleNode(ownProps.gateway_id, ownProps.nodeID));
      return(dispatch(fetchSensorData()));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (ControlsButton)
