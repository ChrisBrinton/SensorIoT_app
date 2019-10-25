import React from 'react';
import { Button, View } from 'react-native';

const HeaderButton = ({configured, onPress, title, color}) => {
    console.log('HeaderButton configured: ', configured);
    if(configured) {
        return(
            <Button
                onPress={onPress}
                title={title}
                color={color}
            />
        );            
    } else {
        return(<View/>);
    }
}

export default HeaderButton;