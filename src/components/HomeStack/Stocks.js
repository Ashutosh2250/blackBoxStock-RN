/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView
} from 'react-native';
const signalR = require("@aspnet/signalr");
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import Loader from '../../CustomUI/Loader';
import MainBackground from '../../CustomUI/MainBackground';
import { heightScale, myWidth, widthScale } from '../../utils/Utils';
import { testData } from "../../res/constants"
import styles from './styles';
import colors from '../../res/colors';
import API_URL from '../../utils/ApiUrl';
import { object } from 'prop-types';
import images from '../../res/images/images';
import axios from 'axios';


const Stocks = (props) => {

    const [chartData, setChartData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isVol, setIsVol] = useState("0%");
    const [isInt, setIsInt] = useState(0);
    const [valPer, setValPer] = useState("0%")
    const selectedSymbol = useSelector(state => state.marketCategory.selectedSymbol);
    const selectedSymbol1 = useSelector(state => state.marketCategory.homeSymbol);
    const checksymb = useSelector(state => state.marketCategory.saveSymbol);
    useEffect(() => {
        const hubUrl = API_URL.base_url + API_URL.quotes;
        let connection;
        let array = [];
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        if (selectedSymbol) {
            connection.start({ withCredentials: true }).then(() =>
                connection.invoke('joinlevel2group', selectedSymbol))
            connection.on(API_URL.quotes_node, function (response) {

                const obj = JSON.parse(response);
                array.push(obj)
                setChartData(obj), setIsLoading(false);
                const roundVolValue = Math.round(obj.L2Total * 10);
                const divideValue = roundVolValue / 10;
                const makeString = divideValue.toString()
                const conCatPercentSym = makeString + "%"

                const valPer1 = -1 * ((obj.ClosePrice - obj.CurrentPrice) / obj.ClosePrice)
                setValPer(valPer1)
                setIsVol(conCatPercentSym)
                setIsInt(divideValue)

                fetch('https://svc.blackboxstocks.com:8103/Alert/AAPL')
                    .then(response => {


                    })
                    .catch(error => {
                        console.log("on error search", error);
                    });
                // const requestOptions = {
                //   method: 'GET',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ Symbol: 'AAPL' })
                // };
                // fetch('https://svc.blackboxstocks.com:8103/Alert/', requestOptions)
                //   .then(response =>
                //     console.log("hellocheck", response))
                //   .then(data => this.setState({ postId: data.id }))
                //   .catch(error => {
                //     console.log("on error search", error)
                //   })


            });
        } else if (selectedSymbol1) {
            connection.start({ withCredentials: true }).then(() =>
                connection.invoke('joinlevel2group', selectedSymbol1))
            connection.on(API_URL.quotes_node, function (response) {

                const obj = JSON.parse(response);
                array.push(obj)
                setChartData(obj), setIsLoading(false);
                const roundVolValue = Math.round(obj.L2Total * 10);
                const divideValue = roundVolValue / 10;
                const makeString = divideValue.toString()
                const conCatPercentSym = makeString + "%"

                const valPer1 = -1 * ((obj.ClosePrice - obj.CurrentPrice) / obj.ClosePrice)
                setValPer(valPer1)
                setIsVol(conCatPercentSym)
                setIsInt(divideValue)

                fetch('https://svc.blackboxstocks.com:8103/Alert/AAPL')
                    .then(response => {


                    })
                    .catch(error => {
                        console.log("on error search", error);
                    });
                // const requestOptions = {
                //   method: 'GET',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ Symbol: 'AAPL' })
                // };
                // fetch('https://svc.blackboxstocks.com:8103/Alert/', requestOptions)
                //   .then(response =>
                //     console.log("hellocheck", response))
                //   .then(data => this.setState({ postId: data.id }))
                //   .catch(error => {
                //     console.log("on error search", error)
                //   })


            });
        }

        return () => {
            connection.stop();
        }
    }, [])


    return (
        <MainBackground>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.headerView}>
                    <View style={styles.lineView}>
                        <View style={styles.boxView}>
                            <Text style={styles.symbolText}>QQQ</Text>
                            <View style={styles.innerBox}>
                                <Text style={styles.priceText}>$380.5</Text>
                                <Text style={styles.percentText}>-4.5%</Text>
                            </View>
                        </View>


                    </View>
                    <View style={styles.lineView}>
                        <View style={styles.boxView}>
                            <Text style={styles.symbolText}>DIA</Text>
                            <View style={styles.innerBox}>
                                <Text style={styles.priceText}>$380.5</Text>
                                <Text style={styles.percentText}>-4.5%</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.boxView}>
                        <Text style={styles.symbolText}>SPY</Text>
                        <View style={styles.innerBox}>
                            <Text style={styles.priceText}>$380.5</Text>
                            <Text style={styles.percentText}>-4.5%</Text>
                        </View>
                    </View>

                </View>
                <View style={{ height: heightScale(380) }}>
                    {selectedSymbol ?
                        <WebView

                            source={{ uri: 'https://chartiq.blackboxstocks.com/?symbol=' + selectedSymbol }}
                            style={{}}
                        />
                        :
                        <WebView

                            source={{ uri: 'https://chartiq.blackboxstocks.com/?symbol=' + selectedSymbol1 }}
                            style={{}}
                        />
                    }

                </View>

                <View style={styles.mainContainer}>
                    <Text style={styles.volatilityIndicator} >VOLATILITY INDICATOR</Text>
                    <View style={[{ alignItems: 'center', marginTop: 30 }, isInt < 0 ? { marginRight: isVol ? isVol.substring(1) : 0 } : { marginLeft: isVol ? isVol : 0 }]}>
                        <Image source={images.redDown} resizeMode={'contain'} />
                    </View>
                    <View style={styles.rowDir}>
                        {testData.map((item) => {
                            return (<View style={{ width: myWidth / testData.length, backgroundColor: item.color, height: heightScale(8) }} />)
                        })}
                    </View>
                    <View style={styles.lineAndValue}>
                        {testData.map((item) => {
                            return (
                                <View>
                                    <View style={styles.verticalIndicator} />
                                    <Text style={styles.valueTextStyle} >{item.value}</Text>
                                </View>
                            )
                        })}
                    </View>
                    {chartData &&
                        <View style={styles.symbolStyle}>
                            <Loader isLoading={isLoading} />
                            <Text style={styles.symbolStyle} >{chartData.Symbol}</Text>
                            <View style={styles.footerContainer}>
                                <View style={styles.infooterConatainer}>
                                    <Text style={styles.contentStyle} >{chartData.CurrentPrice.toFixed(2)}</Text>
                                    <Text style={styles.contenttextStyle}>Last</Text>
                                </View>
                                <View style={styles.infooterConatainer}>
                                    <Text style={styles.contentStyle} >{chartData.BidPrice}</Text>
                                    <Text style={styles.contenttextStyle} >Bid</Text>
                                </View>
                                <View style={styles.infooterConatainer}>
                                    <Text style={styles.contentStyle} >{chartData.AskPrice}</Text>
                                    <Text style={styles.contenttextStyle} >Ask</Text>
                                </View>

                            </View>
                            <View style={styles.volumeContainerStyle}>
                                <Text style={styles.volumevalueStyle} >{chartData.CurrentVolume.toLocaleString()}</Text>
                                <Text style={styles.volumetextStyle} >Volume</Text>
                            </View>
                            <View style={styles.finalDataStyle}>
                                {chartData.CurrentPrice < chartData.ClosePrice
                                    ?
                                    <Text style={styles.finalDataValueStyle1} >{(chartData.CurrentPrice - chartData.ClosePrice).toFixed(2)}</Text>

                                    :
                                    <Text style={styles.finalDataValueStyle} >+{(chartData.CurrentPrice - chartData.ClosePrice).toFixed(2)}</Text>
                                }
                                {chartData.CurrentPrice < chartData.ClosePrice
                                    ?

                                    <Text style={styles.finalDataValueStyle1} >
                                        {(valPer * 100).toFixed(2)}% </Text>
                                    :
                                    <Text style={styles.finalDataValueStyle} >
                                        {(valPer * 100).toFixed(2)}% </Text>
                                }

                            </View>


                            <Text style={styles.footertextStyle} >Change from yesterday</Text>

                        </View>
                    }
                </View>
            </ScrollView>

        </MainBackground >
    );
};

export default Stocks;
