import { connect } from 'react-redux'
import { setYAxisType, setYAxisRange , toggleNode , fetchSensorData, setDefaultNode, clearActiveFlags} from '../actions'
import Histogram from '../components/Histogram'

function getRangeFromType(reduxState) {
  let range = { yAxisMin: -1, yAxisMax: -1 };
  for (let i in reduxState.yAxis.yAxisMinMaxDefaults) {
    if (reduxState.yAxis.yAxisType == reduxState.yAxis.yAxisMinMaxDefaults[i].dataType) {
      range = {yAxisMin: reduxState.yAxis.yAxisMinMaxDefaults[i].yMin,
               yAxisMax: reduxState.yAxis.yAxisMinMaxDefaults[i].yMax};
      break;
    }
  }
  //console.log('getRangeFromType returning', range.yAxisMin, range.yAxisMax);
  return range;
}

function getLabelFromType(type) {
  let yLabel = null;
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
  //console.log('getLabelFromType type:', type);
  return yLabel;
}

const mapStateToProps = (state, ownProps) => {
  //console.log('Histogram mapStateToProps data ', state.histogramDataSet.data);
  let newRange = getRangeFromType(state);
  let data = state.histogramDataSet.data;

  //If the user has chosen to display temp data in C, do the conversion
  //here.
  if ( state.yAxis.yAxisType == 'TempC') {
    data = [];
    for (let i in state.histogramDataSet.data) {
      for (let j in state.histogramDataSet.data[i].nodes) {
        data.push({nodeID: state.histogramDataSet.data[i].nodes[j].nodeID, sensorData: state.histogramDataSet.data[i].nodes[j].sensorData
          .map((item, index) => {
            //console.log("histogram data map function item ", item);
            return({value: (item.value-32)/1.8, date: item.date})
            }
          )
          });  
      }
    }
    //console.log('Histogram after temp transform to C', data);
  }
  
  
  return (
    {
      ...ownProps,
      yAxisMin: newRange.yAxisMin,
      yAxisMax: newRange.yAxisMax,
      yAxisLabel: getLabelFromType(state.yAxis.yAxisType),
      yAxisType: state.yAxis.yAxisType,
      lowThreshold: state.yAxis.lowThreshold,
      highThreshold: state.yAxis.highThreshold,
      data: data,
      nodeList: state.histogramDataSet.nodeList,
      initialized : state.initialized
    }
  )
}



const mapDispatchToProps = (dispatch,ownProps) => {
  console.log('Histogram mapDispatchToProps');
 
  return {

    loadDefaultNodeData: () => {

      console.log(`Histogram mapDispatchToProps - in loadDefaultNodeData: is initialized ${ownProps.initialized}`);
      if (!ownProps.initialized) {
        dispatch(setDefaultNode(dispatch, ownProps.gateway_id, ownProps.sensor, ownProps.nodeID));
        return (dispatch(fetchSensorData()));
      }

    },
    clearSelectedNodes: () => {
      return (dispatch(clearActiveFlags()));
    }
}}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (Histogram)
