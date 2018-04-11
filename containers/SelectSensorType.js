import { connect } from 'react-redux'
import { setYAxisType } from '../actions'
import ControlsButton from '../components/ControlsButton'

const mapStateToProps = (state, ownProps) => {
  let active = (state.yAxis.yAxisType == ownProps.yAxisType) ? true : false;
  console.log('SelectSensorType mapStateToProps ownProps:', ownProps, 'active:', active);
  return ({
    yAxisType: ownProps.yAxisType,
    yAxisMin: ownProps.yAxisMin,
    yAxisMax: ownProps.yAxisMax,
    yAxisLabel: ownProps.yAxisLabel,
    active: active,
    dataQueryKey: ownProps.dataQueryKey,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('SelectSensorType mapDispatchToProps');
  return {
  onPress: () => {
      return(dispatch(setYAxisType(ownProps.yAxisType, ownProps.dataQueryKey)))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (ControlsButton)
