import { connect } from 'react-redux'
import GaugeRow from '../components/GaugeRow'

function getLongNickname(nicknameList, gateway_id, node_id) {
  //console.log('getLongNickname - nicknameList ', nicknameList, ' gateway_id ', gateway_id, ' node_id ', node_id);
  for(let i in nicknameList) {
    if(nicknameList[i].gateway_id == gateway_id) {
      for(let j=0; j<nicknameList[i].nicknames.length; j++) {
        if(nicknameList[i].nicknames[j].nodeID == node_id) {
          return nicknameList[i].nicknames[j].longname;
        }
      }
    }
  }
}

function getLatestNode(dashboardDataSet, gateway_id, node_id) {
  //console.log('getLatestNode - dashboardDataSet ', dashboardDataSet, ' gateway_id ', gateway_id, ' node_id ', node_id);
  for(let i in dashboardDataSet.nodeData) {
    if(dashboardDataSet.nodeData[i].gateway_id == gateway_id) {
      for(let j in dashboardDataSet.nodeData[i].latest) {
        if(dashboardDataSet.nodeData[i].latest[j].nodeID == node_id) {
          let obj = dashboardDataSet.nodeData[i].latest[j];
          return obj;
        }
      }
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log('DiplayGaugeRow mapStateToProps state ', state, ' ownProps:', ownProps);
  return ({
    node: getLatestNode(state.dashboardDataSet, ownProps.gateway_id, ownProps.node_id ),
    label: getLongNickname(state.settings.nodeNicknamesList, ownProps.gateway_id, ownProps.node_id ),
    navigation : ownProps.navigation
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('DiplayGaugeRow mapDispatchToProps ownProps:', ownProps);
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (GaugeRow)
