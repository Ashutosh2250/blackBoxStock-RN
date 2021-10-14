import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import MainBackground from '../../CustomUI/MainBackground';
import TableViewFlatlist from '../../CustomUI/TableViewFlatlist';
import API_URL from '../../utils/ApiUrl';
import { heightScale, myFonts, widthScale } from '../../utils/Utils';
const signalR = require("@aspnet/signalr");
import colors from '../../res/colors';
import CustomSegmentControlTab from '../../CustomUI/CustomSegmentControlTabs';
import SelectedTabBar from '../../CustomUI/SelectedTabBar';
import ListSelectedTabbar from '../../CustomUI/ListSelectedTabBar';
import { useDispatch, useSelector } from 'react-redux';
import { emptyMarketData, getMarketData } from '../../redux/actions/MarketCategoryActions';
import singleton from '../../utils/SignalRSingleton';

const Category = props => {

    const marketData = useSelector(state => state.marketCategory.market_data);
    const alertLogData = useSelector(state => state.marketCategory.alertLogData);
    const dispatch = useDispatch();
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
    const headerData = [
        {
            id: 1,
            tabname: 'SYMBOL'
        },
        {
            id: 2,
            tabname: 'ICON'
        },
        {
            id: 3,
            tabname: 'PRICE'
        },
        {
            id: 4,
            tabname: 'VOLUME'
        },
        {
            id: 5,
            tabname: '%'
        }
    ];
    const headerAlertWithTimeData = [
        {
            id: 1,
            tabname: 'SYMBOL'
        },
        {
            id: 2,
            tabname: 'ICON'
        },
        {
            id: 3,
            tabname: 'PRICE'
        },
        {
            id: 4,
            tabname: 'TIME'
        }
    ];
    const headerAlertWithVolatilityData = [
        {
            id: 1,
            tabname: 'TIME'
        },
        {
            id: 2,
            tabname: 'SYMBOL'
        },
        {
            id: 3,
            tabname: 'ICON'
        },
        {
            id: 4,
            tabname: 'VOLATILITY'
        }
    ];
    const headerAlertWithPercentageData = [
        {
            id: 1,
            tabname: 'TIME'
        },
        {
            id: 2,
            tabname: 'SYMBOL'
        },
        {
            id: 3,
            tabname: 'ICON'
        },
        {
            id: 4,
            tabname: 'PRICE'
        }
    ]


    const [id, setId] = useState(props.route.params.index);
    const [selectedTab, setSelectedTab] = useState(0)
    useEffect(() => {

        //setId(props.route.params.index)
        console.log("props.navigation.route.params", props.route.params.index, id)
        let allData = [...data];
        let selectedElement;
        let lastSelectedIndex = -1;
        let gotSelected = false;
        allData.forEach((element, index) => {
            console.log(element.id == props.route.params.index, element.id, props.route.params.index, id, "useEffect");
            if (element.selected && !gotSelected) {

                lastSelectedIndex = index;
                gotSelected = true;
                console.log("element", lastSelectedIndex, lastSelectedIndex)
            }
            if ((id == 0 && element.id == props.route.params.index) || (id !== 0 && element.id == id)) {
                element.selected = true;
                selectedElement = element;
            } else {
                element.selected = false;
            }

        });
        setData([...allData]);
        if (lastSelectedIndex !== -1) {
            let lastSelected = allData[lastSelectedIndex];
            //singleton.stopSignalRConnection(lastSelected.apiEndPoints,lastSelected.node);
            dispatch(getMarketData(API_URL.base_url + selectedElement.apiEndPoints, selectedElement.node, selectedElement.tabname, API_URL.base_url + lastSelected.apiEndPoints, lastSelected.node))
        } else {
            dispatch(getMarketData(API_URL.base_url + selectedElement.apiEndPoints, selectedElement.node, selectedElement.tabname, '', ''))
        }




    }, [id]);
    const onClickTabTab = (ids) => {
        setSelectedTab(ids)
    }
    return (
        <MainBackground>
            <View style={{ paddingLeft: widthScale(10), marginVertical: heightScale(15), paddingRight: widthScale(10) }}>
                <ListSelectedTabbar tabList={data}
                    selectedIndex={props.route.params.index}
                    setSelectedIndex={(id) => {

                        setId(id);
                        dispatch(emptyMarketData())
                    }}
                />
            </View>
            {id == 5 ? <SelectedTabBar onClickTabTab={onClickTabTab} isTabBarSelected={selectedTab}
                firstTabText={"Time"} secondTabText={"Volatility"} thirdTabText={"%Change"} /> : null}
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <TableViewFlatlist data={marketData} headerData={id == 5 && selectedTab == 0 ? headerAlertWithTimeData :
                    id == 5 && selectedTab == 1 ? headerAlertWithVolatilityData : id == 5 && selectedTab == 2 ? headerAlertWithPercentageData : headerData} />
            </View>
        </MainBackground>

    )
}
const styles = StyleSheet.create({

});
export default Category


// const isFocused = useIsFocused();
// const [marketData, setMarketData] = useState([])
// const [selectedTab, setSelectedTab] = useState(0);
// const [isLoading, setIsLoading] = useState(true)
// const navigation = useNavigation();
// useEffect(() => {
//     const unsubscribe = navigation.addListener('tabPress', (e) => {
//         setIsLoading(true)
//     });
//     return unsubscribe;
// }, [navigation]);
// useEffect(() => {
//     const hubUrl = API_URL.base_url + API_URL.alert_log;
//     let connection;
//     connection = new signalR.HubConnectionBuilder()
//         .withUrl(hubUrl)
//         .build();
//     let interval;
//     let redArrow = images.redDown;
//     let greenArrow = images.greenUp;
//     let upDownIndicator;
//     if (isFocused) {
//         connection.start({ withCredentials: true })
//         connection.on(API_URL.alert_log_node, function (response) {
//             let mainArray = [];
//             const sortMainArray = selectedTab == 0 ? response.sort((a, b) => parseFloat(b.DateStamp) - parseFloat(a.DateStamp)) : selectedTab == 1 ?
//                 response.sort((a, b) => parseFloat(b.L2Total) - parseFloat(a.L2Total)) :
//                 response.sort((a, b) => ((b.CurrentPrice - b.Price) / b.Price) - ((a.CurrentPrice - a.Price) / a.Price));
//             sortMainArray.forEach((item, index) => {
//                 let volatilityValue = item.L2Total.toFixed(2) == 0.00 ? Math.abs(item.L2Total).toFixed(2) : item.L2Total.toFixed(2)
//                 let color = item.MessageType;
//                 let obj;
//                 if (selectedTab == 0) {
//                     if (item.Price < item.CurrentPrice) {
//                         upDownIndicator = greenArrow;
//                     } else if (item.Price > item.CurrentPrice) {
//                         upDownIndicator = redArrow
//                     }
//                     obj = {
//                         'column3': upDownIndicator,
//                         'column2': item.Symbol,
//                         'column4': item.CurrentPrice ? "$" + item.CurrentPrice.toFixed(2) : '',
//                         'column1': item.DateStamp ? moment(item.DateStamp).format('LTS').replace(/PM|AM/gi, "") : '',
//                         'color': color,
//                         'iconCol': 3
//                     };
//                 } else if (selectedTab == 1) {
//                     if (item.Price < item.CurrentPrice) {
//                         upDownIndicator = greenArrow;
//                     } else if (item.Price > item.CurrentPrice) {
//                         upDownIndicator = redArrow
//                     }
//                     obj = {
//                         'column3': upDownIndicator,
//                         'column2': item.Symbol,
//                         'column4': volatilityValue,
//                         'column1': item.DateStamp ? moment(item.DateStamp).format('LTS').replace(/PM|AM/gi, "") : '',
//                         'iconCol': 3
//                     };
//                 } else if (selectedTab == 2) {
//                     if (item.Price < item.CurrentPrice) {
//                         upDownIndicator = greenArrow;
//                     } else if (item.Price > item.CurrentPrice) {
//                         upDownIndicator = redArrow
//                     }
//                     obj = {
//                         'column3': upDownIndicator,
//                         'column2': item.Symbol,
//                         'column4': "$" + item.Price.toFixed(2),
//                         'column1': item.DateStamp ? moment(item.DateStamp).format('LTS').replace(/PM|AM/gi, "") : '',
//                         'color': color,
//                         'iconCol': 3
//                     };
//                 }

//                 mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
//                 mainArray.push(obj);
//             });
//             setMarketData([...mainArray], setIsLoading(false));

//             // var latency = ping();

//             // if (latency > 500) {
//             //     connection.start({ withCredentials: true })
//             // }
//             // connection.onreconnecting(function () {

//             //     setTimeout(function () {
//             //         connection.start({ withCredentials: true })
//             //     }, 5000); // Restart connection after 5 seconds.
//             // });
//         });


//     } else {
//         connection.stop();
//         console.log("on stop post");
//     }
//     return () => {
//         connection.stop();
//         setMarketData([])
//         // clearInterval(interval)
//     }
// }, [isFocused, selectedTab, isLoading])

// const onClickTabTab = (ids) => {
//     setIsLoading(true);
//     setMarketData([]);
//     setSelectedTab(ids)

// }
// return (
//     <MainBackground>
//         <Loader isLoading={isLoading} />
//         <SelectedTabBar onClickTabTab={onClickTabTab}
//             firstTabText={strings.time} secondTabText={strings.volatility} thirdTabText={strings.percertage_change} isTabBarSelected={selectedTab} />
//         <View style={{ marginTop: heightScale(15), flex: 1 }}>
//             <TableViewFlatlist data={marketData} headerData={selectedTab == 0 ? headerAlertWithTimeData :
//                 selectedTab == 1 ? headerAlertWithVolatilityData : selectedTab == 2 ? headerAlertWithPercentageData : headerData} />
//         </View>
//     </MainBackground>
// )