import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Spinner from 'react-native-spinkit';
import colors from '../res/colors';

const Loader = (props) => {
    const { isSplash, isLoading } = props;
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }, isLoading && {
            flex: 1,
            height: '100%',
            width: '100%',
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 1,
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        }}>
            {!isSplash ? isLoading ? <ActivityIndicator size='large' color={colors.APP_GREEN} animating={true} /> : null
                : <Spinner isVisible={props.isLoading} size={55} type={"ThreeBounce"} color={colors.APP_GREEN} />}
        </View>

    )
}

export default Loader;