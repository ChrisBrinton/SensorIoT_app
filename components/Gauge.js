import React from 'React';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedCircularProgress from './AnimatedCircularProgress';

const Gauge = ( { type, value, min, max, size } ) => {
    if ( value > max ) {
        max = value;
    }
    if ( value < min ) {
        min = value;
    }
    let adjustedValue = ((value-min)/(max - min))*100;
    //console.log('creating Gauge ', type, value, min, max);
    return (
        <View style={GaugePortraitStyles.dashboardGaugeContainer}>
            <AnimatedCircularProgress
                style={{ margin: 0, marginBottom: 0, width: size, height: 65, alignItems: 'center' }}
                size={size}
                width={12}
                fill={adjustedValue}
                value={value}
                rotation={-120}
                arcSweepAngle={240}
                tintColor="#00e0FF"
                onAnimationComplete={() => {
                        //console.log('onAnimationComplete')
                        return
                }}
                backgroundColor="#3D5875"
                renderChild={ (value) => {
                        return (
                        <Text style={GaugePortraitStyles.dashboardGaugeText}>
                            {Number.parseFloat(value).toFixed(1)}
                        </Text>
                        )
                    }
                }/>
<<<<<<< 4089862416898ec76f58a3db1f9859b084f1e9b9
            <View style={{ flexDirection:'row', width: 85, height: 12, margin: 0, justifyContent: 'space-between', alignItems: 'center' }}>
=======
            <View style={{ flexDirection:'row', width: size, height: 10, margin: 0, justifyContent: 'space-between', alignItems: 'center' }}>
>>>>>>> Make gauge width related to screen width
                <Text style={{fontSize:12, marginLeft: 5, textAlign: 'left'}}>
                    {min}
                </Text>
                <Text style={{fontSize:12, marginRight: 5, textAlign: 'right'}}>
                    {max}
                </Text>        
            </View>
            <Text style={{fontSize:18, textAlign:'center', marginTop: 0 }}>
                {type}
            </Text>
        </View>
    )
}

export default Gauge;

const GaugePortraitStyles = StyleSheet.create({
    dashboardGaugeContainer: {
        flex: 1, 
        flexDirection:'column', 
        alignItems: 'center', 
        height: 105, 
    },
    dashboardGaugeText: {
        textAlign: 'center',
        fontSize: 18,
        margin: 0,
        marginTop: 0,
        color: 'red',
//        backgroundColor: '#223344',
     },
});
