import { connect } from 'react-redux'
import Gauge from '../components/Gauge'

function getMinMaxFromType(state, type) {
  let defaults = state.yAxis.yAxisMinMaxDefaults;
  for (x in defaults) {
    if (type == defaults[x].dataType) {
      return {min: defaults[x].yMin, max: defaults[x].yMax};
    } else if (type == 'Temp') {
      if ( defaults[x].dataType == 'TempF' && state.yAxis.tempType == 'F' ) {
        return {min: defaults[x].yMin, max: defaults[x].yMax};
      } else if ( defaults[x].dataType == 'TempC' && state.yAxis.tempType == 'C') {
          return {min: defaults[x].yMin, max: defaults[x].yMax};
        }
      }
    }

  return {min: 0, max: 100}; //pass some kind of default back if nothing was found
}

const mapStateToProps = (state, ownProps) => {
  minMax = getMinMaxFromType(state, ownProps.type);
  //console.log('DiplayGauge mapStateToProps ownProps:', ownProps, 'minMax', minMax);
  return ({
    type: ownProps.type,
    value: ownProps.value,
    min: minMax.min,
    max: minMax.max,
    size: ownProps.size,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('DiplayGauge mapDispatchToProps ownProps:', ownProps);
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (Gauge)
