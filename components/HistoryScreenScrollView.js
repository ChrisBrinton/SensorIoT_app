import React from 'React';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { fetchSensorData } from '../actions';

isScrollAtAnEnd = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 5;
    console.log('checking position', layoutMeasurement.height, contentOffset.y, contentSize.height, paddingToBottom);
    if (contentOffset.y <= 0) {
        return true;
    } else if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
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
    //console.log('DisplayDashboardScrollView mapDispatchToProps ownProps:', ownProps);
    return {
        onScrollEndDrag: ({ nativeEvent }) => {
            if (isScrollAtAnEnd(nativeEvent)) {
                return (dispatch(fetchSensorData()));
            } else {
                return;
            }
        }
    }
}



const HistoryScreenScrollView = ({ children, onScrollEndDrag }) => {
    //console.log('ControlsButton created with children:', children);
    return (
        <ScrollView
            style={styles.HistoryScreenScrollView}
            onScrollEndDrag={onScrollEndDrag}>
            {children}
        </ScrollView>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HistoryScreenScrollView)

const styles = StyleSheet.create({
    HistoryScreenScrollView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'powderblue',
    },
});
