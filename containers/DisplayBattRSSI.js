import { connect } from 'react-redux'
import BattRSSI from '../components/BattRSSI'

const mapStateToProps = (state, ownProps) => {
  //console.log('DiplayBattRSSI mapStateToProps ownProps:', ownProps);
  return ({
    type: ownProps.type,
    batVal: ownProps.batVal,
    sigVal: ownProps.sigVal,
    size: ownProps.size,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('DiplayBattRSSI mapDispatchToProps ownProps:', ownProps);
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (BattRSSI)
