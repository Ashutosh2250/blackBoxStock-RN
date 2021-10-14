import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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




const Mods = (props) => {
    const [marketData, setMarketData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const hubUrl = API_URL.base_url;

    const isFocused = useIsFocused();
    useEffect(() => {
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        if (isFocused) {

            connection.start({ withCredentials: true })
                .then(() => connection.invoke('GetOptionsVolumeRatio'))
                .catch(erro =>{
                    console.log("error",erro)
                })
            connection.on('GetVolumeRatio', function (t) {
                console.log("checkmoddata",t)
                // let options = [...t];
                // let mainArray = []
                // if ((options != null) && (options.length > 0)) {
                //     options.forEach((element, index) => {
                //         let obj = {
                //             column1: element.Symbol,
                //             column11: element.VolumeRatio,
                //             column2: element.TotalVolume,
                //             column22: element.CallOpenInterest,
                //             column3: element.CallVolume,
                //             column33: element.PutOpenInterest,
                //             column4: element.PutVolume,
                //             column44: element.DeltaCallOpenInterest,
                //             column5: element.PutCallRatio,
                //             column55: element.DeltaPutOpenInterest,
                //             column6: element.AverageVolume,
                //             symbol: element.Symbol
                //         }
                //         mainArray.push(obj);
                //         mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
                //     })
                //     setMarketData(([...mainArray]), setIsLoading(false));
                // }
                // else {
                //     setIsLoading(false)
                //     setMarketData([...mainArray])
                // }

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
    }
});

export default Mods