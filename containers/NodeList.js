import { connect } from 'react-redux'
import ControlsButtonList from '../components/ControlsButtonList'

const mapStateToProps = (state, ownProps) => {
  console.log('NodeList mapStateToProps ownProps:', ownProps);
  return ({
    list: state.histogramDataSet.nodeList,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('NodeList mapDispatchToProps ownProps:', ownProps);
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (ControlsButtonList)
