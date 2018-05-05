import { connect } from 'react-redux'
import DashboardRefresh from '../components/DashboardRefresh'
import { fetchNodeLatestData } from '../actions'

const mapStateToProps = (state) => {
  console.log('DashboardRefresh mapStateToProps ');
  return ({
    isLoading: state.dashboardDataSet.isLoading,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('DashboardRefresh mapDispatchToProps');
  return {
  onPress: () => {
      return(dispatch(fetchNodeLatestData()))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (DashboardRefresh)
