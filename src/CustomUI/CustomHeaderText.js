import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, saveSelectedSymbol, saveSelectedSymbol1, saveOptionSymbol, saveNewsSymbol, saveStocksSymbol, saveStrikeVal, saveAlertSymbol } from '../redux/actions/MarketCategoryActions';
import colors from '../res/colors';
import images from '../res/images/images';
import strings from '../res/strings';
import { heightScale, myFonts, widthScale } from '../utils/Utils';


const CustomHeaderText = (props) => {
    const dispatch = useDispatch();
    const [checkIndex, setcheckIndex] = useState(false)
    const strikeVal = useSelector(state => state.marketCategory.strikeVal);
    const openCloseModal = useSelector(state => state.marketCategory.open_modal);
    const selectedSymbol = useSelector(state => state.marketCategory.selectedSymbol);
    const homesymbol = useSelector(state => state.marketCategory.homeSymbol);
    const newssymbol = useSelector(state => state.marketCategory.selectedNews);
    const stocktwitsSym = useSelector(state => state.marketCategory.stocktwitsSym);
    const selectedAlertsSym = useSelector(state => state.marketCategory.selectedAlertsSym);
    const checksymb = useSelector(state => state.marketCategory.saveSymbol);





    return (
        <TouchableWithoutFeedback onPress={() => {
            if (openCloseModal) {
                dispatch(openModal(!openCloseModal))
            }
        }}>

            <View style={styles.headerCon}>
                <View style={[styles.container, { ...props.style }]}>
                    <TouchableOpacity hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }} onPress={() => {
                        props.navigation.goBack()
                        dispatch(openModal(false))
                    }}>
                        <Image source={images.backBtn} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <View style={styles.headerStyle}>
                        {/* <Text style={styles.headerText}>{props.label} {props.count ? <Text style={styles.headerText}>({props.count} Alerts)</Text> : null}</Text> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={styles.headerText}>{props.label}</Text>
                            {props.count ? <Text style={styles.headerText}>({props.count} Alerts)</Text> : null}
                            <View>
                                {selectedSymbol && props.label == 'Options'
                                    ?
                                    <TouchableOpacity onPress={() => dispatch(saveSelectedSymbol("")), dispatch(saveStrikeVal(""))}>
                                        {props.label == 'Options' ?
                                            <Text style={styles.headerText}>{strings.arrow}{'All'}</Text> : null}
                                    </TouchableOpacity>
                                    :
                                    newssymbol && props.label == 'News' ?
                                        <TouchableOpacity onPress={() => dispatch(saveNewsSymbol(""))}>
                                            {props.label == 'News' ?
                                                <Text style={styles.headerText}>{strings.arrow}{'All'}</Text> : null}
                                        </TouchableOpacity>
                                        :
                                        stocktwitsSym && props.label == 'StockTwits'
                                            ?
                                            <TouchableOpacity onPress={() => dispatch(saveStocksSymbol(""))}>
                                                {props.label == 'StockTwits' ?
                                                    <Text style={styles.headerText}>{strings.arrow}{'All'}</Text> : null}
                                            </TouchableOpacity> :
                                            selectedAlertsSym && props.label == 'Alert Stream' ?
                                                <TouchableOpacity onPress={() => dispatch(saveAlertSymbol(""))}>
                                                    {props.label == 'Alert Stream' ?
                                                        <Text style={styles.headerText}>{strings.arrow}{'All'}</Text> : null}
                                                </TouchableOpacity> :
                                                props.label == 'News' || props.label == 'Options' || props.label == 'StockTwits' || props.label == 'Alert Stream' ? <Text style={styles.headerText}>{strings.arrow}{'All'}</Text> : null}
                            </View>
                            {props.label == 'News' ?
                                <Text style={styles.headerText}>{newssymbol ? strings.arrow : ""}{newssymbol ? newssymbol : ''} </Text>
                                :
                                props.label == 'Options' ?
                                    <Text style={styles.headerText}>{selectedSymbol ? strings.arrow : ""}{selectedSymbol ? selectedSymbol : ''} </Text>
                                    :
                                    props.label == 'StockTwits' ?
                                        <Text style={styles.headerText}>{stocktwitsSym ? strings.arrow : ""}{stocktwitsSym ? stocktwitsSym : ''} </Text>
                                        :
                                        props.label == 'Alert Stream' ?
                                            <Text style={styles.headerText}>{selectedAlertsSym ? strings.arrow : ""}{selectedAlertsSym ? selectedAlertsSym : ''} </Text> : null}
                        </View>

                        {props.showSearch
                            ?
                            <View style={props.label == "News" ? { marginLeft: 40 } : props.label == "Stock Scanners" ? { marginLeft: 75 } : { marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => {

                                    dispatch(openModal(!openCloseModal));

                                }}>
                                    <Image source={images.search} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>
                            :
                            null
                        }
                        {props.showReset
                            ?
                            <TouchableOpacity onPress={() => props.resetCallback()}>
                                <Text style={styles.resetText}>Reset All</Text>
                            </TouchableOpacity>
                            :
                            null
                        }
                        {props.showChart
                            ?
                            <TouchableOpacity onPress={() => {

                                if (selectedSymbol || homesymbol || newssymbol || stocktwitsSym || selectedAlertsSym) {
                                    props.navigation.navigate('ChartView')
                                } else {
                                    SimpleToast.show("Please select a symbol")
                                }
                            }}>
                                <Image source={images.chartWhite} resizeMode={'contain'} />
                            </TouchableOpacity>
                            :
                            null
                        }
                        {props.showFilterIcon === 'Flow' || (props.showFilterIcon && props.label == "Stock Scanners") || props.showFilterIcon === 'Alerts' || props.showFilterIcon === 'Ol' || props.showFilterIcon === 'News' || props.showFilterIcon == 'Alert Stream'
                            ?
                            <TouchableOpacity onPress={() => {

                                if (props.showFilterIcon === "Alert Stream" && props.label != "Stock Scanners") {

                                    props.navigation.navigate('Filter', { tabname: 'AlertStream' })
                                } else if (props.showFilterIcon === "News") {
                                    props.navigation.navigate('Filter', { tabname: 'News' })
                                } else if (props.label === "Stock Scanners" && props.showFilterIcon) {
                                    props.navigation.navigate('Filter', { tabname: 'Category' })
                                }
                                else {
                                    props.navigation.navigate('Filter', { tabname: props.showFilterIcon })
                                }
                            }}>
                                <Image source={images.filterIcon} resizeMode={'contain'} />
                            </TouchableOpacity>
                            :
                            null
                        }
                    </View>
                    <View />
                </View>
                <View />
            </View>
        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    headerCon: {
        backgroundColor: '#010101',
        elevation: 5,
        shadowColor: '#ececec',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    container: {
        height: heightScale(33),
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: widthScale(20),
        marginLeft: widthScale(20)
    },
    headerText: {
        color: colors.WHITE,
        fontSize: widthScale(20),
        textAlign: 'left',
        alignSelf: 'center',
        fontFamily: myFonts.montserratMedium,
        marginLeft: widthScale(5),
        // marginRight: widthScale(10),
        //backgroundColor:'red'
    },
    resetText: {
        color: colors.WHITE,
        fontSize: widthScale(18),
        textAlign: 'left',
        alignSelf: 'center',
        fontFamily: myFonts.montserratRegular,
        marginLeft: widthScale(20),
        marginRight: widthScale(10)
    },
    headerStyle: {
        marginHorizontal: widthScale(20),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '85%'
    }
});


export default CustomHeaderText;