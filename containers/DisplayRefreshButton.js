import { connect } from 'react-redux';
import RefreshButton from '../components/RefreshButton';
import { fetchSensorData } from '../actions';

const mapStateToProps = (state, ownProps) => {
    console.log('DisplayRefreshButton mapStateToProps state', state);
    return ({
      isLoading: state.histogramDataSet.isLoading,
    })
  }
  
const mapDispatchToProps = (dispatch, getState) => {
  return {
    onPress: () => {
        console.log('DisplayRefreshButton onPress ')
        return(dispatch(fetchSensorData()))
      }
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (RefreshButton)
