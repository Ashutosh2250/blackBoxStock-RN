import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, FlatList, ScrollView } from 'react-native';
import MainBackground from '../../../CustomUI/MainBackground';
import { WebView } from 'react-native-webview';
import colors from '../../../res/colors';
import { widthScale, heightScale, myFonts } from '../../../utils/Utils';
import images from '../../../res/images/images';
import Loader from '../../../CustomUI/Loader';
import { Calendar } from 'react-native-big-calendar'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { saveSelectedSymbol, saveSelectedSymbol1, saveOptionSymbol, saveHomeSymbol, saveNewsSymbol, saveStocksSymbol, saveAlertSymbol } from '../../redux/actions/MarketCategoryActions';

const StockTwitsScreen = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [symb, setSymb] = useState('');
    const stocktwitsSym = useSelector(state => state.marketCategory.stocktwitsSym);
    const selectedSymbol = useSelector(state => state.marketCategory.selectedSymbol);
    setTimeout(() => {
        setIsLoading(false)
    }, 1000)


    return (

        <MainBackground>
            <Loader isLoading={isLoading} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View style={{ flex: 1, backgroundColor: 'red' }}>
                    <WebView
                        source={{ uri: 'https://blackboxstocks-10-07-21.s3.amazonaws.com/stocktwits/index.html?symbol=' + stocktwitsSym }}
                        style={{ backgroundColor: 'black' }}
                    />
                </View>


            </ScrollView>

        </MainBackground>
    )
}



export default StockTwitsScreen;