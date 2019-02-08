import { connect } from 'react-redux'
import RefreshActivityIndictor from '../components/RefreshActivityIndicator'

const mapStateToProps = (state) => {
  console.log('SettingsActivityIndicator mapStateToProps isLoading', state.settings.isLoading);
  return ({
    isLoading: state.settings.isLoading,
  })
}

export default connect(
  mapStateToProps,
) (RefreshActivityIndictor)
