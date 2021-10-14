import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, saveSelectedSymbol } from '../redux/actions/MarketCategoryActions';
import colors from '../res/colors';
import API_URL from '../utils/ApiUrl';
import ChartView from '../components/HomeStack/ChartView';
import { useNavigation } from '@react-navigation/native';
import { heightScale, keyGenerator, myFonts, widthScale } from '../utils/Utils';


const SearchModal = (props) => {
    const showSerchModal = useSelector(state => state.marketCategory.open_modal);
    const [searchResults, setSearchResults] = useState([]);
    const [symbol, setSymbol] = useState('');
    const dispatch = useDispatch();



    useEffect(() => {

        if (!showSerchModal) {
            setSymbol('')
        }

    }, [showSerchModal])
    useEffect(() => {

        // let headers = {
        //     "ApiKey": API_URL.bbApiKey1
        // },
        //     data = {
        //         "text": symbol
        //     }
        if (symbol) {

            axios.post(API_URL.swagger_base_url + API_URL.search_companies, {
                'text': symbol
            },
                {
                    headers: {
                        "ApiKey": API_URL.bbApiKey1

                    }
                })
                .then(response => {
                    console.log(typeof response.data);
                    let array = Object.keys(response.data).map((key) => [String(key), response.data[key]]);
                    setSearchResults([...array]);
                    console.log("array", array);
                })
                .catch(error => {
                    console.log("on error search", error);
                })
        }


    }, [symbol])
    return (
        showSerchModal ?
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <TextInput
                        placeholder="Load Symbol"
                        value={symbol}
                        style={styles.textInputStyle}
                        onChangeText={(value) => {
                            setSymbol(value)
                        }}
                    />
                    {symbol ?
                        <FlatList
                            style={{ width: "100%", alignSelf: 'stretch' }}
                            data={searchResults}
                            keyExtractor={() => keyGenerator()}
                            renderItem={({ item, index }) => (
                                item.map((value, i) => {
                                    return (
                                        <View>
                                            <TouchableOpacity onPress={({ }) => {
                                                dispatch(saveSelectedSymbol(item[0]));
                                                dispatch(openModal(!showSerchModal));

                                                // navigation.navigate('ChartView')


                                            }}>
                                                <Text style={[styles.textView]}>{value}</Text>
                                                {i == item.length - 1 ? <View style={{ height: heightScale(20) }} /> : null}

                                            </TouchableOpacity>

                                        </View>
                                    )
                                })

                            )}
                        />
                        : null
                    }

                </View>
            </View>
            : null
    )


}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0)",
        marginHorizontal: widthScale(20),
        marginTop: heightScale(70),
        marginBottom: heightScale(20),
        // justifyContent: "center",
    },
    modalView: {
        flex: -1,
        paddingHorizontal: widthScale(10),
        //justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#ececec',
        borderRadius: 5,
    },
    textInputStyle: {
        fontSize: widthScale(14),
        fontFamily: myFonts.montserratRegular,
        color: colors.BLACK,
        width: '100%',
        height: 50
    },
    textView: {
        color: 'grey',
        fontFamily: myFonts.montserratBold,
        fontSize: widthScale(14),
        // textAlign: 'left'
    },
    textViewDesp: {
        color: 'grey',
        fontFamily: myFonts.montserratRegular,
        fontSize: widthScale(14),
        // textAlign: 'left'
    }
})

export default SearchModal
