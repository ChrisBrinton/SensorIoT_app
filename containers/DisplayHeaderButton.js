import { connect } from 'react-redux'
import HeaderButton from '../components/HeaderButton'

const mapStateToProps = (state, ownProps) => {
  let configured = false;
  if (state.settings.MQTTConfigured && state.settings.gatewayConfigured && state.settings.configVersion == "1.0") {
    configured = true;
  }
  console.log('DisplayHeaderButton mapStateToProps - configured: ', configured);
  return ({
    configured: configured,
    onPress: ownProps.onPress,
    title: ownProps.title,
    color: ownProps.color,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('DiplayBattRSSI mapDispatchToProps ownProps:', ownProps);
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (HeaderButton)