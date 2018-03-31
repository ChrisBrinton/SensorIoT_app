import { connect } from 'react-redux'
import { setYAxisScale, setYAxisRange } from '../actions'
import SensorIoTYAxis from '../components/SensorIoTYAxis'

const yMinMaxDefaults = [ { dataType: 'TempF', yMin: 1, yMax: 105},
                          { dataType: 'TempC', yMin: -10, yMax: 40},
                          { dataType: 'Hum', yMin: 0, yMax: 100},
                          { dataType: 'Pres', yMin: 10, yMax: 40},
                          { dataType: 'Batt', yMin: 0, yMax: 5},
                        ];

function getRangeFromType(type) {
  let range = { min: 0, max: 100 };
  for (i in yMinMaxDefaults) {
    if (type == yMinMaxDefaults[i].dataType) {
      let range = {min: yMinMaxDefaults[i].yMin,
                   max: yMinMaxDefaults[i].yMax}
      console.log('found yMin ', range.min , ' and yMax ', range.max );
    }
  }
  console.log('getRangeFromType', min, max);
  return range;
}

function getLabelFromType(type) {
  let yLabel = null;
  console.log('getLabelFromType',type);
  switch (type) {
    case 'TempF':
      yLabel = value => `${value}ºF` ;
      break;
    case 'TempC':
      yLabel = value => `${value}ºC` ;
      break;
    case 'Hum':
      yLabel = value => `${value}%` ;
      break;
    case 'Pres':
      yLabel = value => `${value}inHg` ;
      break;
    case 'Batt':
    yLabel = value => `${value}V` ;
    break;
    default:
      yLabel = value => `${value}` ;
  }
  return yLabel;
}

const mapStateToProps = state => {
  console.log('mapStateToProps');
  return ({
    min: getRangeFromType(state.yType).min,
    max: getRangeFromType(state.yType).max,
    yLabel: getLabelFromType(state.yType)
  })
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (SensorIoTYAxis)
