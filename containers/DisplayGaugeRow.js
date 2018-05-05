import { connect } from 'react-redux'
import GaugeRow from '../components/GaugeRow'

const mapStateToProps = (state, ownProps) => {
  //console.log('DiplayGaugeRow mapStateToProps ownProps:', ownProps);
  return ({
    node: state.dashboardDataSet.nodeData[ownProps.nodeIndex],
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
