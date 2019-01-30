import { connect } from 'react-redux'
import NicknameList from '../components/NicknameList'

const mapStateToProps = (state, ownProps) => {
  //console.log('NicknameList mapStateToProps ownProps:', ownProps);
  return ({
    list: state.histogramDataSet.nodeList,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('NicknameList mapDispatchToProps ownProps:', ownProps);
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (NicknameList)
