import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Button, TouchableOpacity, Text, Image, Linking, FlatList } from 'react-native';
import MainBackground from '../../../CustomUI/MainBackground';
import { WebView } from 'react-native-webview';
import colors from '../../../res/colors';
import { widthScale, heightScale, myFonts } from '../../../utils/Utils';
import images from '../../../res/images/images';
import Loader from '../../../CustomUI/Loader';
import { Calendar } from 'react-native-big-calendar'
import dayjs from 'dayjs'
import moment from 'moment';
import axios from 'axios';
import { Rating } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import CustomHeaderText from '../../../CustomUI/CustomHeaderText';
import { string } from 'prop-types';
import { saveSelectedSymbol, saveNewsSymbol } from '../../../redux/actions/MarketCategoryActions';
import { useDispatch, useSelector } from 'react-redux';


const News = (props) => {
    const [dataCheck, setData] = useState([]);
    const [errorMsg, setErrordata] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();
    const [date, setDate] = useState();
    const newssymbol = useSelector(state => state.marketCategory.selectedNews);
    const selectedSym2 = useSelector(state => state.marketCategory.selectedSymbol);

    const dispatch = useDispatch();
    const selectedSym = newssymbol
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    const stdTimezoneOffset = () => {
        var date = new Date();
        var jan = new Date(date.getFullYear(), 0, 1);
        var jul = new Date(date.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }
    useEffect(() => {
        if (props.route.params) {


            if (props.route.params.params?.indexValue != "") {
                const formData = new FormData();

                let selectedIndex = props.route.params.params?.indexValue;

                if (selectedIndex == "Options News") {
                    formData.append('profile', 'bs_options');
                }
                else if (selectedIndex.includes("Options News") && selectedIndex.includes("Market News") && selectedIndex.length == 2) {
                    formData.append('profile', 'b_options');
                } else if (selectedIndex.includes("Options News") && selectedIndex.includes("Edgar") && selectedIndex.length == 2) {
                    formData.append('profile', 'e_options');

                } else if (selectedIndex.includes("Options News") && selectedIndex.includes("Seeking Aplha/Zero Hedge") && selectedIndex.length == 2) {
                    formData.append('profile', 's_options');
                } else if (selectedIndex.includes("Options News") && selectedIndex.includes("Market News") && selectedIndex.includes("Edgar") && selectedIndex.length == 3) {
                    formData.append('profile', 'be_options');
                } else if (selectedIndex.includes("Options News") && selectedIndex.includes("Market News") && selectedIndex.includes("Seeking Aplha/Zero Hedge") && selectedIndex.length == 2) {
                    formData.append('profile', 'bs_options');
                } else if (selectedIndex.includes("Options News") && selectedIndex.includes("Edgar") && selectedIndex.includes("Seeking Aplha/Zero Hedge") && selectedIndex.length == 2) {
                    formData.append('profile', 'es_options');
                } else if (selectedIndex.includes("Options News") && selectedIndex.includes("Market News") && selectedIndex.includes("Edgar") && selectedIndex.includes("Seeking Aplha/Zero Hedge") && selectedIndex.length == 4) {
                    formData.append('profile', 'bes_options');
                }
                else if (selectedIndex == "Ratings") {
                    formData.append('profile', 'bs_ratings');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Market News") && selectedIndex.length == 2) {
                    formData.append('profile', 'b_ratings');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Edgar") && selectedIndex.length == 2) {
                    formData.append('profile', 'e_ratings');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Seeking Aplha/Zero Hedge") && selectedIndex.length == 2) {
                    formData.append('profile', 's_ratings');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Market News") && selectedIndex.includes("Edgar") && selectedIndex.length == 3) {
                    formData.append('profile', 'be_ratings');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Market News") && selectedIndex.includes("Edgar") && selectedIndex.includes("Seeking Aplha/Zero Hedge") && selectedIndex.length == 4) {
                    formData.append('profile', 'bes_ratings');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Market News") && selectedIndex.includes("Seeking Aplha/Zero Hedge") && selectedIndex.length == 3) {
                    formData.append('profile', 'bs_ratings');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Edgar") && selectedIndex.includes("Seeking Aplha/Zero Hedge") && selectedIndex.length == 3) {
                    formData.append('profile', 'es_ratings');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Options News") && selectedIndex.length == 2) {
                    formData.append('profile', 'bs_ratingsoptions');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Options News") && selectedIndex.includes("Market News") && selectedIndex.length == 3) {
                    formData.append('profile', 'b_ratingsoptions');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Options News") && selectedIndex.includes("Market News") && selectedIndex.includes("Edgar") && selectedIndex.includes("Seeking Aplha/Zero Hedge") && selectedIndex.length == 5) {
                    alert("hi")
                    formData.append('profile', 'bes_ratingsoptions');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Options News") && selectedIndex.includes("Edgar") && selectedIndex.length == 3) {
                    formData.append('profile', 'e_ratingsoptions');
                } else if (selectedIndex.includes("Ratings") && selectedIndex.includes("Options News") && selectedIndex.includes("Seeking Aplha/Zero Hedge") && selectedIndex.length == 3) {
                    formData.append('profile', 's_ratingsoptions');
                }
                else {
                    formData.append('profile', 'bs_allnews');
                }
                formData.append('profile', 'bs_allnews');
                formData.append('timestamp', 0);
                formData.append('hash', '');
                axios({
                    url: 'https://bbs.newsedge.net/AMC-Streaming/Request/request.php?BBS Scroller',
                    method: 'POST',
                    data: formData,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then(response => {
                        var currentDate = new Date();
                        var easternTimeOffset = (currentDate.getTimezoneOffset() < stdTimezoneOffset()) ? "04:00" : "05:00";
                        var responseData = response.data.headlines
                        var updatedDate = []
                        for (let i = 0; i < responseData.length; i++) {

                            var newDate = responseData[i].receive_date
                            var easternDateStr = newDate.substr(0, 4) +
                                "-" +
                                newDate.substr(4, 2) +
                                "-" +
                                newDate.substr(6, 2) +
                                "T" +
                                newDate.substr(8, 2) +
                                ":" +
                                newDate.substr(10, 2) +
                                ":00-" + easternTimeOffset;

                            var easternDate = new Date(easternDateStr);

                            var dateText = month[easternDate.getMonth()] + " " + easternDate.getDate() + ", " + easternDate.getFullYear() + " at " + ("0" + easternDate.getHours()).slice(-2) + ":" + ("0" + easternDate.getMinutes()).slice(-2);
                            responseData[i].modifiedDate = dateText
                        }

                        setData(responseData),
                            setIsLoading(false)
                    })
                    .catch(error => {
                        console.log("error", error);
                    })

            }
            else if (props.route.params.params?.textValue) {
                let value = props.route.params.params?.textValue

                const formDataNew = new FormData();
                formDataNew.append('query', value);
                formDataNew.append('backfill', true);
                formDataNew.append('wire_inc', '=5=6BWCWX&W9PZ8Z8_PRY0FW5J3/7_');
                formDataNew.append('count', 625);
                axios({
                    url: 'https://bbs.newsedge.net/AMC-Streaming/Streaming/search_ajax.php?',
                    method: 'POST',
                    data: formDataNew,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then(response => {
                        var currentDate = new Date();
                        var easternTimeOffset = (currentDate.getTimezoneOffset() < stdTimezoneOffset()) ? "04:00" : "05:00";
                        var responseData = response.data.headlines
                        var updatedDate = []
                        for (let i = 0; i < responseData.length; i++) {

                            var newDate = responseData[i].receive_date
                            var easternDateStr = newDate.substr(0, 4) +
                                "-" +
                                newDate.substr(4, 2) +
                                "-" +
                                newDate.substr(6, 2) +
                                "T" +
                                newDate.substr(8, 2) +
                                ":" +
                                newDate.substr(10, 2) +
                                ":00-" + easternTimeOffset;

                            var easternDate = new Date(easternDateStr);

                            var dateText = month[easternDate.getMonth()] + " " + easternDate.getDate() + ", " + easternDate.getFullYear() + " at " + ("0" + easternDate.getHours()).slice(-2) + ":" + ("0" + easternDate.getMinutes()).slice(-2);
                            responseData[i].modifiedDate = dateText
                        }

                        setData(responseData),
                            setIsLoading(false)
                    })
                    .catch(error => {
                        console.log("error", error);
                    })
            }
        } else if (selectedSym) {
            const formData = new FormData();
            formData.append('query', "/" + selectedSym);
            formData.append('backfill', true);
            formData.append('wire_inc', '=5=6BWCWX&W9PZ8Z8_PRY0FW5J3/7_');
            formData.append('count', '600');
            axios({
                url: 'https://bbs.newsedge.net/AMC-Streaming//Streaming/search_ajax.php',
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    // if (error) {
                    //     var erroMsg = "No matches found"
                    //     setErrordata(erroMsg)
                    //     setIsLoading(false)
                    // }

                    if (response.data.count == 0) {

                        setErrordata(response.data.message)

                        setIsLoading(false)
                    } else if (response.data.count != 0) {

                        var currentDate = new Date();
                        var easternTimeOffset = (currentDate.getTimezoneOffset() < stdTimezoneOffset()) ? "04:00" : "05:00";
                        var responseData = response.data.headlines
                        var updatedDate = []

                        for (let i = 0; i < responseData.length; i++) {

                            var newDate = responseData[i].receive_date
                            var easternDateStr = newDate.substr(0, 4) +
                                "-" +
                                newDate.substr(4, 2) +
                                "-" +
                                newDate.substr(6, 2) +
                                "T" +
                                newDate.substr(8, 2) +
                                ":" +
                                newDate.substr(10, 2) +
                                ":00-" + easternTimeOffset;

                            var easternDate = new Date(easternDateStr);

                            var dateText = month[easternDate.getMonth()] + " " + easternDate.getDate() + ", " + easternDate.getFullYear() + " at " + ("0" + easternDate.getHours()).slice(-2) + ":" + ("0" + easternDate.getMinutes()).slice(-2);
                            responseData[i].modifiedDate = dateText
                        }
                        setData(responseData),
                            setIsLoading(false)

                    }

                })
                .catch(error => {

                    console.log("error", error);
                })
        }
        else {

            const formData = new FormData();
            formData.append('profile', 'bs_allnews');
            formData.append('timestamp', 0);
            formData.append('hash', '');
            axios({
                url: 'https://bbs.newsedge.net/AMC-Streaming/Request/request.php?BBS Scroller',
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    var currentDate = new Date();
                    var easternTimeOffset = (currentDate.getTimezoneOffset() < stdTimezoneOffset()) ? "04:00" : "05:00";
                    var responseData = response.data.headlines
                    var updatedDate = []
                    for (let i = 0; i < responseData.length; i++) {

                        var newDate = responseData[i].receive_date
                        var easternDateStr = newDate.substr(0, 4) +
                            "-" +
                            newDate.substr(4, 2) +
                            "-" +
                            newDate.substr(6, 2) +
                            "T" +
                            newDate.substr(8, 2) +
                            ":" +
                            newDate.substr(10, 2) +
                            ":00-" + easternTimeOffset;

                        var easternDate = new Date(easternDateStr);

                        var dateText = month[easternDate.getMonth()] + " " + easternDate.getDate() + ", " + easternDate.getFullYear() + " at " + ("0" + easternDate.getHours()).slice(-2) + ":" + ("0" + easternDate.getMinutes()).slice(-2);
                        responseData[i].modifiedDate = dateText
                    }

                    setData(responseData),
                        setIsLoading(false)



                })
                .catch(error => {

                    console.log("error", error);
                })
        }


    }, [selectedSym]);

    const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9);
    let colors = ['#202020', '#010101'];
    return (
        <MainBackground>
            <CustomHeaderText showSearch={true} showFilterIcon={"News"} showChart={true} {...props} label="News" />
            <Loader isLoading={isLoading} />
            {errorMsg == 'No matches found.' && selectedSym != ''
                ?
                <View style={[styles.container1]}>
                    <Text style={[styles.synopsis]}>No matches found.</Text>

                </View>
                :
                <View style={[styles.container]}>
                    <FlatList
                        contentContainerStyle={{ marginTop: heightScale(20) }}
                        //data={selectedSym ? dataCheck.filter(selectedSym) : dataCheck}

                        data={dataCheck}
                        keyExtractor={(item, index) => { return keyGenerator() }}
                        renderItem={({ item, index }) => {
                            return (
                                <View key={index} style={{ backgroundColor: colors[index % colors.length] }}>
                                    <View style={styles.column}>
                                        <Text style={[styles.title]}>{item.source}</Text>
                                        <Text style={[styles.synopsis]}>{item.modifiedDate}</Text>
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL('https://bbs.newsedge.net/AMC-Streaming/' + item.url)
                                        }}>
                                            <Text style={[styles.title]}>{item.title}</Text>
                                        </TouchableOpacity>

                                        <Text style={[styles.synopsis]}>{item.synopsis}</Text>
                                    </View>


                                </View>
                            )

                        }}
                    />
                </View>
            }
        </MainBackground>
    )
}
const styles = StyleSheet.create({
    outerContainer: {

    },
    showNews: {
        marginTop: 25,
        marginLeft: widthScale(4),
        color: 'white',
        fontSize: widthScale(15),
        fontWeight: '500',
    },
    container1: {
        flex: 1,

        padding: 10,
        marginTop: heightScale(25),
        backgroundColor: '#202020'

    },
    container: {
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomWidth: 0,
        marginHorizontal: widthScale(-2),
        marginTop: heightScale(20),
        backgroundColor: '#202020'

    },
    card: {
        borderBottomWidth: 1.4,
        borderColor: '#202020',
        width: "100%",
        marginBottom: heightScale(5),
    },
    column: {
        flexDirection: 'column',
        marginTop: 4,
        margin: 10,
        marginBottom: heightScale(20),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: heightScale(5),
    },
    heading: {
        color: '#6ED25A',
        marginTop: heightScale(15),
        marginBottom: heightScale(15),
        marginHorizontal: widthScale(10),
        fontSize: widthScale(16),
        fontWeight: '600'
    },
    title: {
        color: '#6ED25A',
        marginTop: heightScale(15),
        fontSize: widthScale(14),
        fontWeight: '700',
        marginLeft: 1,
    },
    synopsis: {
        marginTop: 10,
        marginLeft: widthScale(4),
        color: 'white',
        fontSize: widthScale(12),
        fontWeight: '400',
    },


});


export default News;