import { connect } from 'react-redux'
import DashboardList from '../components/DashboardList'

const mapStateToProps = (state, ownProps) => {
  console.log('DisplayDashboardList mapStateToProps ownProps:', ownProps);
  return ({
    list: state.dashboardDataSet.nodeData,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('DisplayDashboardList mapDispatchToProps ownProps:', ownProps);
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (DashboardList)

