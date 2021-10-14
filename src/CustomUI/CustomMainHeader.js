import React, { useState } from 'react';
import { openModal, saveSelectedSymbol } from '../redux/actions/MarketCategoryActions';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import images from '../res/images/images';
import styles from './CustomMainHeaderStyle';
import { useDispatch, useSelector } from 'react-redux';

const CustomMainHeader = (props) => {
    const dispatch = useDispatch();
    const [checkIndex, setcheckIndex] = useState(false)
    const openCloseModal = useSelector(state => state.marketCategory.open_modal);
    const selectedSymbol = useSelector(state => state.marketCategory.selectedSymbol);

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.container, { ...props.style }]}>
                <TouchableOpacity hitSlop={styles.hipSlopStyle} onPress={() => { props.navigation.toggleDrawer() }}>
                    <Image source={images.hamburger} resizeMode={'contain'} />
                </TouchableOpacity>
                <View style={styles.headerSection}>
                    <Text style={styles.headerText}>{props.label}</Text>

                    {props.showSearch
                        ?
                        <View style={props.label == "HomeScreen"}>
                            <TouchableOpacity onPress={() => { dispatch(openModal(!openCloseModal)) }}>
                                <Image source={images.search} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }
                </View>
                <View />
            </View>
            <View />
        </View>
    )
}

export default CustomMainHeader;