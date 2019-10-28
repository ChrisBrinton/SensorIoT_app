import { connect } from 'react-redux'
import NicknameRow from '../components/NicknameRow'

const mapStateToProps = (state, ownProps) => {
  //console.log('DisplayNickNameRow mapStateToProps state.settings ', state.settings, 'ownProps:', ownProps);
return ({
    gateway_id: ownProps.gateway_id,
    nodeID: ownProps.nodeID,
    nodeColor: ownProps.viewcolor,
    label: ownProps.label, 
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('DisplayNickNameRow mapDispatchToProps ownProps:', ownProps);
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (NicknameRow)
