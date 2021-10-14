import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native'
import MainBackground from '../../CustomUI/MainBackground';
import TableViewFlatlist from '../../CustomUI/TableViewFlatlist';
import API_URL from '../../utils/ApiUrl';
import { heightScale } from '../../utils/Utils';
const signalR = require("@aspnet/signalr");
import SelectedTabBar from '../../CustomUI/SelectedTabBar';
import images from '../../res/images/images';
import { useIsFocused } from '@react-navigation/native';
import { headerAlertWithTimeData, headerAlertWithVolatilityData, headerAlertWithPercentageData } from '../../res/constants'
import strings from '../../res/strings'
import moment from 'moment';
import Loader from '../../CustomUI/Loader';
import { useNavigation } from '@react-navigation/core';
import CustomHeaderText from '../../CustomUI/CustomHeaderText'

const AlertLogScreen = (props) => {
    const isFocused = useIsFocused();
    const [marketData, setMarketData] = useState([])
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedTimeStatus, setSelectedTimeStatus] = useState(1);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            setIsLoading(true)
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {

        const hubUrl = API_URL.base_url + API_URL.alert_log;
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        let redArrow = images.redDown;
        let greenArrow = images.greenUp;
        let upDownIndicator;
        if (isFocused) {
            console.log(isFocused, "isFocused");
            connection.start({ withCredentials: true })
            connection.on(API_URL.alert_log_node, function (response) {
                let mainArray = [];
                const sortMainArray = selectedTab == 0 && selectedTimeStatus == 1 ? response.sort((a, b) => parseFloat(b.DateStamp) - parseFloat(a.DateStamp)) : selectedTab == 0 && selectedTimeStatus == 0 ? response.sort((a, b) => parseFloat(a.DateStamp) - parseFloat(b.DateStamp)) : selectedTab == 1 ?
                    response.sort((a, b) => parseFloat(b.L2Total) - parseFloat(a.L2Total)) :
                    response.sort((a, b) => ((b.CurrentPrice - b.Price) / b.Price) - ((a.CurrentPrice - a.Price) / a.Price));

                sortMainArray.forEach((item, index) => {
                    let volatilityValue = item.L2Total.toFixed(2) == 0.00 ? Math.abs(item.L2Total).toFixed(2) : item.L2Total.toFixed(2)
                    let color = item.MessageType;
                    let obj;
                    if (selectedTab == 0) {
                        if (item.Price < item.CurrentPrice) {
                            upDownIndicator = greenArrow;
                        } else if (item.Price > item.CurrentPrice) {
                            upDownIndicator = redArrow
                        }
                        obj = {
                            'column3': upDownIndicator,
                            'column2': item.Symbol,
                            'column4': item.CurrentPrice ? "$" + item.CurrentPrice.toFixed(2) : '',
                            'column1': item.DateStamp ? moment(item.DateStamp).format('LTS').replace(/PM|AM/gi, "") : '',
                            'color': color,
                            'iconCol': 3
                        };
                    } else if (selectedTab == 1) {
                        if (item.Price < item.CurrentPrice) {
                            upDownIndicator = greenArrow;
                        } else if (item.Price > item.CurrentPrice) {
                            upDownIndicator = redArrow
                        }
                        obj = {
                            'column3': upDownIndicator,
                            'column2': item.Symbol,
                            'column4': volatilityValue,
                            'column1': item.DateStamp ? moment(item.DateStamp).format('LTS').replace(/PM|AM/gi, "") : '',
                            'iconCol': 3
                        };
                    } else if (selectedTab == 2) {
                        if (item.Price < item.CurrentPrice) {
                            upDownIndicator = greenArrow;
                        } else if (item.Price > item.CurrentPrice) {
                            upDownIndicator = redArrow
                        }
                        obj = {
                            'column3': upDownIndicator,
                            'column2': item.Symbol,
                            'column4': "$" + item.Price.toFixed(2),
                            'column1': item.DateStamp ? moment(item.DateStamp).format('LTS').replace(/PM|AM/gi, "") : '',
                            'color': color,
                            'iconCol': 3
                        };
                    }

                    mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                    mainArray.push(obj);
                });

                setMarketData([...mainArray], setIsLoading(false));

            });
        }
        else {
            connection.stop();
            setMarketData([])
        }
        return () => {
            connection.stop();
            setMarketData([])

        }
    }, [isFocused, selectedTab, selectedTimeStatus])

    const onClickTabTab = (ids) => {

        if (ids == 0) {
            if (selectedTimeStatus === 0) {

                setSelectedTimeStatus(1)
                setIsLoading(true);
                setMarketData([]);
                setSelectedTab(ids)

            } else {
                setSelectedTimeStatus(0)
                setIsLoading(true);
                setMarketData([]);
                setSelectedTab(ids)
            }
        } else {
            setIsLoading(true);
            setMarketData([]);
            setSelectedTab(ids)
        }
    }
    return (
        <MainBackground>
            <CustomHeaderText showSearch={true} {...props} label="Alert Log" count={marketData.length} />
            <Loader isLoading={isLoading} />
            <View style={{ marginTop: heightScale(15) }}>
                <SelectedTabBar onClickTabTab={onClickTabTab}
                    firstTabText={strings.time} secondTabText={strings.volatility} thirdTabText={strings.percertage_change} isTabBarSelected={selectedTab} />
            </View>
            <View style={styles.container}>
                <TableViewFlatlist data={marketData} {...props} headerData={selectedTab == 0 ? headerAlertWithTimeData :
                    selectedTab == 1 ? headerAlertWithVolatilityData : headerAlertWithPercentageData} />
            </View>
        </MainBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: heightScale(15)
    }
});
export default AlertLogScreen;
