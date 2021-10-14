import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MainBackground from '../../CustomUI/MainBackground';
import TableViewFlatlist from '../../CustomUI/TableViewFlatlist';
import API_URL from '../../utils/ApiUrl';
import { heightScale, myFonts, widthScale } from '../../utils/Utils';
import Loader from '../../CustomUI/Loader';
const signalR = require("@aspnet/signalr");
import { useDispatch, useSelector } from 'react-redux';
import { saveDeclinerData } from '../../redux/actions/MarketCategoryActions';
import images from '../../res/images/images';

const Decliners = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [marketData, setMarketData] = useState([]);
    const [marketDatanew, setMarketDatanew] = useState([]);
    const dispatch = useDispatch();
    const marketData1 = useSelector(state => state.marketCategory.decliner_data);
    const [headerData, setHeaderData] = useState([
        {
            id: 1,
            tabname: 'SYMBOL',
        },
        {
            id: 2,
            tabname: 'PRICE AT \n ALERT',
        },
        {
            id: 3,
            tabname: 'TODAY\'S \n LOW',
        },
        {
            id: 4,
            tabname: 'CUREENT \n PRICE',
        },
        {
            id: 5,
            tabname: 'PERCENT \n GAIN',
        },
        {
            id: 6,
            tabname: 'VOLATILITY'
        }
    ]);

    useEffect(() => {
        const hubUrl = API_URL.base_url + API_URL.decliners;
        let connection;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        let interval;
        connection.start({ withCredentials: true })
        connection.on(API_URL.decliners_node, function (response) {
            let mainArray = [];
            response.forEach((item, index) => {
                let obj = {
                    'column1': item.Symbol,
                    'column2': item.PriceAtAlert ? "$" + item.PriceAtAlert.toFixed(2) : '',
                    'column3': item.DailyLow ? "$" + (item.DailyLow).toFixed(2) : '',
                    'column4': item.CurrentPrice ? "$" + (item.CurrentPrice).toFixed(2) : '',
                    'column5': ((item.PercentGain * 100) / 100).toFixed(2) + "%",
                    'column6': (item.L2).toFixed(2),
                };
                mainArray.push(obj);

            });

            setTimeout(() => {
                dispatch(saveDeclinerData(mainArray))
            }, 2000)

            mainArray.length > 0 ? setIsLoading(false) : setIsLoading(true)

            setMarketData([...mainArray], setIsLoading(false));

            let abc = [...mainArray]
            let arrow = images.upwhite;
            let downarrow = images.downwhite
            let upDownIndicator;
            marketData1.forEach((element) => {
                abc.forEach((item) => {
                    if (element.column5 > item.column5) {

                        item.color1 = "red"
                        item.upDownIndicator = arrow
                    }
                    else if (element.column5 < item.column5) {

                        item.color1 = "green"
                        item.upDownIndicator = downarrow
                    } else if (element.column5 === item.column5) {

                        item.color1 = "white"
                        item.upDownIndicator = arrow
                    }

                })

            });
            setMarketDatanew([...abc])




        });
        setTimeout(() => {

            setIsLoading(false)

        }, 6000)
        return () => {
            console.log("on stop cleanup post");
            connection.stop();
            setMarketData([])
            setIsLoading(false)
            clearInterval(interval)
        }

    }, [marketDatanew])

    return (
        <MainBackground>
            <View style={{ marginTop: heightScale(15), flex: 1 }}>
                <Loader isLoading={isLoading} />
                <TableViewFlatlist data={marketDatanew} {...props} headerData={headerData}
                    tabNameStyle={{ fontSize: widthScale(9), fontFamily: myFonts.montserratBold }}
                    viewLineStyle={{ marginTop: heightScale(10) }} />
            </View>
        </MainBackground>
    )
}
export default Decliners;