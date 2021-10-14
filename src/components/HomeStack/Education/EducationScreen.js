import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, FlatList, Button, SafeAreaView, Linking } from 'react-native';
import MainBackground from '../../../CustomUI/MainBackground';
import { WebView } from 'react-native-webview';
import colors from '../../../res/colors';
import { widthScale, heightScale, myFonts } from '../../../utils/Utils';
import images from '../../../res/images/images';
import Loader from '../../../CustomUI/Loader';
import { Calendar } from 'react-native-big-calendar'
import moment from 'moment';
import { ScrollView } from 'react-native';
import { set } from 'react-native-reanimated';



const EducationScreen = (props) => {
    const [current, setCurrent] = useState(new Date())
    const [calendarMode, setCalendarMode] = useState("month");
    const [selectedTab, setSelectedTab] = useState(0);
    const [Helpdata, setData] = useState([]);
    const [Optiondata, setOptiondata] = useState([]);
    const [finalCalendarData, setFinalCalendarData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const [count, setCount] = useState(false);
    const [month, setMonth] = useState("");
    const [showModal, setShowModal] = useState(true);
    const [calendarDara, setCalendarData] = useState([]);
    const [calendarDara1, setCalendarData1] = useState([]);
    const [showDay, setShowDay] = useState('');
    const [showStart, setShowStart] = useState('');
    const [showEnd, setShowEnd] = useState('');


    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        setCount(false)
    };

    const handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        setVisible(false);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onClickTabTab = (ids) => {
        setIsLoading(true)
        setSelectedTab(ids)
        setTimeout(() => {
            setIsLoading(false)
        }, 1500);

    }

    useEffect(() => {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        setStartDay(startOfMonth)
        const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
        setEndDay(endOfMonth)
        getevents(startOfMonth, endOfMonth)
        mydata(startOfMonth, endOfMonth)


    }, [])

    const getevents = async (startDate, endDate) => {
        setIsLoading(true)
        let response = await fetch('https://svc.blackboxstocks.com:8103/Calendar/GetWebinars?from=' + startDate + '&to=' + endDate + '', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Apikey: '8ac2c890-df0e-4f3e-b002-ae1e02c2ecc4'
            },

        })
        response = await response.json()
        setCalendarData(response)
        response.length > 0 ? setIsLoading(false) : setIsLoading(true)
        const arra = response.map((item) => {
            return {
                title: item.title,
                start: new Date(item.start.replace(' ', 'T')),
                end: new Date(item.end.replace(' ', 'T')),
            }

        })
        setFinalCalendarData([...arra], setIsLoading(false))


    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('https://svc.blackboxstocks.com:8103/HelpText?type=EquitiesHelp')
            response = await response.json()
            setData(response)

        }

        fetchMyAPI()

        async function fetchMyAPI2() {
            let response = await fetch('https://svc.blackboxstocks.com:8103/HelpText?type=OptionsHelp')
            response = await response.json()
            setOptiondata(response)

        }

        fetchMyAPI2()

    }, []);



    const mydata = async (startDate, endDate) => {
        let response = await fetch('https://svc.blackboxstocks.com:8103/Calendar/GetCalendarEvents?from=' + startDate + '&to=' + endDate + '', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Apikey: '8ac2c890-df0e-4f3e-b002-ae1e02c2ecc4'
            },

        })
        response = await response.json()

        let newarr = response.map((item) => {
            return {
                title: item.title,
                start: new Date(item.start.replace(' ', 'T')),
                end: new Date(item.end.replace(' ', 'T')),
            }

        })
        setFinalCalendarData([...newarr])


    }
    const clickOnBack = () => {
        setCalendarMode("month")
        setCount(false)
    }
    const handleCellPress = (date) => {
        setVisible(false)
        setCount(true)
        setCalendarMode("day")
        setCurrent(date)
        console.log("calendar data", current, startDay, endDay)

    }

    useEffect(() => {
        console.log('Do something after counter has changed', count);

    }, [count]);

    function setNewDates(date) {
        const get_month = moment(date[0]).format("MMMM-YYYY")
        setMonth(get_month)
        if (count) {
            return;
        }
        else {
            let newStart = moment(date[0]).format('YYYY-MM-DD')
            setStartDay(newStart)
            let newEnd = moment(date[1]).add(1, 'd').format('YYYY-MM-DD')
            setEndDay(newEnd)
            mydata(newStart, newEnd)
            getevents(newStart, newEnd)
        }
    }


    const uri = "http://docs.google.com/gview?embedded=true&url=https://www.blackboxstocks.com/help/stockalertkey.pdf";
    const uri1 = "https://intercom.help/blackboxstocks/en/";
    const uri2 = "http://docs.google.com/gview?embedded=true&url=https://www.blackboxstocks.com/help/optionskey.pdf";

    const calendarDetails = (item) => {
        var selectedDate = item.end.toISOString()
        var removeSeconds = (selectedDate.replace('00.000Z', '00Z'))
        var modifyDate = (removeSeconds.replace('T', ' '))
        let data = [];
        for (var i = 0; i < calendarDara.length; i++) {
            if (calendarDara[i].end == modifyDate) {
                data.push(calendarDara[i])


            }


        }
        var start = item.start
        var showStart = new Date(item.start);
        showStart.setHours(showStart.getHours() - 3);
        var showEnd = new Date(item.end);
        showEnd.setHours(showEnd.getHours() - 3);
        var day = moment(showEnd).format('ddd, MMM Do');
        var startTime = moment(showStart).format('h:mm A')
        var endTime = moment(showEnd).format('h:mm A')
        setShowDay(day)
        setShowEnd(endTime)
        setShowStart(startTime)
        setCalendarData1(data)
        setCount(true)
        setVisible(true);



    }

    const Modal = () => {
        return (
            <View style={styles.container}>
                <View style={{ margin: widthScale(20), marginTop: widthScale(10) }}>
                    <View style={styles.headerView}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.date}>{showDay} {showStart} - {showEnd}</Text>
                            <Text style={styles.date}>GMT+5:30</Text>
                        </View>

                        <TouchableOpacity onPress={() => { setCount(false) }}>
                            <Text style={{ color: 'white', marginLeft: widthScale(10) }}>Close</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        borderBottomColor: colors.WHITE,
                        borderBottomWidth: 1,
                    }}></View>
                    <View style={styles.innerContainer}>
                        <Text style={styles.innerText1}>{calendarDara1[0].title}</Text>
                        <Text style={styles.innerText}>{calendarDara1[0].webinar.description}</Text>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(calendarDara1[0].url)
                        }}>
                            <Text style={styles.url}>{calendarDara1[0].url}</Text>
                        </TouchableOpacity>


                    </View>
                    <View style={{
                        borderBottomColor: colors.WHITE,
                        borderBottomWidth: 1,

                    }}></View>
                </View>


            </View >

            // <View style={styles.container}>

            // </View>
        );

    }

    return (

        <MainBackground>

            <View style={{ flex: 1 }}>

                <View style={styles.barConStyle}>

                    <TouchableOpacity onPress={() => onClickTabTab(0)} style={[styles.leftBarStyle,]}>
                        <Image source={selectedTab == 0
                            ? images.class_calGreen
                            : images.class_cal} resizeMode={"contain"} />
                        <Text ellipsizeMode={"tail"} numberOfLines={2} style={[styles.barTextStyle,
                        selectedTab == 0 && { color: colors.LIGTH_GREEN, fontFamily: myFonts.montserratSemiBold }]}>{"CLASS\nCALENDAR"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onClickTabTab(1)} style={[styles.medBarStyle]}>
                        <Image source={selectedTab == 1
                            ? images.stock_guideGreen :
                            images.stock_guide}
                            resizeMode={"contain"} />
                        <Text ellipsizeMode={"tail"} numberOfLines={2} style={[styles.barTextStyle,
                        selectedTab == 1 && { color: colors.LIGTH_GREEN, fontFamily: myFonts.montserratSemiBold }]}>{"STOCK\nGUIDE"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onClickTabTab(3)} style={[styles.rightBarStyle]}>
                        <Image source={selectedTab == 3
                            ? images.option_guideGreen :
                            images.option_guide}
                            resizeMode={"contain"} />
                        <Text ellipsizeMode={"tail"} numberOfLines={2} style={[styles.barTextStyle,
                        selectedTab == 3 && { color: colors.LIGTH_GREEN, fontFamily: myFonts.montserratSemiBold }]}>{"OPTIONS\nGUIDE"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onClickTabTab(2)} style={[styles.medBarStyle]}>
                        <Image source={selectedTab == 2
                            ? images.faq_green :
                            images.faq}
                            resizeMode={"contain"} />
                        <Text ellipsizeMode={"tail"} numberOfLines={2} style={[styles.barTextStyle,
                        selectedTab == 2 && { color: colors.LIGTH_GREEN, fontFamily: myFonts.montserratSemiBold }]}>{"FAQs"}</Text>
                    </TouchableOpacity>
                </View>

                {selectedTab == 0 ?

                    <View style={{ flex: 1, }}>
                        {count == true && visible == true ? <Modal /> : null}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>

                            <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginHorizontal: 5 }}>{month}</Text>

                        </View>
                        {

                            calendarMode == "day" ?
                                <TouchableOpacity style={{ marginTop: 5 }} onPress={() => {
                                    clickOnBack()
                                }}>
                                    <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 15, marginHorizontal: 5 }}>Back</Text>
                                </TouchableOpacity>
                                : null
                        }

                        <Calendar
                            step
                            date={current}
                            events={finalCalendarData}
                            height={20}
                            mode={calendarMode}
                            onPressCell={handleCellPress}
                            onChangeDate={setNewDates}
                            onPressEvent={(item) => {
                                calendarDetails(item)
                            }}




                        />
                    </View>
                    :
                    selectedTab == 1 ?
                        <FlatList
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            data={Helpdata}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <View>
                                        <View style={styles.rowStyle}>
                                            <View style={{ flexDirection: "row", marginLeft: 6 }}>
                                                <Text style={{ color: item.color, fontSize: 5, paddingTop: 6 }}>{'\u2B24'}</Text>
                                                <Text style={{ color: item.color == 'CYAN' ? '#00FFFF' : item.color }}> {item.label} : {item.description}{'\n'}</Text>
                                            </View>
                                        </View>
                                        <View style={{ height: 0.5, backgroundColor: colors.HOME_MAIN_BOX, width: "100%" }} />
                                    </View>
                                )
                            }}
                        />
                        :
                        selectedTab == 2 ?
                            <WebView
                                showsVerticalScrollIndicator={false}
                                bounces={false}
                                useWebKit={true}
                                source={{ uri: 'https://intercom.help/blackboxstocks/en/' }}
                                style={{}}
                            />

                            :
                            selectedTab == 3 ? <FlatList
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                                data={Optiondata}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View>
                                            <View style={styles.rowStyle}>
                                                <View style={{ flexDirection: "row", marginLeft: 6 }}>
                                                    <Text style={{ color: item.color, fontSize: 5, paddingTop: 6 }}>{'\u2B24'}</Text>

                                                    <Text style={{ color: '#6495ed' }}> {item.label} :

                                                            <Text style={{ color: item.color }}>
                                                            {item.description}   </Text> </Text>



                                                </View>

                                            </View>
                                            <View style={{ height: 0.5, backgroundColor: colors.HOME_MAIN_BOX, width: "100%" }} />
                                        </View>
                                    )
                                }}
                            /> :
                                <View />}
            </View>
            <Loader isLoading={isLoading} />

        </MainBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: widthScale(15),
        marginTop: widthScale(5),
        borderColor: colors.WHITE,
        borderWidth: 2,
        //flex: 0.5,
        backgroundColor: colors.BLACK,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: widthScale(10)

    },
    date: {
        fontFamily: myFonts.montserratSemiBold,
        fontSize: widthScale(16),
        color: colors.WHITE,
        fontWeight: '800'
    },
    innerText: {
        fontFamily: myFonts.montserratSemiBold,
        fontSize: widthScale(14),
        color: colors.WHITE
    },
    innerText1: {
        fontFamily: myFonts.montserratSemiBold,
        fontSize: widthScale(15),
        color: colors.WHITE,
        fontWeight: '900'
    },
    url: {
        color: colors.LIGTH_GREEN
    },
    headerView: {
        flexDirection: 'row',
        margin: widthScale(5),
        justifyContent: 'space-between',

    },
    innerContainer: {
        margin: widthScale(10),
        flexDirection: 'column',
        justifyContent: 'space-between'


    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00ff00',
        padding: 100,
    },
    text: {
        color: '#3f2949',
        marginTop: 10,
    },
    barConStyle: {
        backgroundColor: "#202020",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightScale(5),
        width: '100%'
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: widthScale(20),
        marginVertical: heightScale(24),

    },
    leftBarStyle: {
        paddingVertical: heightScale(15),
        paddingHorizontal: widthScale(10),
        width: widthScale(110),
        alignItems: 'center'
    },
    medBarStyle: {
        paddingVertical: heightScale(15),
        paddingHorizontal: widthScale(10),
        width: '25%',
        alignItems: 'center'
    },
    rightBarStyle: {
        paddingVertical: heightScale(15),
        paddingHorizontal: widthScale(10),
        width: '25%',
        alignItems: 'center'
    },
    barTextStyle: {
        fontSize: widthScale(10),
        color: colors.FORGOT_PASSWORD,
        textAlign: 'center',
        fontFamily: myFonts.montserratSemiBold,
        marginTop: heightScale(7)
    },

});

export default EducationScreen;