import { connect } from 'react-redux'
import GWNicknameRow from '../components/GWNicknameRow'

const mapStateToProps = (state, ownProps) => {
  //console.log('DisplayNickNameRow mapStateToProps state.settings ', state.settings, 'ownProps:', ownProps);
return ({
    gateway_id: ownProps.gateway_id,
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
) (GWNicknameRow)
