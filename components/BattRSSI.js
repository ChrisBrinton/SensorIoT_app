import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight} from 'react-native';
import Svg, { G, Rect, } from 'react-native-svg';

const BattRSSI = ( { type, batVal, sigVal, size , onPress} ) => {
    bat = [];
    sig = [];
    let key=0;
    
    //battery outline
    bat.push(
      <Rect
        key={key++}
        x="10"
        y="5"
        width="61"
        height="37"
        fill="#3D5875">
      </Rect>
    );
    bat.push(
      <Rect
        key={key++}
        x="71"
        y="11"
        width="5"
        height="25"
        fill="#3D5875">
      </Rect>
    );
    //now one battery bar for each level of battery
    if(batVal > 1.1) {
      bat.push(
        <Rect
          key={key++}
          x="14"
          y="9"
          width="15"
          height="29"
          fill="#00e0FF">
        </Rect>
      );
    }
    if(batVal > 1.25) {
      bat.push(
        <Rect
          key={key++}
          x="33"
          y="9"
          width="15"
          height="29"
          fill="#00e0FF">
        </Rect>
      );
    }
    if(batVal > 1.35) {
      bat.push(
      <Rect
        key={key++}
        x="52"
        y="9"
        width="15"
        height="29"
        fill="#00e0FF">
      </Rect>
      );                    
    }

    let startX = 18;
    let startY = 100;
    let xOffset = 2;
    let yOffset = 2;
    let backgroundColor = "#3D5875";
    let outsideRecW = 12;
    let startingBarH = 16;
    let stepH = 10;
    let foregroundColor = "#00e0FF";
    //now push one signal bar for each level of RSSI, background bar is always there
    let barSize=1;
    sig.push(
      <Rect
      key={key++}
      x={startX}
      y={startY-startingBarH}
      width={outsideRecW}
      height={startingBarH}
      fill={backgroundColor}>
    </Rect>
    );
    if(sigVal > -100) {
      sig.push(
        <Rect
          key={key++}
          x={startX+xOffset}
          y={startY+yOffset-startingBarH}
          width={outsideRecW-(2*xOffset)}
          height={startingBarH-(2*yOffset)}
          fill={foregroundColor}>
        </Rect>
      );
    }
    barSize=2;
    let barH=startingBarH+((barSize-1)*stepH);
    sig.push(
        <Rect
          key={key++}
          x={startX+outsideRecW*(barSize-1)}
          y={startY-barH}
          width={outsideRecW}
          height={barH}
          fill={backgroundColor}/>
    );
    if(sigVal > -90) {
      sig.push(
        <Rect
          key={key++}
          x={startX+(outsideRecW*(barSize-1))+xOffset}
          y={startY+yOffset-barH}
          width={outsideRecW-(2*xOffset)}
          height={barH-(2*yOffset)}
          fill={foregroundColor}/>
      );  
    }
    barSize=3; 
    barH=startingBarH+((barSize-1)*stepH);
    sig.push(
      <Rect
      key={key++}
      x={startX+outsideRecW*(barSize-1)}
      y={startY-barH}
      width={outsideRecW}
      height={barH}
      fill={backgroundColor}/>
    );
    if(sigVal > -80) {
      sig.push(
        <Rect
          key={key++}
          x={startX+(outsideRecW*(barSize-1))+xOffset}
          y={startY+yOffset-barH}
          width={outsideRecW-(2*xOffset)}
          height={barH-(2*yOffset)}
          fill={foregroundColor}/>
      );  
    }
    barSize=4;
    barH=startingBarH+((barSize-1)*stepH);
    sig.push(
      <Rect
      key={key++}
      x={startX+outsideRecW*(barSize-1)}
      y={startY-barH}
      width={outsideRecW}
      height={barH}
      fill={backgroundColor}/>
    );
    if(sigVal > -70) {
      sig.push(
        <Rect
          key={key++}
          x={startX+(outsideRecW*(barSize-1))+xOffset}
          y={startY+yOffset-barH}
          width={outsideRecW-(2*xOffset)}
          height={barH-(2*yOffset)}
          fill={foregroundColor}/>
      );  
    }
    return (
        <TouchableHighlight
            onPress={ onPress }
            underlayColor='#BFE6EB'>
          <View style={{ flex: 1, flexDirection:'column', alignItems: 'center', height: 115, }}>
            <Svg height="97" width={size} viewBox="0 0 100 100">
              {bat}
              {sig}
            </Svg>
          </View>
        </TouchableHighlight>
    )
}

export default BattRSSI;

