import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, } from 'react-native';
import colors from '../res/colors';
import images from '../res/images/images';
import { widthScale } from '../utils/Utils';
import styles from './ListTabBarStyle';

const ListSelectedTabbar = props => {
    const flatListRef = useRef();
    useEffect(() => {
        if (props.selectedIndex > 3) {
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ index: 4 })
                //props.setSelectedIndex(props.tabList[index - 1].id)
            }
        } else {
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ index: 0 });
                //props.setSelectedIndex(props.tabList[index + 1].id)
            }
        }
    }, [])

    return (
        <FlatList
            data={props.tabList}
            horizontal={true}
            extraData={props.tabList}
            ref={flatListRef}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => (
                { length: widthScale(114), offset: widthScale(114) * index, index }
            )}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item, index }) => {
                if (index == 2) {
                    return (
                        <View style={styles.mainRow} key={item.id}>
                            <TouchableOpacity style={item.selected ? [styles.borderBox, { backgroundColor: colors.APP_GREEN }] : styles.borderBox}
                                onPress={() => { props.setSelectedIndex(item.id) }}>
                                <Text style={styles.textStyle}>{item.tabname}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.smallBorderBox} onPress={() => {
                                if (flatListRef.current) {
                                    flatListRef.current.scrollToIndex({ index: 5 });
                                }
                            }}>
                                <Image source={images.forword_arrow} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>

                    )
                }
                else if (index == 3) {
                    return (
                        <View style={styles.mainRow} key={item.id}>
                            <TouchableOpacity style={styles.smallBorderBox2} onPress={() => {
                                if (flatListRef.current) {
                                    flatListRef.current.scrollToIndex({ index: 0 })
                                }
                            }}>
                                <Image source={images.backword_arrow} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={item.selected ? [styles.borderBox, { backgroundColor: colors.APP_GREEN }] : styles.borderBox}
                                onPress={() => { props.setSelectedIndex(item.id) }}>
                                <Text style={styles.textStyle}>{item.tabname}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                else {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => { props.setSelectedIndex(item.id) }}
                            style={[item.selected ? [styles.borderBox, { backgroundColor: colors.APP_GREEN }] : styles.borderBox, index == 0 ?
                                styles.borderLeftStyle : index == 5 ? styles.borderRightStyle : {}]}>
                            <Text style={styles.textStyle}>{item.tabname}</Text>
                        </TouchableOpacity>
                    )
                }

            }}

        />
    )
}


export default ListSelectedTabbar;