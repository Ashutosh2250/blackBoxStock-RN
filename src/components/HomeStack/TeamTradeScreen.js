import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'
import MainBackground from '../../CustomUI/MainBackground';
import colors from '../../res/colors';
import API_URL from '../../utils/ApiUrl';
import { heightScale, widthScale } from '../../utils/Utils';
const signalR = require("@aspnet/signalr");
// import styles from './styles';
import moment from 'moment';

const TeamTradeScreen = props => {

    var connection;
    const [gainerData, setGainerData] = useState([]);

    useEffect(() => {
        const hubUrl = API_URL.taem_trade_url;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        connection.start({ withCredentials: true })
        connection.on('loadModPlayItems', function (t) {
            setGainerData([...t])
        });
    }, []);
    const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9);

    return (

        <MainBackground>
            <View style={{ flex: 1 }}>
                <FlatList
                    contentContainerStyle={{ marginTop: heightScale(20) }}
                    data={gainerData}
                    bounces={false}
                    keyExtractor={(item, index) => { return keyGenerator() }}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={index} style={[styles.card]}>
                                <Text style={styles.heading}>{item.createdDate ? 'Team Trade - ' + moment(item.createdDate).format('LTS') : ""}</Text>
                                <View style={styles.row}>
                                    <Text style={[styles.textOne,]}>{'Trader'}</Text>
                                    <Text style={[styles.textTwo, { color: colors.BLUE }]}>{item.moderator ? item.moderator : ""}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.textOne,]}>{'In/Out'}</Text>
                                    <Text style={[styles.textTwo,]}>{item.action ? item.action : ""}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.textOne,]}>{'Ticker'}</Text>
                                    <Text style={[styles.textTwo, { color: colors.LIGTH_GREEN }]}>{item.ticker ? '$' + item.ticker : ""}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.textOne,]}>{'Expiration'}</Text>
                                    <Text style={[styles.textTwo,]}>{item.expiration ? item.expiration : ""}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.textOne,]}>{'Strike'}</Text>
                                    <Text style={[styles.textTwo,]}>{item.strike ? '$' + item.strike : ""}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.textOne,]}>{'Price'}</Text>
                                    <Text style={[styles.textTwo,]}>{item.price ? item.price : ""}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.textOne,]}>{'Type'}</Text>
                                    <Text style={[styles.textTwo,]}>{item.type ? item.type : ""}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.textOne,]}>{'Notes'}</Text>
                                    <Text style={[styles.textTwo,]}>{item.notes ? item.notes : ""}</Text>
                                </View>
                            </View>
                        )

                    }}
                />

            </View>
        </MainBackground>
    );

}


const styles = StyleSheet.create({
    card: {
        borderWidth: 1.4,
        paddingTop: heightScale(12),
        paddingBottom: heightScale(7),
        borderColor: 'green',
        width: "100%",
        borderRadius: widthScale(4),
        marginTop: heightScale(5),
        marginBottom: heightScale(5),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: heightScale(5),
    },
    heading: {
        color: 'white',
        marginBottom: heightScale(15),
        marginHorizontal: widthScale(10),
        fontSize: widthScale(16),
        fontWeight: '600'
    },
    textOne: {
        marginLeft: widthScale(10),
        color: 'white',
        fontWeight: '400',
        fontSize: widthScale(14),
        width: '30%'
    },
    textTwo: {
        color: 'white',
        fontWeight: '400',
        fontSize: widthScale(14),
        marginRight: widthScale(10),
        width: '65%'
    }

});

export default TeamTradeScreen;
