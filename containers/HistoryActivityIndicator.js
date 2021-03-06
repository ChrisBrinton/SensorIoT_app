import { connect } from 'react-redux'
import RefreshActivityIndictor from '../components/RefreshActivityIndicator'

const mapStateToProps = (state) => {
  console.log('HistoryActivityIndicator mapStateToProps isLoading', state.histogramDataSet.isLoading);
  return ({
    isLoading: state.histogramDataSet.isLoading,
  })
}

export default connect(
  mapStateToProps,
) (RefreshActivityIndictor)
