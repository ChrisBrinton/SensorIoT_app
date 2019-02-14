import { connect } from 'react-redux'
import NicknameList from '../components/NicknameList'

const mapStateToProps = (state, ownProps) => {
  console.log('DisplayNicknameList mapStateToProps');
  return ({
    list: state.histogramDataSet.nodeList,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('DisplayNicknameList mapDispatchToProps');
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (NicknameList)
