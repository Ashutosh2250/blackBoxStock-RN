import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import SimpleToast from 'react-native-simple-toast';
import CustomSegmentControlTab from '../../CustomUI/CustomSegmentControlTabs';
import MainBackground from '../../CustomUI/MainBackground';
import API_URL from '../../utils/ApiUrl';
import { heightScale, widthScale } from '../../utils/Utils';
import GainersHub from './GainersHub';
const signalR = require("@aspnet/signalr");
import styles from './styles';
import images from '../../res/images/images';
import Loader from '../../CustomUI/Loader';
import { useIsFocused } from '@react-navigation/native';

import { saveSelectedSymbol, saveSelectedSymbol1, saveGainerData, saveOptionSymbol } from '../../redux/actions/MarketCategoryActions';

import { useDispatch, useSelector } from 'react-redux';
import { set } from 'react-native-reanimated';

const TopGainerScreen = props => {

    var connection;
    const [isLoading, setIsLoading] = useState(true);
    const [gainerData, setGainerData] = useState([]);
    const [gainerData1, setGainerData1] = useState([]);
    const [yestGainerData, setYestGainerData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [val, setVal] = useState('');
    const selectedSym = useSelector(state => state.marketCategory.selectedSymbol);
    const checksymb = useSelector(state => state.marketCategory.saveSymbol);
    const dispatch = useDispatch();
    if (checksymb == true) {
        dispatch(saveOptionSymbol(null))
        //dispatch(saveOptionSymbol(null))
    }
    const marketData = useSelector(state => state.marketCategory.gainer_data);
    const isFocused = useIsFocused();

    useEffect(() => {
        const hubUrl = API_URL.base_url + API_URL.gainers;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();

        connection.start({ withCredentials: true })
        connection.on('updateGainers', function (t) {

            let sortedList = GainersHub.parseGainers(t)
            //let sortedList = sortData.slice(0, 5)
            setGainerData([...sortedList])

            t.forEach(element => {
                element.key = Math.random();

            })
            setTimeout(() => {
                dispatch(saveGainerData([...sortedList]))
            }, 200)

            setIsLoading(false)

            //  console.log("checkdata", gainerData1, marketData, sortedList)


        });

        axios.post('https://members.blackboxstocks.com/Blackbox/GetYesterdayGainers', { market: 'Nasdaq' })
            .then(response => {

                let sortedList = GainersHub.parseGainers(response.data)
                response.data.forEach(element => {
                    element.key = Math.random();
                });
                let reversed = sortedList.reverse();
                setYestGainerData([...reversed])
            })
            .catch(error => {
                console.log("error", error);
                SimpleToast.show("Some error occurred!")
            })
    }, []);

    useEffect(() => {
        if (gainerData.length > 0) {
            let abc = [...gainerData]
            let arrow = images.upwhite;
            let downarrow = images.downwhite
            let upDownIndicator

            for (let i = 0; i < marketData.length; i++) {

                if (marketData[i] != undefined && abc[i] != undefined) {

                    if (marketData[i].PercentGain > abc[i].PercentGain) {

                        abc[i].color = "red"
                        abc[i].upDownIndicator = arrow
                    } else if (marketData[i].PercentGain < abc[i].PercentGain) {

                        abc[i].color = "green"

                        abc[i].upDownIndicator = downarrow
                    }

                }
            }
            // marketData.forEach((element) => {
            //     abc.forEach((item) => {
            //         console.log("hello", element.PercentGain, item.PercentGain)
            //         if (element.PercentGain == item.PercentGain) {

            //             item.color = "red"
            //             // item.upDownIndicator = arrow
            //         }
            //         else if (element.PercentGain < item.PercentGain) {

            //             item.color = "green"
            //             item.upDownIndicator = downarrow
            //         } else if (element.PercentGain > item.PercentGain) {

            //             item.color = "red"
            //             item.upDownIndicator = arrow
            //         }

            //     })


            // })

            setGainerData1([...abc])
        }

    }, [gainerData])

    const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9);

    return (

        <MainBackground>
            <Loader isLoading={isLoading} />
            <ScrollView style={{ flexGrow: 1 }} bounces={false} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={{ flex: 1 }}>

                    <View style={{ marginTop: heightScale(20) }}>
                        <CustomSegmentControlTab
                            dataArray={['Today', 'Yesterday']}
                            style={{ marginHorizontal: widthScale(20) }}
                            onTabPress={(index) => { setSelectedIndex(index) }}
                        />
                    </View>
                    {selectedIndex == 0
                        ?

                        <FlatList
                            contentContainerStyle={{ marginTop: heightScale(20) }}

                            data={gainerData1}

                            bounces={false}
                            keyExtractor={(item, index) => { return keyGenerator() }}
                            ListHeaderComponent={() => useMemo(() => {

                                return (
                                    <>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 6 }}>
                                            <Text style={styles.topGainersTextHeading}>SYMBOL</Text>
                                            <Text style={styles.topGainersTextHeading}>PRICE AT {'\n'} ALERT</Text>
                                            <Text style={styles.topGainersTextHeading}>HIGH PRICE</Text>
                                            <Text style={styles.topGainersTextHeading}>CURRENT {'\n'} PRICE</Text>
                                            <Text style={styles.topGainersTextHeading}>% GAIN</Text>

                                            <Text style={styles.topGainersTextHeading}>VOLATILITY</Text>
                                        </View>
                                        <View style={styles.viewLine} />
                                    </>
                                )

                            }, [])}
                            renderItem={({ item, index }) => {


                                console.log("mycolor", item.color)


                                return (
                                    <TouchableOpacity onPress={() => {

                                        dispatch(saveSelectedSymbol(item.Symbol))
                                        if (item.Symbol) {
                                            props.navigation.navigate('ChartView')
                                        }

                                    }}>
                                        <View key={index} style={{

                                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 7
                                        }}>

                                            <Text style={styles.topGainersText}>{item.Symbol ? item.Symbol : item.symbol}</Text>
                                            <Text style={styles.topGainersText}>${item.PriceAtAlert ? item.PriceAtAlert.toFixed(2) : ""}</Text>
                                            <Text style={styles.topGainersText}>${item.DailyHigh ? item.DailyHigh.toFixed(2) : ""}</Text>

                                            <Text style={[styles.topGainersText, { color: item.color ? item.color : '#BFBFBF' }]}>${item.CurrentPrice ? item.CurrentPrice.toFixed(2) : ""}</Text>
                                            <Image style={{ height: 5, width: 7, marginRight: 1 }} source={item.upDownIndicator}></Image>
                                            <Text style={[styles.topGainersText]}>{item.PercentGain ? item.PercentGain.toFixed(1) : ""}%</Text>
                                            {/* <Text style={[styles.topGainersText, { color: clr }]}>{item.PercentGain ? item.PercentGain.toFixed(2) : ""}</Text> */}

                                            <Image style={{ height: 5, width: 7, marginleft: 30 }} source={item.upDownIndicator}></Image>
                                            <Text style={[styles.topGainersText, { source: item.upDownIndicator }]}>{item.L2 ? item.L2.toFixed(2) : "0.0"}</Text>


                                        </View>
                                    </TouchableOpacity>
                                )

                            }}
                        />
                        :
                        <FlatList
                            contentContainerStyle={{ marginTop: heightScale(20) }}
                            data={yestGainerData}
                            keyExtractor={(item, index) => { return keyGenerator() }}
                            ListHeaderComponent={() => useMemo(() => {
                                return (
                                    <>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 6, }}>
                                            <Text style={styles.topGainersTextHeading}>SYMBOL</Text>
                                            <Text style={styles.topGainersTextHeading}>PRICE AT {'\n'} ALERT</Text>
                                            <Text style={styles.topGainersTextHeading}>HIGH AFTER {'\n'} ALERT</Text>
                                            <Text style={styles.topGainersTextHeading}>CURRENT {'\n'} PRICE</Text>
                                            <Text style={styles.topGainersTextHeading}>% POTENTIAL GAIN</Text>
                                        </View>
                                        <View style={styles.viewLine} />
                                    </>
                                )

                            }, [])}
                            renderItem={({ item, index }) => {
                                return (
                                    <View key={index.toString()} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 7 }}>
                                        <Text style={styles.topGainersText}>{item.Symbol ? item.Symbol : ""}</Text>
                                        <Text style={styles.topGainersText}>${item.PriceAtAlert ? item.PriceAtAlert.toFixed(2) : ""}</Text>
                                        <Text style={styles.topGainersText}>${item.HighAfterAlert ? item.HighAfterAlert.toFixed(2) : ""}</Text>
                                        <Text style={styles.topGainersText}>${item.Change ? item.Change.toFixed(2) : ""}</Text>
                                        <Text style={styles.topGainersText}>{item.PercentPotentialGain ? item.PercentPotentialGain.toFixed(2) + " %" : ""}</Text>
                                    </View>
                                )

                            }}
                        />
                    }

                    <View style={styles.whiteLine} />

                </View>
            </ScrollView>
        </MainBackground >
    );

}

export default TopGainerScreen;