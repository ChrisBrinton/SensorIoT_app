import { connect } from 'react-redux'
import DashboardScrollView from '../components/DashboardScrollView'
import { fetchNodeLatestData } from '../actions'

const isScrollAtAnEnd = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom=5;
  console.log('checking position', layoutMeasurement.height, contentOffset.y, contentSize.height, paddingToBottom);
  if (contentOffset.y <= 0) {
      return true;
  } else if ( layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom ) {
      return true;
  } else {
      return false;
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log('DisplayDashboardScrollView mapStateToProps ownProps:', ownProps);
  return ({
    isLoading: state.histogramDataSet.isLoading,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('DisplayDashboardScrollView mapDispatchToProps ownProps:', ownProps);
  return {
    onScrollEndDrag: ({nativeEvent}) => {
      if ( isScrollAtAnEnd(nativeEvent) ) {
        return(dispatch(fetchNodeLatestData()));
      } else {
        return;
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (DashboardScrollView)

