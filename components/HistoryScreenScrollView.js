import React from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
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
    console.log('HistoryScreenScrollView mapStateToProps');
    return ({
        isLoading: state.histogramDataSet.isLoading,
    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('HistoryScreenScrollView mapDispatchToProps');
    return {
        onScrollEndDrag: ({ nativeEvent }) => {
            if (isScrollAtAnEnd(nativeEvent)) {
                return (dispatch(fetchSensorData()));
            } else {
                return;
            }
        },
        onRefresh: () => {
            //console.log('onRefresh');
            return(dispatch(fetchSensorData()));
        }
    }
}



const HistoryScreenScrollView = ({ children, onScrollEndDrag, onRefresh }) => {
    //console.log('ControlsButton created with children:', children);
    return (
        <ScrollView
            style={styles.HistoryScreenScrollView}
            refreshControl={ 
                <RefreshControl
                  refreshing={false}
                  onRefresh={onRefresh}
                  />
            }
//            onScrollEndDrag={onScrollEndDrag}
        >
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
