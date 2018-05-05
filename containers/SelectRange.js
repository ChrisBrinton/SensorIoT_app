import { connect } from 'react-redux'
import { setXDateRange } from '../actions'
import ControlsButton from '../components/ControlsButton'

const mapStateToProps = (state, ownProps) => {
  let active = (state.xAxis.xDateRange == ownProps.xDateRange) ? true : false;
  console.log('SelectRange mapStateToProps ownProps:', ownProps);
  return ({
    xDateRange: ownProps.xDateRange,
    active: active,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('SelectRange mapDispatchToProps');
  return {
  onPress: () => {
      return(dispatch(setXDateRange(ownProps.xDateRange)))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (ControlsButton)
