import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomTabs from '../../CustomUI/CustomTabs';
import MainBackground from '../../CustomUI/MainBackground';
import colors from '../../res/colors';
import API_URL from '../../utils/ApiUrl';
import { getFakeArray, heightScale, widthScale } from '../../utils/Utils';
import { flowHeaderData, alertHeaderData, volumeHeaderData, olHeaderData, mapHeaderData, callAdPutsHeaderData, bullHeaderData, bearHeaderData, FlowFirstFilterOptions } from '../../res/constants'
import OptionTable from '../../CustomUI/OptionsTable';
const signalR = require("@aspnet/signalr");
import moment from 'moment';
import Loader from '../../CustomUI/Loader';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
var optionsDiscoExpected = false;
var optionsConnection, optionsHub;
var alertMax = 300;
var alertMaxPerSymbol = 1000;
var optionsFilterSymbol = "";
var optionsFilterPuts = true;
var optionsFilterCalls = true;
var optionsFilterYellow = true;
var optionsFilterWhite = true;
var optionsFilterMagenta = true;
var optionsFilterOnlyAboveAsk = true;
var optionsFilterOnlyBelowBid = false;
var optionsFilterOnlyAtAsk = true;
var optionsFilterOnlyAtBid = false;
var optionsFilterMultileg = false;
var optionsFilterCallsTop = true;
var optionsFilterCallsBottom = false;
var optionsFilterPutsTop = false;
var optionsFilterPutsBottom = false;
var optionsHistoric = false;
var optionsFromDate = "";
var optionsToDate = "";
var optionsVolume = false;
var optionsOI = false;
var optionOIData = null;
var optionsHeat = false;
var optionsRefreshTimer = null;
var optionsTopGainers = false;
var bContractFilter = false;
var szContractDate = "";
var szContractStrike = "";
var szContractCallPut = "";
var optionsFilterBelowPoint5 = false;
var optionsFilterBelow5 = false;

var optionsFilterAbove100K = false;
var optionsFilterAbove200K = false;
var optionsFilterAbove500K = false;
var optionsFilterEqualsSweep = false;
var optionsFilter100Contracts = false;
var optionsFilter500Contracts = false;
var optionsFilter5000Contracts = false;
var optionsFilter750BMarketCap = false;
var optionsFilterWeeklyOnly = false;
var optionsFilterEarningsReportOnly = false;
var optionsFilterStock = true;
var optionsFilterEtf = false;
var optionsFilterUnusualOnly = false;

var optionsFilterConsumerDiscretionary = true;
var optionsFilterIndustrials = true;
var optionsFilterInformationTechnology = true;
var optionsFilterRealEstate = true;
var optionsFilterHealthCare = true;
var optionsFilterEnergy = true;
var optionsFilterFinancials = true;
var optionsFilterMaterials = true;
var optionsFilterConsumerStaples = true;
var optionsFilterCommunicationServices = true;
var optionsFilterUtilities = true;
var optionsFilterSectorNone = true;
var optionsAlertFilterSortGainers = true;
var optionsAlertFilterSortTime = false;
var optionsFilterExpirationRange = false;


const FlowComponent = (props) => {


    var filter = 0;
    if (optionsFilterCalls)
        filter |= 0x0001; // OPTIONFILTER_CALLS
    if (optionsFilterPuts)
        filter |= 0x0002; // OPTIONFILTER_PUTS
    if (optionsFilterYellow)
        filter |= 0x0004; // OPTIONFILTER_YELLOW
    if (optionsFilterWhite)
        filter |= 0x0008; // OPTIONFILTER_WHITE
    if (optionsFilterMagenta)
        filter |= 0x0010; // OPTIONFILTER_MAGENTA
    if (optionsFilterOnlyAboveAsk)
        filter |= 0x0020; // OPTIONFILTER_ONLYABOVEASK
    if (optionsFilterOnlyBelowBid)
        filter |= 0x0040; // OPTIONFILTER_ONLYBELOWBID
    if (optionsFilterMultileg)
        filter |= 0x0080; // OPTIONFILTER_MULTILEG
    if (optionsFilterOnlyAtAsk)
        filter |= 0x0100; // OPTIONFILTER_ONLYATASK
    if (optionsFilterOnlyAtBid)
        filter |= 0x0200; // OPTIONFILTER_ONLYATBID
    if (optionsFilterBelowPoint5)
        filter |= 0x0400; // OPTIONFILTER_BELOWPOINT5
    if (optionsFilterBelow5)
        filter |= 0x0800; // OPTIONFILTER_BELOW5
    if (optionsFilterAbove500K)
        filter |= 0x1000; // OPTIONFILTER_ABOVE500K
    if (optionsFilterEqualsSweep)
        filter |= 0x2000; // OPTIONFILTER_SWEEPONLY
    if (optionsFilter100Contracts)
        filter |= 0x4000; // OPTIONFILTER_CONTRACTS100
    if (optionsFilter500Contracts)
        filter |= 0x8000; // OPTIONFILTER_CONTRACTS500
    var filter2 = 0;
    if (optionsFilterWeeklyOnly)
        filter2 |= 0x0001; // OPTIONFILTER_WEEKLYONLY
    if (optionsFilterEarningsReportOnly)
        filter2 |= 0x0002; // OPTIONFILTER_EARNINGSREPORTONLY
    if (optionsFilterStock)
        filter2 |= 0x0004; // OPTIONFILTER_STOCK
    if (optionsFilterEtf)
        filter2 |= 0x0008; // OPTIONFILTER_ETF
    if (optionsFilterUnusualOnly)
        filter2 |= 0x0010; // OPTIONFILTER_UNUSUALONLY
    if (optionsFilterExpirationRange)
        filter2 |= 0x0020; // OPTIONFILTER_UNUSUALONLY
    if (optionsFilterAbove100K)
        filter2 |= 0x0040; // OPTIONFILTER_ABOVE100K
    if (optionsFilterAbove200K)
        filter2 |= 0x0080; // OPTIONFILTER_ABOVE200K
    if (optionsFilter5000Contracts) {
        filter2 |= 0x0100;
    }
    if (optionsFilter750BMarketCap) {
        filter2 |= 0x0200;
    }
    var filterSector = 0;
    if (optionsFilterConsumerDiscretionary)
        filterSector |= 0x0001; // OPTIONFILTER_CONSUMER_DISCRETIONARY
    if (optionsFilterIndustrials)
        filterSector |= 0x0002; // OPTIONFILTER_INDUSTRIALS
    if (optionsFilterInformationTechnology)
        filterSector |= 0x0004; // OPTIONFILTER_INFORMATION_TECHNOLOGY
    if (optionsFilterRealEstate)
        filterSector |= 0x0008; // OPTIONFILTER_REAL_ESTATE
    if (optionsFilterHealthCare)
        filterSector |= 0x0010; // OPTIONFILTER_HEALTHCARE
    if (optionsFilterEnergy)
        filterSector |= 0x0020; // OPTIONFILTER_ENERGY
    if (optionsFilterFinancials)
        filterSector |= 0x0040; // OPTIONFILTER_FINANCIALS
    if (optionsFilterMaterials)
        filterSector |= 0x0080; // OPTIONFILTER_MATERIALS
    if (optionsFilterConsumerStaples)
        filterSector |= 0x0100; // OPTIONFILTER_CONSUMER_STAPLES
    if (optionsFilterCommunicationServices)
        filterSector |= 0x0200; // OPTIONFILTER_COMMUNICATION_SERVICES
    if (optionsFilterUtilities)
        filterSector |= 0x0400; // OPTIONFILTER_UTILITIES
    if (optionsFilterSectorNone)
        filterSector |= 0x0800; // OPTIONFILTER_NONE




    function strEndsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    var expStartDate = "26/07/2021";
    var expEndDate = "26/07/2021";

    const [marketData, setMarketData] = useState([])
    const [marketData2, setMarketData2] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const selectedSymbol = useSelector(state => state.marketCategory.selectedSymbol);
    const hubUrl = API_URL.base_url + API_URL.options;
    let connection;


    useEffect(() => {
        if (!marketData.length > 0) {
            setIsLoading(true)
        }
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        connection.start({ withCredentials: true })
            .then(() => connection.invoke('GetOptionsTodayNew3', optionsFilterSymbol, alertMax, filter, filter2, filterSector, expStartDate, expEndDate))
            .catch(erro => {
                console.log("error", erro)
            })
        connection.on('GetOptionsToday', function (t) {

            let options = [...t.OptionAlerts];

            let mainArray = []

            if ((options != null) && (options.length > 0)) {
                var count = options.length;
                if (optionsFilterSymbol !== "") {
                    if (count > alertMaxPerSymbol)
                        count = alertMaxPerSymbol;
                }
                else {
                    if (count > alertMax)
                        count = alertMax;
                }
                for (var i = options.length - 1, j = 0; j < count; i--, j++) {


                    var obj = getAlertTableRow(options[i]);
                    if (obj !== null) {
                        mainArray.push(obj);
                        //setIsLoading(false)
                        // mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                    }

                }
                if (mainArray.length > 0) {
                    setIsLoading(false)
                }
                mainArray.sort((a, b) => b.column1.localeCompare(a.column1));
                setMarketData(([...mainArray]));


            }
            else {
                //setIsLoading(false)
                setMarketData([]);
            }
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        });

    }, []),
        useEffect(() => {
            if (props.route.params?.indexValue) {
                if (!marketData.length > 0) {
                    setIsLoading(true)
                }
                let selectedIndex = props.route.params?.indexValue;

                var filter = 0;
                if (selectedIndex.includes(2)) {
                    optionsFilterCalls = true;
                    filter |= 0x0001; // OPTIONFILTER_CALLS
                }

                if (selectedIndex.includes(1)) {
                    optionsFilterPuts = true;
                    filter |= 0x0002; // OPTIONFILTER_PUTS
                }

                if (selectedIndex.includes(3)) {
                    filter |= 0x0004; // OPTIONFILTER_YELLOW
                    optionsFilterYellow = true;
                }

                if (selectedIndex.includes(5)) {
                    filter |= 0x0008; // OPTIONFILTER_WHITE
                    optionsFilterWhite = true;
                }

                if (selectedIndex.includes(4)) {
                    filter |= 0x0010; // OPTIONFILTER_MAGENTA
                    optionsFilterMagenta = true;
                }

                if (selectedIndex.includes(7)) {
                    filter |= 0x0020; // OPTIONFILTER_ONLYABOVEASK
                    optionsFilterOnlyAboveAsk = true;
                }

                if (selectedIndex.includes(8)) {
                    filter |= 0x0040; // OPTIONFILTER_ONLYBELOWBID
                    optionsFilterOnlyBelowBid = true;
                }

                if (selectedIndex.includes(6)) {
                    filter |= 0x0080; // OPTIONFILTER_MULTILEG
                    optionsFilterMultileg = true;
                }

                if (optionsFilterOnlyAtAsk) {
                    filter |= 0x0100; // OPTIONFILTER_ONLYATASK
                    optionsFilterOnlyAtAsk = true;
                }

                if (optionsFilterOnlyAtBid) {
                    filter |= 0x0200; // OPTIONFILTER_ONLYATBID
                    optionsFilterOnlyAtBid = true;
                }

                if (selectedIndex.includes(9)) {
                    filter |= 0x0400; // OPTIONFILTER_BELOWPOINT5
                    optionsFilterBelowPoint5 = true;
                }

                if (selectedIndex.includes(10)) {
                    filter |= 0x0800; // OPTIONFILTER_BELOW5
                    optionsFilterBelow5 = true;
                }

                if (selectedIndex.includes(13)) {
                    filter |= 0x1000; // OPTIONFILTER_ABOVE500K
                    optionsFilterAbove500K = true;
                }

                if (selectedIndex.includes(15)) {
                    filter |= 0x2000; // OPTIONFILTER_SWEEPONLY
                    optionsFilterEqualsSweep = true;
                }

                if (selectedIndex.includes(16)) {
                    filter |= 0x4000; // OPTIONFILTER_CONTRACTS100
                    optionsFilter100Contracts = true;
                }

                if (selectedIndex.includes(17)) {
                    filter |= 0x8000; // OPTIONFILTER_CONTRACTS500
                    optionsFilter500Contracts = true;
                }

                var filter2 = 0;
                if (true) {
                    filter2 |= 0x0001; // OPTIONFILTER_WEEKLYONLY
                    optionsFilterWeeklyOnly = true;
                }

                if (selectedIndex.includes(20)) {
                    filter2 |= 0x0002; // OPTIONFILTER_EARNINGSREPORTONLY
                    optionsFilterEarningsReportOnly = true;
                }

                if (optionsFilterStock) {
                    filter2 |= 0x0004; // OPTIONFILTER_STOCK
                    optionsFilterStock = true
                }

                if (optionsFilterEtf)
                    filter2 |= 0x0008; // OPTIONFILTER_ETF
                if (optionsFilterUnusualOnly)
                    filter2 |= 0x0010; // OPTIONFILTER_UNUSUALONLY
                if (optionsFilterExpirationRange)
                    filter2 |= 0x0020; // OPTIONFILTER_UNUSUALONLY
                if (selectedIndex.includes(11)) {
                    filter2 |= 0x0040; // OPTIONFILTER_ABOVE100K
                    optionsFilterAbove100K = true;
                }

                if (selectedIndex.includes(12)) {
                    filter2 |= 0x0080; // OPTIONFILTER_ABOVE200K
                    optionsFilterAbove200K = true;
                }

                if (selectedIndex.includes(17)) {
                    filter2 |= 0x0100;
                    optionsFilter5000Contracts = true;

                }
                if (selectedIndex.includes(14)) {
                    filter2 |= 0x0200;
                    optionsFilter750BMarketCap = true;
                }
                var filterSector = 0;
                if (selectedIndex.includes(22)) {
                    optionsFilterConsumerDiscretionary = true;
                    filterSector |= 0x0001; // OPTIONFILTER_CONSUMER_DISCRETIONARY
                }

                if (selectedIndex.includes(23)) {
                    filterSector |= 0x0002; // OPTIONFILTER_INDUSTRIALS
                    optionsFilterIndustrials = true;
                }

                if (selectedIndex.includes(24)) {
                    filterSector |= 0x0004; // OPTIONFILTER_INFORMATION_TECHNOLOGY
                    optionsFilterInformationTechnology = true;
                }

                if (selectedIndex.includes(25)) {
                    filterSector |= 0x0008; // OPTIONFILTER_REAL_ESTATE
                    optionsFilterRealEstate = true;
                }

                if (selectedIndex.includes(26)) {
                    filterSector |= 0x0010; // OPTIONFILTER_HEALTHCARE
                    optionsFilterHealthCare = true;
                }

                if (selectedIndex.includes(27)) {
                    filterSector |= 0x0020; // OPTIONFILTER_ENERGY
                    optionsFilterEnergy = true;
                }

                if (selectedIndex.includes(28)) {
                    filterSector |= 0x0040; // OPTIONFILTER_FINANCIALS
                    optionsFilterFinancials = true;
                }

                if (selectedIndex.includes(30)) {
                    filterSector |= 0x0080; // OPTIONFILTER_MATERIALS
                    optionsFilterMaterials = true;
                }

                if (selectedIndex.includes(29)) {
                    filterSector |= 0x0100; // OPTIONFILTER_CONSUMER_STAPLES
                    optionsFilterConsumerStaples = true;
                }

                if (selectedIndex.includes(31)) {
                    filterSector |= 0x0200; // OPTIONFILTER_COMMUNICATION_SERVICES
                    optionsFilterCommunicationServices = true;
                }

                if (selectedIndex.includes(32)) {
                    filterSector |= 0x0400; // OPTIONFILTER_UTILITIES
                    optionsFilterUtilities = true;
                }

                if (optionsFilterSectorNone) {
                    filterSector |= 0x0800; // OPTIONFILTER_NONE
                    optionsFilterSectorNone = true;
                }


                connection = new signalR.HubConnectionBuilder()
                    .withUrl(hubUrl)
                    .build();
                connection.start({ withCredentials: true })
                    .then(() => connection.invoke('GetOptionsTodayNew3', optionsFilterSymbol, alertMax, filter, filter2, filterSector, expStartDate, expEndDate))
                    .catch(erro => {
                        console.log("error", erro)
                    })
                connection.on('GetOptionsToday', function (t) {

                    let data = [];
                    let options = [...t.OptionAlerts];

                    let mainArray = []

                    const check = options.sort((a, b) => a.CreatedDate - b.CreatedDate)
                    if ((check != null) && (check.length > 0)) {
                        var count = check.length;
                        if (optionsFilterSymbol !== "") {
                            if (count > alertMaxPerSymbol)
                                count = alertMaxPerSymbol;
                        }
                        else {
                            if (count > alertMax)
                                count = alertMax;
                        }
                        for (var i = check.length - 1, j = 0; j < count; i--, j++) {
                            var obj = getAlertTableRow(check[i]);
                            if (obj !== null) {
                                mainArray.push(obj);
                                // mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                            }
                        }

                        if (mainArray.length > 0) {
                            setIsLoading(false)
                        }
                        //  mainArray.sort((a, b) => a.column1.localeCompare(b.column1));

                        setMarketData2(([...mainArray]));

                    }
                    else {
                        //setIsLoading(false)
                        setMarketData2(([]));
                    }


                });
                setTimeout(() => {
                    setIsLoading(false)
                }, 3000)

            }

        }, [props.route.params?.indexValue])
    return (
        <MainBackground>
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <Loader isLoading={isLoading} />
                <OptionTable headerData={flowHeaderData} isFlow={true} data={(props.route.params?.indexValue) ? marketData2 : marketData} />
            </View>
        </MainBackground>

    )
}

const getAlertTableRow = (element) => {
    let obj = null;
    try {
        // if (bContractFilter) {
        //     if (expDate != szContractDate || rd.CallPut != szContractCallPut || rd.Strike != szContractStrike)
        //         return strRow;
        // }
        if (optionsFilterEqualsSweep) {
            if (element.Type != "SWEEP")
                return obj;
        }
        if (optionsFilterAbove100K) {
            if (element.Premium < 100000)
                return obj;
        }
        else if (optionsFilterAbove200K) {
            if (element.Premium < 200000)
                return obj;
        }
        else if (optionsFilterAbove500K) {
            if (element.Premium < 500000)
                return obj;
        }
        if (optionsFilter750BMarketCap) {
            if (element.MktCap >= 750000000000) {
                return obj;
            }
        }
        if (optionsFilterBelowPoint5) {
            var strip = element.Details.split("@");
            var strip2 = strip[1].replace("_", "");
            strip2 = strip2.replace(/a/gi, "");
            strip2 = strip2.replace(/b/gi, "");
            if (strip2 > 0.5)
                return obj;
        }
        if (optionsFilterBelow5) {
            var strip = element.Details.split("@");
            var strip2 = strip[1].replace("_", "");
            strip2 = strip2.replace(/a/gi, "");
            strip2 = strip2.replace(/b/gi, "");
            if (strip2 > 5.0)
                return obj;
        }
        if (optionsFilter100Contracts) {
            var strip = element.Details.split("@");
            if (strip[0] < 100.0)
                return obj;
        }
        if (optionsFilter500Contracts) {
            var strip = element.Details.split("@");
            if (strip[0] < 500.0)
                return obj;
        }
        if (optionsFilter5000Contracts) {
            var strip = element.Details.split("@");
            if (strip[0] < 5000.0)
                return obj;
        }
        // var clr = "";
        // if (element.Color != null) {
        //     //if (rd.Color !== "WHITE")
        //     clr = " color: " + element.Color + ";";
        // }


        obj = {
            column1: moment(element.CreatedDate).format('h:mm:ss'),
            column11: (element.Spot).toFixed(2),
            column2: element.Symbol,
            column22: element.Details,
            column3: moment(element.Expiration).format('MM/DD/YYYY'),
            column33: element.Type,
            column4: element.Strike,
            column44: getPremium(element.Premium),
            column5: element.CallPut,
            column55: (element.ImpliedVolatility * 100).toFixed(2),
            color1: element.Color == 'YELLOW' ? 'yellow' : element.Color == 'MAGENTA' ? '#FF00FF' : '#FFFFFF',
            color: element.CallPut == 'CALL' ? 'lightgreen' : 'red',
            symbol: element.Symbol
        }
    } catch (error) {
        return obj
    }

    return obj;
}

const AlertsComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [marketData, setMarketData] = useState([]);
    const [marketData1, setMarketData1] = useState([]);
    const [marketData2, setMarketData2] = useState([]);
    const hubUrl = API_URL.base_url + API_URL.options;
    const isFocused = useIsFocused();

    useEffect(() => {

        if (props.route.params?.indexValue) {
            let connection;
            connection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl)
                .build();
            if (props.route.params?.indexValue == 2) {
                connection.start({ withCredentials: true })
                    .then(() => connection.invoke('GetOptionsTopGainersTimeSort'))
                    .catch(erro => {
                        console.log("error", erro)
                    })
                connection.on('GetOptionTopGainersTimeSort', function (t) {
                    let options = [...t];
                    let mainArray = []
                    // const check =  options.sort((a, b) => a.CreatedDate - b.CreatedDate) 
                    options.sort((a, b) => b.CreatedDate.localeCompare(a.CreatedDate));
                    if ((options != null) && (options.length > 0)) {
                        options.forEach((element, index) => {
                            let obj = {
                                column1: element.Symbol,
                                column11: element.Details,
                                column2: moment(element.CreatedDate).format('h:mm:ss'),
                                column22: element.PriceAtAlert,
                                column3: moment(element.Expiration).format('MM/DD/YYYY'),
                                column33: element.DailyHigh.toFixed(2),
                                column4: element.Strike,
                                column44: element.CurrentPrice.toFixed(2),
                                column5: element.CallPut,
                                column55: element.PercentGain,
                                color: element.CallPut == 'CALL' ? 'lightgreen' : 'red',
                                symbol: element.Symbol

                            }
                            mainArray.push(obj);
                            mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                        })
                        //  mainArray.sort((a, b) => b.column2.localeCompare(a.column2));
                        setMarketData2([...mainArray])
                        setIsLoading(false);
                    }
                    else {
                        setIsLoading(false)
                        setMarketData2([...mainArray])
                    }

                });

            }
            else if (props.route.params?.indexValue == 1) {
                connection.start({ withCredentials: true })
                    .then(() => connection.invoke('GetOptionsTopGainers'))
                    .catch(erro => {
                        console.log("error", erro)
                    })
                connection.on('GetOptionTopGainers', function (t) {
                    let options = [...t];
                    let mainArray = []
                    if ((options != null) && (options.length > 0)) {
                        options.forEach((element, index) => {
                            let obj = {
                                column1: element.Symbol,
                                column11: element.Details,
                                column2: moment(element.CreatedDate).format('h:mm:ss'),
                                column22: element.PriceAtAlert,
                                column3: moment(element.Expiration).format('MM/DD/YYYY'),
                                column33: element.DailyHigh.toFixed(2),
                                column4: element.Strike,
                                column44: element.CurrentPrice.toFixed(2),
                                column5: element.CallPut,

                                column55: element.PercentGain,
                                color: element.CallPut == 'CALL' ? 'lightgreen' : 'red',
                                symbol: element.Symbol
                            }
                            mainArray.push(obj);
                            mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                        });
                        mainArray.sort((a, b) => {
                            return b.column55 - a.column55;
                        });

                        setMarketData1([...mainArray]); setIsLoading(false);
                    }
                    else {
                        setIsLoading(false)
                        setMarketData1([...mainArray])
                    }
                });
            }
        }
    }, [props.route.params?.indexValue]);
    useEffect(() => {
        if (!marketData.length > 0) {
            setIsLoading(true)
        }
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        connection.start({ withCredentials: true })
            .then(() => connection.invoke('GetOptionsTopGainers'))
            .catch(erro => {
                console.log("error", erro)
            })
        if (isFocused && !props.route.params?.indexValue) {

            connection.on('GetOptionTopGainers', function (t) {
                let options = [...t];
                let mainArray = [];
                let savedData = [...marketData];
                if (savedData && savedData.length === options.length) {
                    return;
                }
                if ((options != null) && (options.length > 0)) {
                    options.forEach((element, index) => {
                        let obj = {
                            column1: element.Symbol,
                            column11: element.Details,
                            column2: moment(element.CreatedDate).format('h:mm:ss'),
                            column22: element.PriceAtAlert,
                            column3: moment(element.Expiration).format('MM/DD/YYYY'),
                            column33: element.DailyHigh.toFixed(2),
                            column4: element.Strike,
                            column44: element.CurrentPrice.toFixed(2),
                            column5: element.CallPut,
                            column55: element.PercentGain,
                            color: element.CallPut == 'CALL' ? 'lightgreen' : 'red',
                            symbol: element.Symbol

                        }
                        mainArray.push(obj);
                        mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)

                    })

                    mainArray.sort((a, b) => {
                        return b.column55 - a.column55;
                    });

                    setMarketData(([...mainArray]), setIsLoading(false));
                    // connection.stop()
                }
                else {
                    setIsLoading(false)
                    setMarketData([...mainArray])
                }
            });
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        } else {
            connection.stop();
            setMarketData([])
        }

        return () => {
            connection.stop();
            setMarketData([])
        }

    }, [isFocused, props.route.params?.indexValue]);


    return (
        <MainBackground>
            <View style={{ marginTop: heightScale(10), flex: 1 }}>
                <Loader isLoading={isLoading} />
                <OptionTable headerData={alertHeaderData} data={props.route.params?.indexValue == 1 ? marketData1 : props.route.params?.indexValue == 2 ? marketData2 : marketData} />
            </View>
        </MainBackground>

    )
}

const VolComponent = (props) => {
    const [marketData, setMarketData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const hubUrl = API_URL.base_url + API_URL.options;

    const isFocused = useIsFocused();
    useEffect(() => {
        if (!marketData.length > 0) {
            setIsLoading(true)
        }
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        if (isFocused) {

            connection.start({ withCredentials: true })
                .then(() => connection.invoke('GetOptionsVolumeRatio'))
                .catch(erro => {
                    console.log("error", erro)
                })
            connection.on('GetVolumeRatio', function (t) {
                let options = [...t];
                let mainArray = []
                if ((options != null) && (options.length > 0)) {
                    options.forEach((element, index) => {
                        let obj = {
                            column1: element.Symbol,
                            column11: element.VolumeRatio,
                            column2: element.TotalVolume,
                            column22: element.CallOpenInterest,
                            column3: element.CallVolume,
                            column33: element.PutOpenInterest,
                            column4: element.PutVolume,
                            column44: element.DeltaCallOpenInterest,
                            column5: element.PutCallRatio,
                            column55: element.DeltaPutOpenInterest,
                            column6: element.AverageVolume,
                            symbol: element.Symbol
                        }
                        mainArray.push(obj);
                        mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                    })
                    setMarketData(([...mainArray]), setIsLoading(false));
                }
                else {
                    //setIsLoading(false)
                    setMarketData([...mainArray])
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 5000)
            });
        } else {
            connection.stop();
            setMarketData([])
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
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <Loader isLoading={isLoading} />
                <OptionTable headerData={volumeHeaderData} data={marketData} />
            </View>
        </MainBackground>

    )
}

const OlComponent = (props) => {
    const [marketData, setMarketData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    let optionsFilterSymbol = "", alertMax = 300;
    const hubUrl = API_URL.base_url + API_URL.options;
    const isFocused = useIsFocused();

    useEffect(() => {

        if (props.route.params?.indexValue) {
            let selectedIndex = props.route.params?.indexValue;
            setMarketData([]);

            setIsLoading(true)
            let connection;
            connection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl)
                .build();
            connection.start({ withCredentials: true })
                .then(() => connection.invoke('GetOptionsOIDelta2', optionsFilterSymbol, alertMax, 0))
                .catch(erro => {
                    console.log("error", erro)
                })
            connection.on('GetOptionsOIDelta', function (t) {
                let options = [];
                if (selectedIndex == 1) {
                    options = [...t.OptionsOIDeltaCallTop];
                } else if (selectedIndex == 2) {

                    options = [...t.OptionsOIDeltaCallBottom]
                } else if (selectedIndex == 3) {
                    options = [...t.OptionsOIDeltaPutTop]
                } else if (selectedIndex == 4) {
                    options = [...t.OptionsOIDeltaPutBottom]
                }
                let mainArray = []
                if ((options != null) && (options.length > 0)) {
                    options.forEach((element, index) => {
                        let obj = {
                            column1: element.Symbol,
                            column2: moment(element.Expiration).format('MM/DD/YYYY'),
                            column3: element.CallPut,
                            column4: element.Strike,
                            column5: element.OpenInterest,
                            column6: element.DeltaOpenInterest,
                            color: element.CallPut == 'CALL' ? 'lightgreen' : 'red',
                            symbol: element.Symbol
                        }
                        mainArray.push(obj);
                    })
                    mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)

                    setMarketData([...mainArray]);
                }
                else {
                    //setIsLoading(false);
                    setMarketData([])
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 20000)

            });



        }

    }, [props.route.params?.indexValue]);

    useEffect(() => {
        let connection;
        if (!marketData.length > 0) {
            setIsLoading(true)
        }
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        if (isFocused && !props.route.params?.indexValue) {

            connection.start({ withCredentials: true })
                .then(() => connection.invoke('GetOptionsOIDelta2', optionsFilterSymbol, alertMax, 0))
                .catch(erro => {
                    console.log("error", erro)
                })
            connection.on('GetOptionsOIDelta', function (t) {
                let options = [...t.OptionsOIDeltaCallTop];
                let mainArray = []
                if ((options != null) && (options.length > 0)) {
                    options.forEach((element, index) => {
                        let obj = {
                            column1: element.Symbol,
                            column2: moment(element.Expiration).format('MM/DD/YYYY'),
                            column3: element.CallPut,
                            column4: element.Strike,
                            column5: element.OpenInterest,
                            column6: element.DeltaOpenInterest,
                            color: element.CallPut == 'CALL' ? 'lightgreen' : 'red',
                            symbol: element.Symbol
                        }
                        mainArray.push(obj);
                        mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                    })
                    setMarketData(([...mainArray]));
                }
                else {

                    // setIsLoading(false);
                    setMarketData([])
                }


            });
            setTimeout(() => {
                setIsLoading(false);
            }, 10000)
        } else {
            connection.stop();
            setMarketData([])
        }

        return () => {

            connection.stop();
            setMarketData([])
            //clearInterval(interval)
        }

    }, [isFocused, props.route.params?.indexValue])
    return (

        <MainBackground>
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <Loader isLoading={isLoading} />
                <OptionTable headerData={olHeaderData} data={marketData} />
            </View>
        </MainBackground>

    )
}

const getHeatTableRow = (rd) => {
    var strRow;
    try {
        strRow = {
            column1: {
                color: rd.C2C,
                backgroundColor: rd.C2BC,
                value: (rd.C2Vol == 0) ? "" : rd.C2Vol

            },
            column2: {
                color: rd.C1C,
                backgroundColor: rd.C1BC,
                value: (rd.C1Vol == 0) ? "" : rd.C1Vol,
            },
            column3: {
                color: rd.C0C,
                backgroundColor: rd.C0BC,
                value: (rd.C0Vol == 0) ? "" : rd.C0Vol,
            },
            column4: {
                color: (rd.Strike == rd.SpotStrike) ? "yellow" : "",
                backgroundColor: 'transparent',
                value: (rd.Strike > 0.50) ? rd.Strike : "",
            },
            column5: {
                value: (rd.P0Vol == 0) ? "" : rd.P0Vol,
                color: rd.P1C,
                backgroundColor: rd.P1BC
            },
            column6: {
                value: (rd.P1Vol == 0) ? "" : rd.P1Vol,
                color: rd.P1C,
                backgroundColor: rd.P1BC
            },
            column7: {
                value: (rd.P2Vol == 0) ? "" : rd.P2Vol,
                color: rd.P2C,
                backgroundColor: rd.P2BC
            }
        }
        console.log("checknow", strRow)
    }
    catch (err) {
        strRow;
    }
    return strRow;
}

const MapComponent = (props) => {
    const [marketData, setMarketData] = useState([]);
    const isFocused = useIsFocused();
    const hubUrl = API_URL.base_url + API_URL.options;
    const selectedSym = useSelector(state => state.marketCategory.selectedSymbol);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        let mainArray = [];
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        if (isFocused) {
            setIsLoading(true)
            connection.start({ withCredentials: true })
                .then(() => connection.invoke('GetOptionsHeatMap', selectedSym))

                .catch(erro => {
                    console.log("error", erro)
                })
                .done(() => {
                    setIsLoading(false)
                })
            connection.on('GetOptionsHeatMap', function (t) {
                console.log("checkmapdata11", t)
                let heatArray = [...t.Options];
                heatArray.forEach(element => {
                    let newElement = getHeatTableRow(element);
                    if (newElement) {
                        mainArray.push(newElement);
                    }

                })

                setMarketData([...mainArray]);
                console.log("checkmapdata", marketData)
            });

        } else {
            connection.stop();
            setMarketData([])
        }

        return () => {
            console.log("on stop cleanup");
            connection.stop();
            setMarketData([])
            // //clearInterval(interval)
        }

    }, [isFocused])
    return (
        <MainBackground>
            <View style={{ flex: 1 }}>
                <Loader isLoading={isLoading} />
                <OptionTable headerData={mapHeaderData} data={marketData} isHeatMap={true} />
            </View>
        </MainBackground>

    )
}

const CallsComponent = (props) => {
    const [marketData, setMarketData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();
    const hubUrl = API_URL.base_url + API_URL.options;

    useEffect(() => {
        if (marketData == '') {
            setIsLoading(true)
            // alert(isLoading)
        }
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        if (isFocused) {
            connection.start({ withCredentials: true }).then((ref) => {


            })
                .catch(erro => {
                    console.log("error", erro)
                })
            connection.on('GetOptionUpdates', function (t) {

                if (t.OptionCalls !== null) {

                    let options = [...t.OptionCalls];
                    let mainArray = []
                    if ((options != null) && (options.length > 0)) {
                        let data = fillTable(options, "calls", true);
                        console.log("checkcalls", data)
                        if (data.length > 0) {
                            setIsLoading(false)
                        }
                        setMarketData([...data]);


                    }
                    else {

                        // setIsLoading(false)
                        //  setMarketData([])
                    }
                }
                else {

                    // setIsLoading(false)
                    //  setMarketData([])
                }


            })
            setTimeout(() => {
                setIsLoading(false);
            }, 40000)
        } else {
            connection.stop();
            // setMarketData([])
        }

        return () => {
            connection.stop();
            setMarketData([])
        }

    }, [isFocused])
    return (
        <MainBackground>
            <Loader isLoading={isLoading} />
            <View style={{ marginTop: heightScale(15), flex: 1 }}>

                <OptionTable headerData={callAdPutsHeaderData} isGradient={true} data={marketData} />
            </View>

        </MainBackground>

    )

}

const PutsComponent = (props) => {
    const [marketData, setMarketData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const hubUrl = API_URL.base_url + API_URL.options;
    const isFocused = useIsFocused();


    useEffect(() => {
        if (marketData == '') {
            setIsLoading(true)
            // alert(isLoading)
        }
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        if (isFocused) {

            connection.start({ withCredentials: true }).then((ref) => {


            })
                .catch(erro => {
                    console.log("error", erro)
                })
            connection.on('GetOptionUpdates', function (t) {

                if (t.OptionPuts !== null) {


                    let options = [...t.OptionPuts];
                    let mainArray = []
                    if ((options != null) && (options.length > 0)) {
                        let data = fillTable(options, "puts", false);
                        if (data.length > 0) {
                            setIsLoading(false)
                        }

                        setMarketData([...data])

                    }
                    else {

                        // setIsLoading(false)
                        //  setMarketData([])
                    }
                }
                else {

                    // setIsLoading(false)
                    //  setMarketData([])
                }


            })
            setTimeout(() => {
                setIsLoading(false);
            }, 40000)
        } else {
            connection.stop();

        }

        return () => {
            console.log("on stop cleanup");
            connection.stop();
            setMarketData([])
        }


    }, [isFocused])

    return (
        <MainBackground>
            <Loader isLoading={isLoading} />
            <View style={{ marginTop: heightScale(15), flex: 1 }}>

                <OptionTable headerData={callAdPutsHeaderData} isGradient={true} data={marketData} />
            </View>

        </MainBackground>

    )
}

const BullComponent = (props) => {
    const [marketData, setMarketData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const hubUrl = API_URL.base_url + API_URL.options;
    const isFocused = useIsFocused();

    useEffect(() => {
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        if (marketData == '') {
            setIsLoading(true)
            // alert(isLoading)
        }
        if (isFocused) {

            connection.start({ withCredentials: true }).then((ref) => {

            })
                .catch(erro => {
                    console.log("error", erro)
                })
            connection.on('GetOptionUpdates', function (t) {
                if (t.OptionBullishFlow !== null) {


                    let options = [...t.OptionBullishFlow];
                    if ((options != null) && (options.length > 0)) {

                        let data = fillTable(options, "bullish", true);
                        if (data.length > 0) {
                            setIsLoading(false)
                        }

                        setMarketData([...data]);


                    } else {

                        // setMarketData([]);
                        // setIsLoading(false)
                    }

                }
                else {

                    // setMarketData([]);
                    // setIsLoading(false)
                }
            });
            setTimeout(() => {
                setIsLoading(false);
            }, 40000)
        } else {
            connection.stop();
            setMarketData([])
            // setIsLoading(false)
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

                <OptionTable headerData={bullHeaderData} isGradient={true} data={marketData} />
            </View>

        </MainBackground>

    )
}


const getPremium = (p) => {
    var prem;
    if (Math.abs(p) > 1000000) {
        prem = "$" + Math.round(p / 10000) / 100 + "M";   //Rounds to 2 decimal places
        //prem = "$" + Math.round(p / 1000000) + "M";
    }
    else {
        prem = "$" + Math.round(p / 100) / 10 + "K";  //Rounds to 1 decimal place
        //prem = "$" + Math.round(p / 1000) + "K";
    }
    return prem;
}

const getTopOptionTableRow = (element, isCalls, maxPremium) => {
    var perPrem = Math.round((element.Premium / maxPremium) * 100);
    let newElement = {
        column1: element.Symbol,
        column2: element.Count,
        column3: getPremium(element.Premium),
        color: isCalls ? ["rgba(0,213,83," + ((perPrem * 2) / 100) + ")", "rgba(0,213,83,0)"] : ["rgba(215,7,9," + ((perPrem) / 100) + ")", "rgba(215,7,9,0)"],
        colorPercent: perPrem,
        symbol: element.Symbol
    }

    return newElement;

}


const fillTable = (t, type, isCalls) => {
    let arrElement;
    let arr = [];
    var maxPremium = 0;
    if (t.length > 0) {
        for (var i = 0; i < t.length; i++) {
            if (Math.abs(t[i].Premium) > Math.abs(maxPremium))
                maxPremium = t[i].Premium;
        }
        for (i = 0; i < t.length; i++) {
            arrElement = getTopOptionTableRow(t[i], isCalls, maxPremium);
            arr.push(arrElement);
        }

    }

    return arr;
}



const BearComponent = (props) => {
    const [marketData, setMarketData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();
    const hubUrl = API_URL.base_url + API_URL.options;


    useEffect(() => {
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        if (!marketData.length > 0) {

            setIsLoading(true)
            // alert(isLoading)
        }

        if (isFocused) {

            connection.start({ withCredentials: true }).then((ref) => {

            })
                .catch(erro => {
                    console.log("error", erro)
                })
            connection.on('GetOptionUpdates', function (t) {
                if (t.OptionBearishFlow !== null) {


                    let options = [...t.OptionBearishFlow];
                    if ((options !== null)) {
                        let data = fillTable(options, 'bearish', false);
                        if (data.length > 0) {
                            setIsLoading(false)
                        }

                        setMarketData([...data]);



                    }
                    else {

                        // setIsLoading(false);
                        // setMarketData([])
                    }
                } else {

                    // setIsLoading(false);
                    // setMarketData([])
                }


            });
            setTimeout(() => {
                setIsLoading(false);
            }, 30000)
        } else {
            connection.stop();
            // setMarketData([])
        }

        return () => {
            console.log("on stop cleanup");
            connection.stop();
            // setMarketData([])
            //clearInterval(interval)
        }


    }, [isFocused])
    return (
        <MainBackground>
            <Loader isLoading={isLoading} />
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <OptionTable headerData={bearHeaderData} isGradient={true} data={marketData} />
            </View>

        </MainBackground>

    )
}

function MyTabBar({ state, descriptors, navigation, position, tabList, selectedIndex, setCurrentTab }) {


    return (
        <CustomTabs
            state={state}
            currentTabname={(tabname) => { setCurrentTab(tabname) }}
            descriptors={descriptors}
            navigation={navigation}
            selectedIndex={selectedIndex}
            leftArrowIndex={4}
            rightArrowIndex={5}
            borderBox={styles.borderBoxStyle}
            selectedBorderBox={styles.selectedBorderBoxStyle}
            rightCellStyle={styles.rightCellStyle}
            rightCellSelected={styles.rightCellSelected}
        />
    );
}


const Options = (props) => {

    const Tab = createMaterialTopTabNavigator();

    const [currentTabName, setCurrentTabName] = useState('Flow');



    useEffect(() => {
        props.navigation.setParams({ showFilter: currentTabName });
    }, [currentTabName]);



    const [data, setData] = useState([
        {
            id: 1,
            tabname: 'Flow',
            selected: false,
            apiEndPoints: API_URL.pre_market_sscan,
            node: API_URL.pre_market_scan_node
        },
        {
            id: 2,
            tabname: 'Alerts',
            selected: false,
            apiEndPoints: API_URL.market_scan,
            node: API_URL.market_scan_node
        },
        {
            id: 3,
            tabname: 'Vol',
            selected: false,
            apiEndPoints: API_URL.post_market_sscan,
            node: API_URL.post_market_scan_node
        },
        {
            id: 4,
            tabname: 'Ol',
            selected: false,
            apiEndPoints: API_URL.alert_log,
            node: API_URL.alert_log_node
        },
        {
            id: 5,
            tabname: 'Map',
            selected: false,
            apiEndPoints: API_URL.alert_stream,
            node: API_URL.alert_stream_node
        },
        {
            id: 6,
            tabname: 'Calls',
            selected: false,
            apiEndPoints: API_URL.alert_stream,
            node: API_URL.alert_stream_node
        },
        {
            id: 7,
            tabname: 'Puts',
            selected: false,
            apiEndPoints: API_URL.alert_stream,
            node: API_URL.alert_stream_node
        },
        {
            id: 8,
            tabname: 'Bull',
            selected: false,
            apiEndPoints: API_URL.alert_stream,
            node: API_URL.alert_stream_node
        },
        {
            id: 9,
            tabname: 'Bear',
            selected: false,
            apiEndPoints: API_URL.alert_stream,
            node: API_URL.alert_stream_node
        }
    ]);



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
                    backBehavior={'none'}
                    swipeEnabled={false}
                    tabBar={props => <MyTabBar {...props} setCurrentTab={(tabname) => { setCurrentTabName(tabname) }} />}
                >

                    <Tab.Screen
                        name={'Flow'}
                        component={FlowComponent}
                    // initialParams={{ tabname: 'Flow', headerData: headerData }}
                    />
                    <Tab.Screen
                        name={'Alerts'}
                        component={AlertsComponent}

                    />
                    <Tab.Screen
                        name={'Vol'}
                        component={VolComponent}
                    //  initialParams={{ tabname: 'Vol', headerData: headerData }}
                    />
                    <Tab.Screen
                        name={'Ol'}
                        component={OlComponent}
                    />
                    <Tab.Screen
                        name={'Map'}
                        component={MapComponent}
                    />
                    <Tab.Screen
                        name={'Calls'}
                        component={CallsComponent}
                    />

                    <Tab.Screen
                        name={'Puts'}
                        component={PutsComponent}
                    />
                    <Tab.Screen
                        name={'Bull'}
                        component={BullComponent}
                    />
                    <Tab.Screen
                        name={'Bear'}
                        component={BearComponent}
                    />
                </Tab.Navigator>
                :
                null
            }
        </MainBackground>
    )
}
const styles = StyleSheet.create({

    borderBoxStyle: {
        width: widthScale(69),
        height: heightScale(46),
        justifyContent: 'center',
        borderColor: colors.LIGTH_GREEN,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: colors.HOME_MAIN_BOX,
        alignItems: 'center',

    },
    selectedBorderBoxStyle: {
        width: widthScale(69),
        height: heightScale(46),
        justifyContent: 'center',
        borderColor: colors.LIGTH_GREEN,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: colors.LIGTH_GREEN,
        alignItems: 'center',
    },
    rightCellStyle: {
        width: widthScale(92),
        height: heightScale(46),
        justifyContent: 'center',
        borderColor: colors.LIGTH_GREEN,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: colors.HOME_MAIN_BOX,
        alignItems: 'center',

    },
    rightCellSelected: {
        width: widthScale(92),
        height: heightScale(46),
        justifyContent: 'center',
        borderColor: colors.LIGTH_GREEN,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: colors.LIGTH_GREEN,
        alignItems: 'center',
    },
    synopsis: {
        marginTop: 10,
        marginLeft: widthScale(4),
        color: 'white',
        fontSize: widthScale(12),
        fontWeight: '400',
    },
    container1: {
        flex: 1,

        padding: 10,
        marginTop: heightScale(25),
        backgroundColor: '#202020'

    },
});

export default Options
