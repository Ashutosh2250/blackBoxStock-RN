import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native'
import MainBackground from '../../CustomUI/MainBackground';
import TableViewFlatlist from '../../CustomUI/TableViewFlatlist';
import API_URL from '../../utils/ApiUrl';
import { addCommaRegx, heightScale, myFonts, widthScale } from '../../utils/Utils';
const signalR = require("@aspnet/signalr");
import colors from '../../res/colors';
import SelectedTabBar from '../../CustomUI/SelectedTabBar';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import images from '../../res/images/images';
import { useIsFocused } from '@react-navigation/native';
import { headerData, headerAlertWithTimeData, headerAlertWithVolatilityData, headerAlertWithPercentageData, alertStreamData } from '../../res/constants'
import strings from '../../res/strings'
import moment from 'moment';
import Loader from '../../CustomUI/Loader';
import { useNavigation } from '@react-navigation/core';
import CustomTabs from '../../CustomUI/CustomTabs';
import axios from 'axios';

const MyCustomComponent1 = (props) => {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    //  const marketData = useSelector(state => state.marketCategory.market_data);
    const [marketData, setMarketData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            setIsLoading(true)
        });
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {

        let interval;

        const hubUrl = API_URL.base_url + API_URL.pre_market_sscan;
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        let redArrow = images.redDown;
        let greenArrow = images.greenUp;
        let upDownIndicator;
        if (isFocused) {
            // dispatch(getMarketData(API_URL.base_url+API_URL.pre_market_sscan,API_URL.pre_market_scan_node,'PreMarket','',''));
            // let mainArray = [];
            // interval = setInterval(() => {
            //     console.log('on stop created')
            //     mainArray = getFakeArray(0, 40);
            //     console.log(mainArray, "on stop array pre");
            //     setMarketData([...mainArray])
            // }, 1000);
            connection.start({ withCredentials: true })
            connection.on(API_URL.pre_market_scan_node, function (response) {
                let mainArray = [];
                response.forEach((item, index) => {

                    if (item.CurrentPrice < item.ClosePrice) {
                        upDownIndicator = redArrow;
                    } else if (item.CurrentPrice > item.ClosePrice) {
                        upDownIndicator = greenArrow
                    }
                    let obj = {
                        'column1': item.Symbol,
                        'column2': upDownIndicator,
                        'column3': item.CurrentPrice ? "$" + item.CurrentPrice.toFixed(2) : '',
                        'column4': item.CurrentVolume ? addCommaRegx(item.CurrentVolume) : '',
                        'column5': item.PercentChange ? (item.PercentChange * 100).toFixed(2) + "%" : '',
                        'iconCol': 2
                    };
                    //  
                    mainArray.push(obj);
                    mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                });
                setMarketData([...mainArray], setIsLoading(false));
            });
        } else {
            connection.stop();
            console.log("on stop pre");

        }
        return () => {
            console.log("on stop cleanup");
            connection.stop();
            setMarketData([])
            //clearInterval(interval)
        }
    }, [isFocused])

    return (
        <MainBackground>
            <Loader isLoading={isLoading} />
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <TableViewFlatlist data={marketData} {...props} headerData={headerData} />
            </View>
        </MainBackground>
    )
}

const MyCustomComponent2 = (props) => {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    //    const marketData = useSelector(state => state.marketCategory.market_data);
    const [marketData, setMarketData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            setIsLoading(true)
        });
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {

        // if(isFocused){
        //     dispatch(getMarketData(API_URL.base_url+API_URL.post_market_sscan,API_URL.post_market_scan_node,'PostMarket',API_URL.base_url+API_URL.pre_market_sscan,API_URL.pre_market_scan_node))
        // }


        const hubUrl = API_URL.base_url + API_URL.market_scan;
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        let interval;
        let redArrow = images.redDown;
        let greenArrow = images.greenUp;
        let upDownIndicator;
        if (isFocused) {
            // dispatch(getMarketData(API_URL.base_url+API_URL.pre_market_sscan,API_URL.pre_market_scan_node,'PreMarket','',''));
            // let mainArray = [];
            // interval = setInterval(() => {
            //     console.log('on stop created')
            //     mainArray = getFakeArray(0, 40);
            //     console.log(mainArray, "on stop array post");
            //     setMarketData([...mainArray])
            // }, 500); 
            connection.start({ withCredentials: true })
            connection.on(API_URL.market_scan_node, function (response) {
                let mainArray = [];
                response.forEach((item, index) => {

                    if (item.CurrentPrice < item.ClosePrice) {
                        upDownIndicator = redArrow;
                    } else if (item.CurrentPrice > item.ClosePrice) {
                        upDownIndicator = greenArrow
                    }
                    let obj = {
                        'column1': item.Symbol,
                        'column2': upDownIndicator,
                        'column3': item.CurrentPrice ? "$" + item.CurrentPrice.toFixed(2) : '',
                        'column4': item.CurrentVolume ? addCommaRegx(item.CurrentVolume) : '',
                        'column5': item.PercentChange ? (item.PercentChange * 100).toFixed(2) + "%" : '',
                        'iconCol': 2
                    };
                    //  
                    mainArray.push(obj);
                    mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                });
                setMarketData([...mainArray], setIsLoading(false));
            });
        } else {
            connection.stop();
            console.log("on stop post");
            //  clearInterval(interval)
        }

        return () => {
            console.log("on stop cleanup post");
            connection.stop();
            setMarketData([])
            // clearInterval(interval)
        }

    }, [isFocused])

    return (
        <MainBackground>
            <Loader isLoading={isLoading} />
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <TableViewFlatlist data={marketData} {...props} headerData={headerData} />
            </View>
        </MainBackground>
    )
}


const MyCustomComponent3 = (props) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    //    const marketData = useSelector(state => state.marketCategory.market_data);
    const [marketData, setMarketData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            setIsLoading(true)
        });
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        const hubUrl = API_URL.base_url + API_URL.post_market_sscan;
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        let interval;
        let redArrow = images.redDown;
        let greenArrow = images.greenUp;
        let upDownIndicator;
        if (isFocused) {
            connection.start({ withCredentials: true })
            connection.on(API_URL.post_market_scan_node, function (response) {
                let mainArray = [];
                response.forEach((item, index) => {

                    if (item.CurrentPrice < item.ClosePrice) {
                        upDownIndicator = redArrow;
                    } else if (item.CurrentPrice > item.ClosePrice) {
                        upDownIndicator = greenArrow
                    }
                    let obj = {
                        'column1': item.Symbol,
                        'column2': upDownIndicator,
                        'column3': item.CurrentPrice ? "$" + item.CurrentPrice.toFixed(2) : '',
                        'column4': item.CurrentVolume ? addCommaRegx(item.CurrentVolume) : '',
                        'column5': item.PercentChange ? (item.PercentChange * 100).toFixed(2) + "%" : '',
                        'iconCol': 2
                    };
                    //  
                    mainArray.push(obj);
                    mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                });
                setMarketData([...mainArray], setIsLoading(false));
            });
        } else {
            connection.stop();
            console.log("on stop post");
            //  clearInterval(interval)
        }

        return () => {
            console.log("on stop cleanup post");
            connection.stop();
            setMarketData([])
            // clearInterval(interval)
        }

    }, [isFocused])

    return (
        <MainBackground>
            <Loader isLoading={isLoading} />
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <TableViewFlatlist data={marketData} {...props} headerData={headerData} />
            </View>
        </MainBackground>
    )
}

const MyCustomComponent4 = (props) => {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    //    const marketData = useSelector(state => state.marketCategory.market_data);
    const [marketData, setMarketData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            setIsLoading(true)
        });
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {

        const hubUrl = API_URL.base_url + API_URL.volume_list;
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        let interval;
        let redArrow = images.redDown;
        let greenArrow = images.greenUp;
        let upDownIndicator;
        if (isFocused) {

            connection.start({ withCredentials: true })
            connection.on(API_URL.volume_list_node, function (response) {
                let mainArray = [];
                response.forEach((item, index) => {

                    if (item.CurrentPrice < item.ClosePrice) {
                        upDownIndicator = redArrow;
                    } else if (item.CurrentPrice > item.ClosePrice) {
                        upDownIndicator = greenArrow
                    }
                    let obj = {
                        'column1': item.Symbol,
                        'column2': upDownIndicator,
                        'column3': item.CurrentPrice ? "$" + item.CurrentPrice.toFixed(2) : '',
                        'column4': item.CurrentVolume ? addCommaRegx(item.CurrentVolume) : '',
                        'column5': item.Ratio ? (item.Ratio).toFixed(2) + "%" : '',
                        'iconCol': 2
                    };

                    mainArray.push(obj);
                    mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                });
                setMarketData([...mainArray], setIsLoading(false));
            });
        } else {
            connection.stop();
            console.log("on stop post");
            //  clearInterval(interval)
        }

        return () => {
            console.log("on stop cleanup post");
            connection.stop();
            setMarketData([])
            // clearInterval(interval)
        }

    }, [isFocused])

    return (
        <MainBackground>
            <Loader isLoading={isLoading} />
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <TableViewFlatlist data={marketData} {...props} headerData={headerData} />
            </View>
        </MainBackground>
    )
}

const MyCustomComponent5 = (props) => {
    const isFocused = useIsFocused();
    const [marketData, setMarketData] = useState([])
    const [selectedTab, setSelectedTab] = useState(0);
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
        let interval;
        let redArrow = images.redDown;
        let greenArrow = images.greenUp;
        let upDownIndicator;
        if (isFocused) {
            connection.start({ withCredentials: true })
            connection.on(API_URL.alert_log_node, function (response) {
                let mainArray = [];
                const sortMainArray = selectedTab == 0 ? response.sort((a, b) => parseFloat(b.DateStamp) - parseFloat(a.DateStamp)) : selectedTab == 1 ?
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

                // var latency = ping();

                // if (latency > 500) {
                //     connection.start({ withCredentials: true })
                // }
                // connection.onreconnecting(function () {

                //     setTimeout(function () {
                //         connection.start({ withCredentials: true })
                //     }, 5000); // Restart connection after 5 seconds.
                // });
            });


        } else {
            connection.stop();
            setMarketData([])
            console.log("on stop post");
        }
        return () => {
            connection.stop();
            setMarketData([])
            // clearInterval(interval)
        }
    }, [isFocused, selectedTab])

    const onClickTabTab = (ids) => {
        setIsLoading(true);
        setMarketData([]);
        setSelectedTab(ids)

    }
    return (
        <MainBackground>
            <Loader isLoading={isLoading} />
            <SelectedTabBar onClickTabTab={onClickTabTab}
                firstTabText={strings.time} secondTabText={strings.volatility} thirdTabText={strings.percertage_change} isTabBarSelected={selectedTab} />
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <TableViewFlatlist data={marketData} {...props} headerData={selectedTab == 0 ? headerAlertWithTimeData :
                    selectedTab == 1 ? headerAlertWithVolatilityData : selectedTab == 2 ? headerAlertWithPercentageData : headerData} />
            </View>
        </MainBackground>
    )
}

const MyCustomComponent6 = (props) => {
    var isAlertStreamTabActive = true;
    var isAlertStreamFiltered = false;
    var alertStreamFilter = "";
    var asFilterAll = true;
    var asFilter52WeekHigh = false;
    var asFilter52WeekLow = false;
    var asFilterSpike = false;
    var asFilterHalts = false;
    var asFilterLowFloat = false;
    var asFilterBlock = false;
    var asFilterDateRange = false;
    var asFilterStartDate = '';
    var asFilterEndDate = '';
    const isFocused = useIsFocused();
    const [marketData, setMarketData] = useState([])
    const [initialData, setInitialData] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (props.route.params) {
            if (props.route.params.params?.indexValue) {
                let checkValue = props.route.params.params.indexValue
                var filter = 0x0000;
                if (props.route.params.params?.indexValue === 6) {

                    if (asFilterDateRange) {
                        filter |= 0x0040;
                        filter |= 0x0080;
                    }
                }
                if (asFilterBlock)
                    filter |= 0x0001;
                if (checkValue.includes(2))
                    filter |= 0x0002;
                if (checkValue.includes(31))
                    filter |= 0x0004;
                if (checkValue.includes(3))
                    filter |= 0x0008;
                if (checkValue.includes(4))
                    filter |= 0x0010;
                if (checkValue.includes(5))
                    filter |= 0x0020;
                if (asFilterDateRange)
                    filter |= 0x0080;
                let valueCheck = 0x0000
                let myArray = [...alertStreamFilters]
                let myValues = [...props.route.params.params?.indexValue]
                axios.get(API_URL.api_server + "/AlertStreamBySymbol/" + filter, {
                    'headers': { "ApiKey": API_URL.bbApiKey1 }
                },
                    {
                        'data': {
                            market: '',
                            AlertStreamFilter: filter,
                            AlertStreamStartDate: '',
                            AlertStreamEndDate: '',
                            format: "json"
                        }
                    })
                    .then(response => {

                        let mainArray = [];
                        response.data.forEach((item, index) => {
                            let color = item.messageType;
                            let obj = {
                                column1: moment(item.dateTime).format('h:mm:ss'),
                                column2: item.symbol,
                                column3: item.message,
                                column4: "$" + item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                                'color': color,
                            };

                            mainArray.push(obj);

                        });

                        setMarketData([...mainArray])
                        //  setInitialData(true)
                        setIsLoading(false);

                    })
                    .catch(error => {
                        console.log("response  error ", error.response);
                    })
            }
        }
        else {
            const hubUrl = API_URL.base_url + API_URL.alert_stream;
            let connection;
            connection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl)
                .build();
            if (isFocused && initialData) {
                connection.start({ withCredentials: true, transport: ['foreverFrame', 'serverSentEvents', 'longPolling'] }).catch(error => {

                })
                connection.on(API_URL.alert_stream_node, function (response) {
                    let mainArray = [];
                    let alertData = [...marketData];

                    response.forEach((item, index) => {
                        let color = item.MessageType;
                        let obj = {
                            column1: moment(item.DateTime).format('h:mm:ss'),
                            column2: item.Symbol,
                            column3: item.Message,
                            column4: "$" + item.Price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                            'color': color,
                        };

                        alertData.unshift(obj);
                    });
                    alertData.sort((a, b) => b.column1.localeCompare(a.column1));

                    setMarketData([...alertData])
                    setIsLoading(false);
                });
            } else {
                connection.stop();
            }

            return () => {

                connection.stop();
                setMarketData([])
            }
        }
    }, [isFocused, initialData])

    useEffect(() => {
        axios.get(API_URL.api_server1, {
            'headers': { "ApiKey": API_URL.bbApiKey1 }
        },
            {
                'data': {
                    market: 'Nasdaq',
                    AlertStreamFilter: '',
                    AlertStreamStartDate: '',
                    AlertStreamEndDate: '',
                    format: "json"
                }
            })
            .then(response => {
                console.log("checkkk", response)
                let mainArray = [];
                response.data.forEach((item, index) => {
                    let color = item.messageType;
                    let obj = {

                        column1: moment(item.dateTime).format('h:mm:ss'),
                        column2: item.symbol,
                        column3: item.message,
                        column4: "$" + item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                        'color': color,
                    };

                    mainArray.push(obj);

                });

                setMarketData([...mainArray])
                setInitialData(true)
                setIsLoading(false);
            })
            .catch(error => {
                console.log("response  error ", error.response);
            })

    }, [])


    return (

        <MainBackground>
            <View style={{ marginTop: heightScale(15), flex: 1 }}  >
                <TableViewFlatlist data={marketData} {...props} headerData={alertStreamData} />
            </View>
        </MainBackground>
    )
}

function MyTabBar({ state, descriptors, navigation, position, tabList, selectedIndex }) {

    return (
        <CustomTabs
            state={state}
            descriptors={descriptors}
            navigation={navigation}
            selectedIndex={selectedIndex}
            leftArrowIndex={2}
            rightArrowIndex={3}
        />

    );
}

const Category = props => {

    const marketData = useSelector(state => state.marketCategory.market_data);
    const alertLogData = useSelector(state => state.marketCategory.alertLogData);
    const dispatch = useDispatch();
    const Tab = createMaterialTopTabNavigator();

    const [currentTabName, setCurrentTabName] = useState('Alert Stream');



    useEffect(() => {
        props.navigation.setParams({ showFilter: currentTabName });
    }, [currentTabName]);


    const [data, setData] = useState([
        {
            id: 1,
            tabname: 'PreMarket',
            selected: false,
            apiEndPoints: API_URL.pre_market_sscan,
            node: API_URL.pre_market_scan_node
        },
        {
            id: 2,
            tabname: 'Market Scan',
            selected: false,
            apiEndPoints: API_URL.market_scan,
            node: API_URL.market_scan_node
        },
        {
            id: 3,
            tabname: 'PostMarket',
            selected: false,
            apiEndPoints: API_URL.post_market_sscan,
            node: API_URL.post_market_scan_node
        },
        {
            id: 4,
            tabname: 'Volume Ratio',
            selected: false,
            apiEndPoints: API_URL.volume_list,
            node: API_URL.volume_list_node
        },
        {
            id: 5,
            tabname: 'Alert Log',
            selected: false,
            apiEndPoints: API_URL.alert_log,
            node: API_URL.alert_log_node
        },
        {
            id: 6,
            tabname: 'Alert Stream',
            selected: false,
            apiEndPoints: API_URL.alert_stream,
            node: API_URL.alert_stream_node
        }
    ]);

    let index = props.route.params.index
    useEffect(() => {
        props.navigation.setOptions({
            title: props.route.params.name,
        });
    }, [])

    return (
        <MainBackground>
            {data.length > 0
                ?

                <Tab.Navigator
                    tabBarOptions={{
                        scrollEnabled: true,
                        allowFontScaling: true,

                    }}
                    sceneContainerStyle={{ backgroundColor: colors.APP_THEME }}
                    initialRouteName={props.route.params.name}
                    backBehavior={'none'}
                    swipeEnabled={false}
                    tabBar={props => <MyTabBar {...props} selectedIndex={index} />}
                >

                    <Tab.Screen
                        name={'PreMarket'}
                        component={MyCustomComponent1}
                        initialParams={{ tabname: 'PreMarket', headerData: headerData }}
                    />
                    <Tab.Screen
                        name={'MarketScan'}
                        component={MyCustomComponent2}
                        initialParams={{ tabname: 'MarketScan', headerData: headerData }}
                    />
                    <Tab.Screen
                        name={'PostMarket'}
                        component={MyCustomComponent3}
                        initialParams={{ tabname: 'PostMarket' }}
                    />

                    <Tab.Screen
                        name={'Volume Ratio'}
                        component={MyCustomComponent4}
                        initialParams={{ tabname: 'Volume Ratio' }}
                    />

                    <Tab.Screen
                        name={'Alert Log'}
                        component={MyCustomComponent5}
                        initialParams={{ tabname: 'Alert Log' }}
                    />

                    <Tab.Screen
                        name={'Alert Stream'}
                        component={MyCustomComponent6}
                        initialParams={{ tabname: 'Alert Stream' }}
                    />
                </Tab.Navigator>


                :
                null
            }
        </MainBackground>





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
        backgroundColor: '#202020',
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
        backgroundColor: '#202020',
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
        backgroundColor: '#202020',
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
    }
});
export default Category
