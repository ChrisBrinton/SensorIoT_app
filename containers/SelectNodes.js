import { connect } from 'react-redux'
import { toggleNode } from '../actions'
import ControlsButton from '../components/ControlsButton'

const mapStateToProps = (state, ownProps) => {
  //console.log('SelectNodes mapStateToProps ownProps:', ownProps);
  return ({
    nodeIndex: ownProps.nodeIndex,
    nodeID: state.histogramDataSet.nodeList[ownProps.nodeIndex].nodeID,
    active: state.histogramDataSet.nodeList[ownProps.nodeIndex].isActive,
    nodeColor: state.histogramDataSet.nodeList[ownProps.nodeIndex].color,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('SelectNodes mapDispatchToProps ownProps:', ownProps);
  return {
  onPress: () => {
      //console.log('SelectNodes onPress ownProps:', ownProps);
      return(dispatch(toggleNode(ownProps.nodeIndex)))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (ControlsButton)
