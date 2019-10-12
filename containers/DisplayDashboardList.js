import { connect } from 'react-redux'
import DashboardList from '../components/DashboardList'

const mapStateToProps = (state, ownProps) => {
  console.log('DisplayDashboardList mapStateToProps');
  return ({
    list: state.dashboardDataSet.nodeData,
    nicknames: state.settings.nodeNicknamesList,
    navigation : ownProps.navigation
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('DisplayDashboardList mapDispatchToProps');
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (DashboardList)

