import { connect } from 'react-redux'
import RefreshActivityIndictor from '../components/RefreshActivityIndicator'

const mapStateToProps = (state) => {
  //console.log('DashboardActivityIndicator mapStateToProps isLoading', state.dashboardDataSet.isLoading);
  return ({
    isLoading: state.dashboardDataSet.isLoading,
  })
}

export default connect(
  mapStateToProps,
) (RefreshActivityIndictor)
