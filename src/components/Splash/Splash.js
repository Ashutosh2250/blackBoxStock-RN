import React from 'react';
import { View, Image } from 'react-native';
import Loader from '../../CustomUI/Loader';
import images from '../../res/images/images';
import styles from './styles'

const Splash = (props) => {
    return (
        <View style={styles.container}>
            <Image source={images.logo} resizeMode={'contain'} />
            <View style={styles.imageStyle}>
                <Loader isSplash={true} />
            </View>
        </View>
    )
}

export default Splash;