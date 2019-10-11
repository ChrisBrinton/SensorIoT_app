import { connect } from 'react-redux'
import ControlsButtonList from '../components/ControlsButtonList'
import { toggleNode, fetchSensorData } from '../actions';

const mapStateToProps = (state, ownProps) => {
  console.log('ControlsButtonList mapStateToProps ownProps:', ownProps);
  return ({
    list: state.histogramDataSet.nodeList,
    nicknames: state.settings.nodeNicknamesList,
    defaultNode : ownProps.defaultNode
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('ControlsButtonList mapDispatchToProps ownProps:', ownProps);
 
  return {
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (ControlsButtonList)
