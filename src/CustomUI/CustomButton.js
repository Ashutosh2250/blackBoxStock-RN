import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './CustomButtonStyle'

const CustomButton = (props) => {
    const { onPress } = props;
    return (<TouchableOpacity onPress={() => onPress ? onPress() : alert("Work in Progress")} style={[styles.btnContainer, props.style]}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
            colors={props.gradientArray && props.gradientArray.length > 0 ? [...props.gradientArray] : ['#00D553', '#005822']}
            style={[styles.btnContainer, props.style]}>
            <Text style={[styles.btnText, props.textStyle]}>
                {props.label}
            </Text>
        </LinearGradient>
    </TouchableOpacity>
    )
}

export default CustomButton;