import { connect } from 'react-redux'
import { setYAxisType } from '../actions'
import ControlsButton from '../components/ControlsButton'

import RefreshButton from '../components/RefreshButton';
import { fetchSensorData } from '../actions';

const mapStateToProps = (state, ownProps) => {
  let active;
  if ((state.yAxis.yAxisType == 'TempC' || state.yAxis.yAxisType == 'TempF') && ownProps.yAxisType == 'TempF') {
    active = true;
  } else {
    active = (state.yAxis.yAxisType == ownProps.yAxisType) ? true : false;
  }
  //console.log('SelectSensorType mapStateToProps state yAxisType', state.yAxis.yAxisType, 'ownProps:', ownProps, 'active:', active);
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
  //console.log('SelectSensorType mapDispatchToProps');
  return {
  onPress: () => {
     
      dispatch(setYAxisType(ownProps.yAxisType));
      return dispatch(fetchSensorData());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (ControlsButton)
