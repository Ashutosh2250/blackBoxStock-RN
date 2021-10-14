import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import colors from '../res/colors';
import images from '../res/images/images';
import { heightScale, keyGenerator, myFonts, myWidth, widthScale } from '../utils/Utils';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { saveSelectedSymbol, saveSelectedSymbol1, saveOptionSymbol, saveOptionSymbol1, saveNewsSymbol, saveStrikeVal, saveHomeSymbol } from '../redux/actions/MarketCategoryActions';
import { useDispatch, useSelector } from 'react-redux';

const OptionTable = props => {
    const { data } = props;
    const selectedSym = useSelector(state => state.marketCategory.selectedSymbol);
    const homesymbol = useSelector(state => state.marketCategory.homeSymbol);
    const strikeVal = useSelector(state => state.marketCategory.strikeVal);
    const newssymbol = useSelector(state => state.marketCategory.selectedNews);
    const optionHome = useSelector(state => state.marketCategory.saveHomesym);
    const checksymb = useSelector(state => state.marketCategory.saveSymbol);
    const checksymb1 = useSelector(state => state.marketCategory.saveSymbol1);
    const dispatch = useDispatch();
    const [symb, setSymb] = useState(data);
    const [selected, setSelected] = useState(false)


    const getFilterData =
        selectedSym ?
            props.isFlow == true ?
                data.filter(word => word.column2 == selectedSym) :
                props.isHeatMap ? data
                    :
                    data.filter((selectedSymb) => { return selectedSymb.column1 == selectedSym }) :
            data;

    useEffect(() => {
        dispatch(saveOptionSymbol1(true))

        if (selected == false && selectedSym && checksymb != true) {
            dispatch(saveSelectedSymbol(null))

            //dispatch(saveOptionSymbol(null))
        }

    }, [])


    const componentHeader = useMemo(() => {
        if (props.isGradient) {

            return (
                <View style={{ width: '100%', height: heightScale(65) }}>
                    <View style={styles.flatlistCon}>
                        {props.headerData.map((item) => {
                            return (
                                <View style={{ width: '30%' }}>
                                    <Text style={[styles.topGainersTextHeading]}>{item.tabname}</Text>
                                </View>
                            )
                        })}
                        <View style={{ width: '40%' }}>
                            <Text style={[styles.topGainersTextHeading1]}>{"VALUE"}</Text>
                        </View>
                    </View>
                    <View style={[styles.viewLine, props.viewLineStyle]} />
                </View >
            )
        }
        else {
            return (
                <View style={{ width: '100%', height: heightScale(65) }}>
                    <View style={styles.flatlistCon}>
                        {props.headerData.map((item) => {
                            let isIcon = item.tabname == "ICON" ? true : false;
                            return isIcon ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={images.greenDown} resizeMode={'contain'} style={[styles.arrowDownStyle]} />
                                    <Image source={images.greenUp} resizeMode={'contain'} style={[styles.arrowStyle,]} />
                                </View> :
                                <Text style={[styles.topGainersTextHeading, props.tabNameStyle]}>{item.tabname}</Text>
                        })}
                    </View>
                    <View style={[styles.viewLine, props.viewLineStyle]} />
                </View >
            )
        }
    }, [props.headerData]);
    return (
        <View style={styles.container}>
            {componentHeader}
            <FlatList
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={getFilterData && getFilterData.length > 0 ? getFilterData : []}
                // data={selectedSym && (!props.isGradient || !props.isHeatMap) ? selectedSym1 && selectedSym1.length > 0 ? selectedSym1 : [] : data && data.length > 0 ? data : []}
                keyExtractor={(index) => keyGenerator()}
                ListEmptyComponent={() => {
                    if (props.isHeatMap && !selectedSym) {
                        return <View style={styles.noSymbolView}>
                            <Text style={styles.noSymbolHeatMap}>Click a symbol to view the options heat map</Text>
                        </View>
                    }
                    return null;
                }}
                renderItem={({ item, index }) => {
                    if (props.isGradient) {
                        return (

                            <TouchableOpacity onPress={() => {
                                dispatch(saveSelectedSymbol(item.symbol))
                                setSelected(true)
                                dispatch(saveOptionSymbol(true))
                                dispatch(saveSelectedSymbol(item.symbol))
                                dispatch(saveSelectedSymbol1(item.symbol))
                                dispatch(saveNewsSymbol(item.symbol))



                            }}>
                                <View key={item.id} style={[styles.cellStyle, index % 2 == 0 ? {
                                    backgroundColor: 'rgba(32,32,32,1)'
                                } : { backgroundColor: '#010101' }]}>
                                    {item.column1 ? <Text style={styles.topGainersText1}>{item.column1 ? item.column1 : ""}</Text> : null}
                                    {item.column2 ? <Text style={styles.topGainersText1}>{item.column2 ? item.column2 : ""}</Text> : null}
                                    <View style={{ width: '40%', justifyContent: 'center' }}>
                                        {item.column3 ? <Text style={styles.topGradientText1}>{item.column3 ? item.column3 : ""}</Text> : null}
                                        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={[{
                                            width: item.colorPercent + "%", position: 'absolute',
                                            zIndex: -9999, height: '100%'
                                        },]}
                                            colors={[...item.color]} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    else if (props.isHeatMap) {
                        return (

                            <View style={styles.rowDir}>
                                <View style={[styles.mapBoxStyle, { backgroundColor: item.column1.backgroundColor }]}>
                                    <Text style={styles.boxTextStyle}>{item.column1.value}</Text>
                                </View>
                                <View style={[styles.mapBoxStyle, { backgroundColor: item.column2.backgroundColor }]}>
                                    <Text style={styles.boxTextStyle}>{item.column2.value}</Text>
                                </View>
                                <View style={[styles.mapBoxStyle, { backgroundColor: item.column3.backgroundColor }]}>
                                    <Text style={styles.boxTextStyle}>{item.column3.value}</Text>
                                </View>
                                <View style={[styles.mapBoxStyle, { backgroundColor: item.column4.backgroundColor, borderRightWidth: 0 }]}>
                                    <Text style={[styles.boxTextStyle, { color: colors.WHITE }]}>{item.column4.value}</Text>
                                </View>
                                <View style={[styles.mapBoxStyle, { backgroundColor: item.column5.backgroundColor }]}>
                                    <Text style={styles.boxTextStyle}>{item.column5.value}</Text>
                                </View>
                                <View style={[styles.mapBoxStyle, item.column6 && item.column6.backgroundColor ? { backgroundColor: item.column6.backgroundColor } : {}]}>
                                    <Text style={styles.boxTextStyle}>{item.column6 && item.column6.value ? item.column6.value : ""}</Text>
                                </View>
                                <View style={[styles.mapBoxStyle, item.column7 && item.column7.backgroundColor ? { backgroundColor: item.column7.backgroundColor, borderRightWidth: 0 } : {}]}>
                                    <Text style={styles.boxTextStyle}>{item.column7 && item.column7.value ? item.column7.value : ""}</Text>
                                </View>
                            </View>
                        )
                    } else if (props.isFlow) {
                        return (
                            <TouchableOpacity
                                onPress={() => {

                                    // symbolSelect(item.symbol)
                                    dispatch(saveSelectedSymbol(item.symbol))
                                    setSelected(true)
                                    dispatch(saveOptionSymbol(true))
                                    dispatch(saveSelectedSymbol(item.symbol))
                                    dispatch(saveSelectedSymbol1(item.symbol))
                                    dispatch(saveNewsSymbol(item.symbol))


                                }}
                            //      onPress={()=>{
                            //         dispatch(saveSelectedSymbol(item.symbol))
                            //   }}
                            >

                                <View key={item.id} style={[styles.mainRow,
                                index % 2 == 0 ? { backgroundColor: 'rgba(32,32,32,1)' } : {
                                    backgroundColor: '#010101',
                                    paddingVertical: heightScale(15)
                                }]}>
                                    <View style={{ flex: 1 }}>
                                        {item.column1 ? <Text style={item.color ? [styles.topGainersText, { color: item.color1 }] : styles.topGainersText}>{item.column1 ? item.column1 : ""}</Text> : null}
                                        {item.column11 ? <Text style={item.color ? [styles.topGainersText, { color: item.color1 }] : styles.topGainersText}>{item.column11 ? item.column11 : ""}</Text> : null}
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        {item.column2 ? <Text style={item.color ? [styles.topGainersText, { color: item.color1 }] : styles.topGainersText}>{item.column2 ? item.column2 : ""}</Text> : null}
                                        {item.column22 ? <Text style={item.color ? [styles.topGainersText, { color: item.color1 }] : styles.topGainersText}>{item.column22 ? item.column22 : ""}</Text> : null}
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        {item.column3 ? <Text style={item.color ? [styles.topGainersText, { color: item.color1 }] : styles.topGainersText}>{item.column3 ? item.column3 : ""}</Text> : null}

                                        {item.column33 ? <Text style={item.color ? [styles.topGainersText, { color: item.color1 }] : styles.topGainersText}>{item.column33 ? item.column33 : ""}</Text> : null}
                                    </View>
                                    <View style={{ flex: 1 }}>

                                        {item.column4 ? <Text style={item.color ? [styles.topGainersText, { color: item.color1 }] : styles.topGainersText}>{item.column4 ? item.column4 : ""}</Text> : null}
                                        {item.column44 ? <Text style={item.color ? [styles.topGainersText, { color: item.color1 }] : styles.topGainersText}>{item.column44 ? item.column44 : ""}</Text> : null}


                                    </View>
                                    <View style={{ flex: 1 }}>
                                        {item.column5 == 'CALL' || 'PUT' ? <Text style={item.color ? [styles.topGainersText, { color: item.color }] : styles.topGainersText}>{item.column5 ? item.column5 : ""}</Text> : <Text style={[styles.topGainersText]}>{item.column5 ? item.column5 : ""}</Text>}
                                        {item.column55 == 'CALL' || 'PUT' ? <Text style={item.color ? [styles.topGainersText, { color: item.color }] : styles.topGainersText}>{item.column55 ? item.column55 : ""}</Text> : null}
                                    </View>
                                    {item.column6 ? <Text style={[styles.topGainersText]}>{item.column6 ? item.column6 : ""}</Text> : null}
                                    {item.column7 ? <Text style={[styles.topGainersText]}>{item.column7 ? item.column7 : ""}</Text> : null}
                                </View>
                                <View style={{ height: 1, backgroundColor: colors.LIGTH_GREEN }} />
                            </TouchableOpacity>
                        )
                    }
                    else {
                        return (
                            <TouchableOpacity

                                onPress={() => {
                                    dispatch(saveSelectedSymbol(item.symbol))
                                    setSelected(true)
                                    dispatch(saveOptionSymbol(true))
                                    dispatch(saveSelectedSymbol(item.symbol))
                                    dispatch(saveSelectedSymbol1(item.symbol))
                                    dispatch(saveNewsSymbol(item.symbol))


                                }}
                            >

                                <View key={item.id} style={[styles.mainRow,
                                index % 2 == 0 ? { backgroundColor: 'rgba(32,32,32,1)' } : {
                                    backgroundColor: '#010101',
                                    paddingVertical: heightScale(15)
                                }]}>
                                    <View style={{ flex: 1 }}>
                                        {item.column1 ? <Text style={styles.topGainersText}>{item.column1 ? item.column1 : ""}</Text> : null}
                                        {item.column11 ? <Text style={styles.topGainersText}>{item.column11 ? item.column11 : ""}</Text> : null}
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        {item.column2 ? <Text style={styles.topGainersText}>{item.column2 ? item.column2 : ""}</Text> : null}
                                        {item.column22 ? <Text style={styles.topGainersText}>{item.column22 ? item.column22 : ""}</Text> : null}
                                    </View>

                                    <View style={{ flex: 1 }}>

                                        {item.column3 == 'CALL' || item.column3 == 'PUT' ?

                                            <Text style={item.color ? [styles.topGainersText, { color: item.color }] : styles.topGainersText}>
                                                {item.column3 ? item.column3 : ""}</Text>
                                            :

                                            <Text style={[styles.topGainersText]}>{item.column3 ? item.column3 : ""}</Text>}

                                        {item.column33 ? <Text style={styles.topGainersText}>{item.column33 ? item.column33 : ""}</Text> : null}

                                    </View>

                                    <View style={{ flex: 1 }}>
                                        {item.column4 ? <Text style={[styles.topGainersText]}>{item.column4 ? item.column4 : ""}</Text> : null}
                                        {item.column44 ? <Text style={[styles.topGainersText]}>{item.column44 ? item.column44 : ""}</Text> : null}
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        {item.column5 == 'CALL' || item.column5 == 'PUT' ? <Text style={item.color ? [styles.topGainersText, { color: item.color }] : styles.topGainersText}>{item.column5 ? item.column5 : "0.00"}</Text> : <Text style={[styles.topGainersText]}>{item.column5 ? item.column5 : "0.00"}</Text>}
                                        {item.column55 ? <Text style={[styles.topGainersText]}>{item.column55 ? item.column55 : item.column55 == '' ? "0.00" : ""}</Text> : null}
                                    </View>
                                    {item.column6 ? <Text style={[styles.topGainersText]}>{item.column6 ? item.column6 : ""}</Text> : null}
                                    {item.column7 ? <Text style={[styles.topGainersText]}>{item.column7 ? item.column7 : ""}</Text> : null}
                                </View>
                                <View style={{ height: 1, backgroundColor: colors.LIGTH_GREEN }} />
                            </TouchableOpacity>
                        )
                    }

                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    flatlistCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0,

        marginHorizontal: widthScale(-2),

    },
    topGainersText: {
        fontSize: widthScale(10),
        fontFamily: myFonts.montserratRegular,
        color: colors.FORGOT_PASSWORD,
        // padding: widthScale(4),
        flex: 1,
        textAlign: 'center',
        fontWeight: '500'
    },
    arrowStyle: {
        alignSelf: 'center',
        marginRight: widthScale(20),
        marginTop: heightScale(10)
    },
    arrowDownStyle: {
        alignSelf: 'center',
        marginLeft: widthScale(20),
        marginTop: heightScale(10)
    },
    icon: {
        marginHorizontal: widthScale(30)
    },
    topGainersTextHeading: {
        fontSize: widthScale(10),
        fontFamily: myFonts.openSansBold,
        color: colors.LIGTH_GREEN,
        flex: 1,
        textAlign: 'center',
        marginTop: heightScale(10)
    },
    viewLine: {
        borderTopWidth: 2,
        borderColor: colors.LIGTH_GREEN,
        marginBottom: heightScale(10),
        marginHorizontal: heightScale(12),

    },
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: heightScale(7),
    },

    // isGradient Tabs style

    cellStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: colors.LIGTH_GREEN,
        borderBottomWidth: 1
    },
    topGainersText1: {
        fontSize: widthScale(10),
        fontFamily: myFonts.montserratRegular,
        color: colors.FORGOT_PASSWORD,
        padding: widthScale(4),
        flex: 1,
        textAlign: 'center',
        fontWeight: '500',
        marginVertical: heightScale(9)
    },
    topGainersTextHeading1: {
        fontSize: widthScale(10),
        fontFamily: myFonts.openSansBold,
        color: colors.LIGTH_GREEN,
        flex: 1,
        textAlign: 'left',
        marginTop: heightScale(10)
    },
    topGradientText1: {
        fontSize: widthScale(10),
        fontFamily: myFonts.montserratRegular,
        color: colors.FORGOT_PASSWORD,
        padding: widthScale(4),
        flex: 1,
        textAlign: 'left',
        fontWeight: '500',
        marginVertical: heightScale(9)
    },
    mapBoxStyle: {
        width: myWidth / 7,
        height: heightScale(54),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomColor: colors.HOME_MAIN_BOX,
        borderRightColor: colors.HOME_MAIN_BOX
    },
    boxTextStyle: {
        fontSize: widthScale(10),
        fontFamily: myFonts.montserratRegular,
        color: colors.BLACK,
        fontWeight: '600'
    },
    rowDir: {
        flexDirection: 'row'
    },
    noSymbolHeatMap: {
        fontSize: widthScale(14),
        color: 'white',
        fontFamily: myFonts.montserratRegular,
        alignSelf: 'center'
    },
    noSymbolView: {
        height: heightScale(700), justifyContent: 'center', alignItems: 'center',
    }
})

export default OptionTable;