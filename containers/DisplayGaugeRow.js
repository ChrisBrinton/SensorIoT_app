import { connect } from 'react-redux'
import GaugeRow from '../components/GaugeRow'

const mapStateToProps = (state, ownProps) => {
  //console.log('DiplayGaugeRow mapStateToProps ownProps:', ownProps);
  let label = '';
  for(i=0;i<state.settings.nodeNicknames.length;i++){
    if(state.settings.nodeNicknames[i].nodeID == state.dashboardDataSet.nodeData[ownProps.nodeIndex].nodeID){
      label = state.settings.nodeNicknames[i].longname;
    }
  }
  return ({
    node: state.dashboardDataSet.nodeData[ownProps.nodeIndex],
    label: label,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('DiplayGaugeRow mapDispatchToProps ownProps:', ownProps);
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (GaugeRow)
