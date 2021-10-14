import React, { useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import colors from '../res/colors';
import images from '../res/images/images';
import { heightScale, myFonts, widthScale } from '../utils/Utils';

const CustomTabs = (props) => {
    let { state, descriptors, navigation, selectedIndex, leftArrowIndex, rightArrowIndex, currentTabname } = props;
    const scrollViewRef = useRef(null);
    useEffect(() => {
        if (selectedIndex > 3) {
            scrollViewRef.current.scrollToEnd({ duration: 500, animated: true });
        }
    }, [])
    return (
        <View style={{ paddingLeft: widthScale(10), paddingRight: widthScale(10), paddingVertical: heightScale(10), backgroundColor: colors.APP_THEME }}>
            <ScrollView ref={list => scrollViewRef.current = list}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}
                horizontal>
                <View style={{ flexDirection: 'row' }}>
                    {state.routes.map((route, index) => {

                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                                { currentTabname ? currentTabname(route.name) : true }
                            }
                        };

                        if (leftArrowIndex == index) {
                            return (
                                <View style={styles.mainRow} >
                                    <TouchableOpacity style={isFocused ? [props.selectedBorderBox ? props.selectedBorderBox : styles.selectedBorderBox]
                                        : props.borderBox ? props.borderBox : styles.borderBox} onPress={() => { onPress() }}>
                                        <Text style={[styles.textStyle, isFocused && styles.selectedTextStyle]}>{route.name}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.smallBorderBox, props.smallBorderBox]}
                                        onPress={() => {
                                            scrollViewRef.current.scrollToEnd({ duration: 500, animated: true });
                                            navigation.jumpTo(state.routes[index + 1].name);
                                            { currentTabname ? currentTabname(state.routes[index + 1].name) : true }
                                        }}
                                    >
                                        <Image source={images.forword_arrow} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>

                            )
                        }
                        else if (rightArrowIndex == index) {
                            return (
                                <View style={styles.mainRow} >
                                    <TouchableOpacity style={[styles.smallBorderBox2, props.smallBorderBox2]}
                                        onPress={() => {
                                            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
                                            navigation.jumpTo(state.routes[index - 1].name);
                                            { currentTabname ? currentTabname(state.routes[index + 1].name) : true }
                                        }}
                                    >
                                        <Image source={images.backword_arrow} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[isFocused ? props.selectedBorderBox ? props.selectedBorderBox && route.name == "Puts" ?
                                        props.rightCellSelected : props.selectedBorderBox : styles.selectedBorderBox : props.borderBox ? props.borderBox : styles.borderBox]}
                                        onPress={() => { onPress() }}
                                    >
                                        <Text style={[styles.textStyle, isFocused && styles.selectedTextStyle]}>{route.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        else {
                            return (
                                <TouchableOpacity onPress={() => { onPress() }}
                                    style={[isFocused ? props.selectedBorderBox ? props.selectedBorderBox && route.name == "Puts"
                                        || props.selectedBorderBox && route.name == "Bull" ||
                                        props.selectedBorderBox && route.name == "Bear" ?
                                        props.rightCellSelected : props.selectedBorderBox : styles.selectedBorderBox
                                        : props.borderBox ?
                                            props.rightCellStyle && route.name == "Puts"
                                                || props.rightCellStyle && route.name == "Bull" ||
                                                props.rightCellStyle && route.name == "Bear" ? props.rightCellStyle :
                                                props.borderBox : styles.borderBox, index == 0 ?
                                        styles.borderLeftStyle : index == 5 || index == 8 ? styles.borderRightStyle : {}]}
                                >
                                    <Text style={[styles.textStyle, isFocused && styles.selectedTextStyle]}>{route.name}</Text>
                                </TouchableOpacity>
                            )
                        }

                    })}
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({

    borderBox: {
        width: widthScale(114),
        height: heightScale(46),
        justifyContent: 'center',
        borderColor: colors.LIGTH_GREEN,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: colors.HOME_MAIN_BOX,
        alignItems: 'center',

    },
    selectedBorderBox: {
        width: widthScale(114),
        height: heightScale(46),
        justifyContent: 'center',
        borderColor: colors.LIGTH_GREEN,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: colors.LIGTH_GREEN,
        alignItems: 'center',
    },
    smallBorderBox: {
        width: widthScale(50),
        height: heightScale(46),
        justifyContent: 'center',
        borderColor: colors.LIGTH_GREEN,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        backgroundColor: colors.HOME_MAIN_BOX,
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    smallBorderBox2: {
        width: widthScale(50),
        height: heightScale(46),
        justifyContent: 'center',
        borderColor: colors.LIGTH_GREEN,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: colors.HOME_MAIN_BOX,
        alignItems: 'center',
        marginLeft: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    textStyle: {
        color: colors.WHITE,
        textAlign: 'center',
        fontSize: widthScale(14),
        fontFamily: myFonts.montserratRegular
    },
    borderRightStyle: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderRightWidth: 2
    },
    borderLeftStyle: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    mainRow: {
        flexDirection: 'row', alignItems: 'center'
    },
    selectedTextStyle: {
        color: "#000000",
        fontFamily: myFonts.montserratBold,
        fontWeight: '600',
    }
});

export default CustomTabs;