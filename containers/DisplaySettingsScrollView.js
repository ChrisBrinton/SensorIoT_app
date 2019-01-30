import { connect } from 'react-redux'
import SettingsScrollView from '../components/SettingsScrollView'

const mapStateToProps = (state, ownProps) => {
  //console.log('DisplaySettingsScrollView mapStateToProps ownProps:', ownProps);
  return ({
    isLoading: state.histogramDataSet.isLoading,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('DisplaySettingsScrollView mapDispatchToProps ownProps:', ownProps);
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (SettingsScrollView)

