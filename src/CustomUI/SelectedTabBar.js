import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './SelectedTabStyle'
import { myFonts } from '../utils/Utils';

const SelectedTabBar = props => {
    const { onClickTabTab, isTabBarSelected, firstTabText, secondTabText, thirdTabText } = props;
    return (
        <View style={styles.barConStyle}>
            <TouchableOpacity onPress={() => onClickTabTab ? onClickTabTab(0) : false}
                style={[styles.leftBarStyle, isTabBarSelected == 0 && { borderBottomWidth: 3, borderBottomColor: "#00D553" }]}>
                <Text ellipsizeMode={"tail"} numberOfLines={1} style={[styles.barTextStyle,
                isTabBarSelected == 0 && { color: "#00D553", fontFamily: myFonts.montserratMedium }]}>{firstTabText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickTabTab ? onClickTabTab(1) : false}
                style={[styles.medBarStyle, isTabBarSelected == 1 && { borderBottomWidth: 3, borderBottomColor: "#00D553" }]}>
                <Text ellipsizeMode={"tail"} numberOfLines={1} style={[styles.barTextStyle,
                isTabBarSelected == 1 && { color: "#00D553", fontFamily: myFonts.montserratMedium }]}>{secondTabText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickTabTab ? onClickTabTab(2) : false}
                style={[styles.rightBarStyle, isTabBarSelected == 2 && { borderBottomWidth: 3, borderBottomColor: "#00D553" }]}>
                <Text ellipsizeMode={"tail"} numberOfLines={1} style={[styles.barTextStyle,
                isTabBarSelected == 2 && { color: "#00D553", fontFamily: myFonts.montserratMedium }]}>{thirdTabText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectedTabBar;