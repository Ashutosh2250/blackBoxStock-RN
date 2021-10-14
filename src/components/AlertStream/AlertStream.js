import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native'
import MainBackground from '../../CustomUI/MainBackground';
import TableViewFlatlist from '../../CustomUI/TableViewFlatlist';
import API_URL from '../../utils/ApiUrl';
import { addCommaRegx, heightScale, myFonts, widthScale } from '../../utils/Utils';
const signalR = require("@aspnet/signalr");
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { alertStreamData, alertStreamFilters } from '../../res/constants';
import CustomHeaderText from '../../CustomUI/CustomHeaderText';
import axios from 'axios';
import Loader from '../../CustomUI/Loader';
import { saveSelectedSymbol } from '../../redux/actions/MarketCategoryActions';
import { useDispatch, useSelector } from 'react-redux';

const AlertStream = (props) => {
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
    const [isLoading, setIsLoading] = useState(true);
    const [marketData, setMarketData] = useState([])
    const [marketData1, setMarketData1] = useState([])
    const [initialData, setInitialData] = useState(false)
    const selectedSym = useSelector(state => state.marketCategory.selectedSymbol);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.route.params) {
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
                            column4: item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                            'color': color,
                        };

                        mainArray.push(obj);

                    });

                    setMarketData([...mainArray], setIsLoading(false))
                    //  setInitialData(true)





                })
                .catch(error => {
                    console.log("response  error ", error.response);
                })

        }
        else {
            const hubUrl = API_URL.base_url + API_URL.alert_stream;
            let connection;
            let a = [];
            connection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl)
                .build();

            if (isFocused && initialData == true) {
                if (a.length < 0) {
                    setIsLoading(true)
                }
                connection.start({ withCredentials: true, transport: ['foreverFrame', 'serverSentEvents', 'longPolling'] }).then((ref) => {
                    if (ref == undefined) {
                        setMarketData([...marketData1])

                    }

                })
                    .catch(error => {
                        console.log("checkerror", error)
                    })
                connection.on(API_URL.alert_stream_node, function (response) {

                    for (let i = 0; i <= response.length - 1; i++) {
                        a.push(response[i])
                    }

                    let mainArray = [];

                    a.forEach((item, index) => {
                        let color = item.MessageType;
                        let obj = {
                            column1: moment(item.DateTime).format('h:mm:ss'),
                            column2: item.Symbol,
                            column3: item.Message,
                            column4: item.Price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                            'color': color,
                        };
                        mainArray.push(obj);

                    });
                    let alertData = [...marketData1, ...mainArray];

                    alertData.sort((a, b) => b.column1.localeCompare(a.column1));
                    setMarketData([...alertData])
                    if (alertData.length > 0) {
                        setIsLoading(false);

                    }

                });


            } else {

                // connection.stop();

            }


            setTimeout(() => {
                setIsLoading(false);
            }, 10000)



            return () => {

                //  connection.stop();
                //setMarketData([])
            }
        }
    }, [isFocused && initialData == true])


    useEffect(() => {
        if (isFocused) {
            axios.get(API_URL.api_server1, {
                'headers': { "ApiKey": API_URL.bbApiKey1 }
            },
                {
                    'data': {
                        market: 'Nasdaq',
                        AlertStreamFilter: 0,
                        AlertStreamStartDate: '',
                        AlertStreamEndDate: '',
                        format: "json"
                    }
                })
                .then(response => {
                    console.log("checkdata", response)
                    let mainArray = [];
                    response.data.forEach((item, index) => {
                        let color = item.messageType;
                        let obj = {
                            column1: moment(item.dateTime).format('h:mm:ss'),
                            column2: item.symbol,
                            column3: item.message,
                            column4: item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                            'color': color,
                        };

                        mainArray.push(obj);

                    });
                    let abc = mainArray.slice(0, 50)

                    setMarketData1([...abc])

                    //const result = data.filter(word => word.column2 == "ASIX");

                    setInitialData(true)

                })
                .catch(error => {
                    console.log("response  error ", error.response);
                })
        }

    }, [isFocused])

    return (
        <MainBackground>
            <CustomHeaderText showFilterIcon={"Alert Stream"} showSearch={true} {...props} label="Alert Stream" />
            <Loader isLoading={isLoading} />
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <TableViewFlatlist data={marketData ? marketData : marketData1} {...props} headerData={alertStreamData} />
            </View>
        </MainBackground>

    )
}
const getFilterValue = () => {
    var filter = 0x0000;
    if (asFilterAll) {
        if (asFilterDateRange) {
            filter |= 0x0040;
            filter |= 0x0080;
        }
    }
    else {
        if (asFilterBlock)
            filter |= 0x0001;
        if (asFilter52WeekHigh)
            filter |= 0x0002;
        if (asFilter52WeekLow)
            filter |= 0x0004;
        if (asFilterSpike)
            filter |= 0x0008;
        if (asFilterHalts)
            filter |= 0x0010;
        if (asFilterLowFloat)
            filter |= 0x0020;
        if (asFilterDateRange)
            filter |= 0x0080;
    }
    return filter;
}


export default AlertStream
