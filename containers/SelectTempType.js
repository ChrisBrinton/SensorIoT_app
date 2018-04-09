import { connect } from 'react-redux'
import { toggleTempType } from '../actions'
import TypeSwitch from '../components/TypeSwitch'

const mapStateToProps = (state, ownProps) => {
  //console.log('SelectTempType mapStateToProps state', state);
  return ({
    tempType: state.yAxis.tempType,
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
  onValueChange: () => {
      return(dispatch(toggleTempType()))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (TypeSwitch)
