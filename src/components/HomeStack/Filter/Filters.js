import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, FlatList, Image, Dimensions, Fragment } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FilterView from '../../../CustomUI/FilterView';
import MainBackground from '../../../CustomUI/MainBackground';
import colors from '../../../res/colors';
import { OlFilterOptions, FlowFirstFilterOptions, sectors, alertStreamFilters, optionAlerts,newsData ,sources} from '../../../res/constants';
import images from '../../../res/images/images';
import { getMonthNameFromDate, heightScale, myFonts, widthScale } from '../../../utils/Utils';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';
import { Calendar, CalendarList } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import CustomButton from '../../../CustomUI/CustomButton';
import { element } from 'prop-types';

LocaleConfig.locales['en'] = {
    monthNames: ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Féb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],

};
LocaleConfig.defaultLocale = 'en';

const calenderConfig = {
    calendarBackground: colors.CALENDER_BACKGROUND,
    textSectionTitleColor: '#ffffff',
    todayTextColor: colors.WHITE,
    dayTextColor: colors.WHITE,
    monthTextColor: colors.WHITE,
    textDayFontFamily: myFonts.montserratRegular,
    textMonthFontFamily: myFonts.montserratRegular,
    textDayHeaderFontFamily: myFonts.montserratSemiBold,
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: widthScale(13),
    textMonthFontSize: widthScale(12),
    textDayHeaderFontSize: widthScale(13)
}

const Filter = (props, navigation) => {
    const [filterOptions, setFilterOptions] = useState(props.route.params.tabname === 'Flow' ? FlowFirstFilterOptions : props.route.params.tabname === 'News' ? newsData : props.route.params.tabname === 'Ol' ? OlFilterOptions : props.route.params.tabname === 'Category' ? alertStreamFilters : props.route.params.tabname === 'AlertStream' ? alertStreamFilters : optionAlerts);
    const [sectors1, setSectors] = useState(sectors);
    const [routeName, setRouteName] = useState(props.route.params.tabname);
    const [showCalenderModal, setShowCalenderModal] = useState(false);
    const calenderRef = useRef(null);
    const [period, setPeriod] = useState({});
    const [periodArr, setPeriodArr] = useState([]);
    const [isStartDatePicked, setIsStartDatePicked] = useState(false);
    const [isDate, setDate] = useState(false);
    const [isEndDatePicked, setIsEndDatePicked] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [firstMonth, setFirstMonth] = useState('');
    const [secondMonth, setSecondMonth] = useState('');
    const [selectedIndexValue, setSelectedIndexValue] = useState(null);
    const [flowSelection, setFlowSelection] = useState([]);
    const [val, setVal] = useState('');
    const [sources1, setSources1] = useState(sources);

    useEffect(() => {
        props.navigation.setParams({ resetClicked: resetFilters });
    }, [resetFilters])



    const resetFilters = () => {
        let options = [...filterOptions];
        options.forEach(item => {
            item.selected = false;
        })
        setFilterOptions([...options]);
        let options1 = [...sectors1];
        options1.forEach(item => {
            item.selected = false;
        })
        let options2 = [...sources1];
        options2.forEach(item => {
            item.selected = false;
        })
        setSectors([...options1]);
        setSources1([...options2])
        setStartDate('');
        setEndDate('');
        setPeriod({})
    }

    const setSeletctedItem = (index) => {

        let options = [...filterOptions];
        options.forEach((element, index) => {
            element.selected = false;
        });
        if (!options[index].selected) {
            options[index].selected = true;
        } else {
            options[index].selected = false;
        }

        setSelectedIndexValue(options[index].id)
        setFilterOptions([...options]);


    }

    const setSeletctedSectorsItemMulti = (index, type) => {
        let options = [...sectors1];
        let optionsFilters = [...filterOptions];
        let selectedFlows = []
        if (type == 'sectors') {
            if (options[index].selected) {
                options[index].selected = false;
            } else {
                options[index].selected = true;
            }

            setSectors([...options]);
            setSelectedIndexValue(options[index].id)
        } else {
            if (optionsFilters[index].selected) {
                optionsFilters[index].selected = false;
            } else {
                optionsFilters[index].selected = true;
            }
            setFilterOptions([...optionsFilters]);
            setSelectedIndexValue(optionsFilters[index].id)
        }
        options.forEach(element => {
            if (element.selected) {
                selectedFlows.push(element.id);
            }
        });
        optionsFilters.forEach(element => {
            if (element.selected) {
                selectedFlows.push(element.id);
            }
        });
        setFlowSelection([...selectedFlows])

    }

    const setSeletctedAlertStraemItemMulti = (index, type) => {
        let optionsFilters = [...filterOptions];
        let selectedFlows = []

        if (optionsFilters[index].selected) {
            optionsFilters[index].selected = false;
        } else {
            optionsFilters[index].selected = true;
        }
        setFilterOptions([...optionsFilters]);
        setSelectedIndexValue(optionsFilters[index].id)

        optionsFilters.forEach(element => {
            if (element.selected) {
                selectedFlows.push(element.id);
            }
        });
        setFlowSelection([...selectedFlows])

    }
    const setSeletctedNewsFilter = (index, type) => {
        let options = [...sources1];
        console.log("checkop",options)
        let optionsFilters = [...filterOptions];
        let selectedFlows = []
        if (type == 'sources') {
            if (options[index].selected) {
                options[index].selected = false;
            } else {
                options[index].selected = true;
            }

            setSources1([...options]);
            setSelectedIndexValue(options[index].title)
        } else {
            if (optionsFilters[index].selected) {
                optionsFilters[index].selected = false;
            } else {
                optionsFilters[index].selected = true;
            }
            setFilterOptions([...optionsFilters]);
            setSelectedIndexValue(optionsFilters[index].title)
        }
        options.forEach(element => {
            if (element.selected) {
                selectedFlows.push(element.title);
            }
        });
        optionsFilters.forEach(element => {
            if (element.selected) {
                selectedFlows.push(element.title);
            }
        });
        setFlowSelection([...selectedFlows])
        // let optionsFilters = [...filterOptions];
        // let selectedFlows = []

        // if (optionsFilters[index].selected) {
        //     optionsFilters[index].selected = false;
        // } else {
        //     optionsFilters[index].selected = true;
        // }
        // setFilterOptions([...optionsFilters]);
        // setSelectedIndexValue(optionsFilters[index].id)

        // optionsFilters.forEach(element => {
        //     if (element.selected) {
        //         selectedFlows.push(element.id);
        //     }
        // });
        // setFlowSelection([...selectedFlows])

    }
    const onDateChange = (date) => {

        console.log("date.....", date);
    }


    const CustomHeader = React.forwardRef((props, ref) => {
        console.log("props....", getMonthNameFromDate(props.month))
        return (
            <View ref={ref} {...props} style={styles.customHeader}>
                <Text style={styles.monthNameStyle}>{getMonthNameFromDate(props.month)}</Text>
            </View>
        );
    });


    var last = (array) => {

        if (array !== null) {
            let newArr = array.slice(Math.max(array.length - 2, 0));
            console.log("array...", newArr);
        }
    };
    var getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };
    const markPeriodFunc = (day) => {
        let newArr = [...periodArr];
        newArr.push(day.dateString);
        let newMarkedDates = {};
        let firstDate = moment(startDate);
        let endDate1 = moment(day.dateString);
        let range = endDate1.diff(firstDate, 'days')
        var tempStartDate = null
        if (!endDate) {
            tempStartDate = startDate
            newMarkedDates[startDate] = { startingDay: true, color: colors.SELECTED_DATE_COLOR, textColor: 'black', selected: true }
        } else if(endDate && day.dateString && !isDate ) {
        
            newMarkedDates[startDate] = { startingDay: true,color: colors.SELECTED_DATE_COLOR, textColor: 'black', selected: true }
        }
        if (isDate) {
            if (moment(day.dateString) > moment(startDate)) {
                let daylist = getDaysArray(new Date(day.dateString), new Date(endDate));
                let b = []
                for (let i = 0; i < daylist.length; i++) {

                    b.push(moment(daylist[i]).format('YYYY-MM-DD'))
                    if (i == 0) {
                        newMarkedDates[b[i]] = { startingDay: true, color: colors.SELECTED_DATE_COLOR, textColor: 'black', selected: true, marked: true }
                    } else if (i == daylist.length - 1) {
                        newMarkedDates[b[i]] = { endingDay: true, color: colors.SELECTED_DATE_COLOR, textColor: 'black', }
                    } else {
                        newMarkedDates[b[i]] = { color: colors.SELECTED_DATE_COLOR_INNER, textColor: 'black', }
                    }

                }
            } else if(moment(day.dateString) < moment(startDate)) {
                newMarkedDates[startDate] = { startingDay: true, color: colors.SELECTED_DATE_COLOR, textColor: 'black', selected: true }
            }

        } else {
            if (range > 0) {
                for (let i = 1; i <= range; i++) {
                    let tempDate = firstDate.add(1, 'day');
                    tempDate = moment(tempDate).format('YYYY-MM-DD')
                    if (i < range) {
                        newMarkedDates[tempDate] = { color: colors.SELECTED_DATE_COLOR_INNER, textColor: 'black', }
                    } else {
                        newMarkedDates[tempDate] = { endingDay: true, color: colors.SELECTED_DATE_COLOR, textColor: 'black', }
                    }
                }
            }

        }



        console.log("newMarkedDates", newMarkedDates);
        setPeriod(newMarkedDates);
        setTimeout(() => {
            if (isDate) {
                setStartDate(day.dateString);
            } else {
                setEndDate(day.dateString);

            }

            setShowCalenderModal(!showCalenderModal)
        }, 800)


    }
    const onChangeText = (text) => {
        setVal(text)
    
    }
    return (
        <>
            <MainBackground>

                {routeName === 'Ol' &&
                    <FlatList
                        data={filterOptions}
                        renderItem={({ item, index }) =>
                            <FilterView
                                title={item.title}
                                checked={item.selected}
                                onPress={() => {
                                    setSeletctedItem(index);
                                    console.log("checked valye")
                                }} />}
                    />
                }
                {routeName == 'Flow' &&
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={filterOptions}
                                numColumns={2}
                                renderItem={({ item, index }) =>
                                    <FilterView
                                        title={item.title}
                                        numColumns={true}
                                        checked={item.selected}
                                        onPress={() => {
                                            setSeletctedSectorsItemMulti(index, 'filter');
                                            console.log("checked valye")
                                        }} />}
                            />

                            <Text style={styles.headingStyle}>Sectors</Text>

                            <FlatList
                                data={sectors1}
                                numColumns={2}
                                renderItem={({ item, index }) =>
                                    <FilterView
                                        title={item.title}
                                        numColumns={true}
                                        checked={item.selected}
                                        onPress={() => {
                                            setSeletctedSectorsItemMulti(index, 'sectors');
                                            console.log("checked valye")
                                        }} />}
                            />

                            <Text style={styles.headingStyle}>Expiration</Text>

                            <Text style={styles.dateText}>Start Date</Text>
                            <TouchableOpacity onPress={() => { setShowCalenderModal(!showCalenderModal); setDate(true) }}>
                                <View style={styles.row}>
                                    <Text style={styles.placeholderText}>{startDate ? moment(startDate).format('MM-YYYY-DD') : moment(new Date()).format('MM-YYYY-DD')}</Text>
                                    <Image source={images.calenderGrey} />
                                </View>
                            </TouchableOpacity>

                            <Text style={styles.dateText}>End Date</Text>
                            <TouchableOpacity onPress={() => { setShowCalenderModal(!showCalenderModal); setDate(false) }}>
                                <View style={styles.row}>
                                    <Text style={styles.placeholderText}>{endDate ? moment(endDate).format('MM-YYYY-DD') : moment(new Date()).format('MM-YYYY-DD')}</Text>
                                    <Image source={images.calenderGrey} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                }
                {routeName == 'AlertStream' &&
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={filterOptions}
                                renderItem={({ item, index }) =>
                                    <FilterView
                                        title={item.title}
                                        checked={item.selected}
                                        onPress={() => {
                                            setSeletctedAlertStraemItemMulti(index, 'filter')
                                            // setSeletctedSectorsItemMulti(index,'filter');
                                            console.log("checked valye")
                                        }} />}
                            />

                        </View>
                    </ScrollView>

                }
                 {routeName == 'Category' &&
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={filterOptions}
                                renderItem={({ item, index }) =>
                                    <FilterView
                                        title={item.title}
                                        checked={item.selected}
                                        onPress={() => {
                                            setSeletctedAlertStraemItemMulti(index, 'filter')
                                            // setSeletctedSectorsItemMulti(index,'filter');
                                            console.log("checked valye")
                                        }} />}
                            />

                        </View>
                    </ScrollView>

                }
                   {routeName == 'News' &&
                    <ScrollView contentContainerStyle={{ flexGrow: 1 ,flexDirection:'column',padding:15 }}>
                        <View style={styles.queryView}>
                           <Text style={styles.queryTitle}>QUERY</Text>
                        </View>
                        <View style={styles.searchView}>
                        <TextInput 
         style={styles.textInput}
         onChangeText={(value) => {
            onChangeText(value)
        }}
        value={val}
         underlineColorAndroid='transparent'
         placeholderTextColor='white'
         placeholder="Enter text here" />
                        </View>
                       
                        <View style={{ marginTop:85}}>
                        <Text style={styles.queryTitle}>Filter by</Text>
                            <FlatList
                                data={filterOptions}
                                numColumns={2}
                                renderItem={({ item, index }) =>
                              
                                    <FilterView
                                        numColumns={true}
                                        title={item.title}
                                        checked={item.selected}
                                        onPress={() => {
                                            setSeletctedNewsFilter(index, 'filter')
                                            // setSeletctedSectorsItemMulti(index,'filter');
                                            console.log("checked valye")
                                        }} />
                                   }
                            />

                        </View>

                        
                  <View>
                       <Text style={styles.queryTitle1}>Sources</Text>
                        </View> 

<FlatList
    data={sources1}
    numColumns={2}
    renderItem={({ item, index }) =>
        <FilterView
            title={item.title}
            numColumns={true}
            checked={item.selected}
            onPress={() => {
                setSeletctedNewsFilter(index, 'sources');
                console.log("checked valye")
            }} />}
/>



                    </ScrollView>

                }

                {routeName == 'Alerts' &&
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={filterOptions}
                                renderItem={({ item, index }) =>
                                    <FilterView
                                        title={item.title}
                                        checked={item.selected}
                                        onPress={() => {
                                            setSeletctedItem(index);
                                            console.log("checked valye")
                                        }} />}
                            />

                        </View>
                    </ScrollView>
                }
                {false &&
                    <FlatList
                        data={filterOptions}
                        renderItem={({ item, index }) =>
                            <FilterView
                                title={item.title}
                                checked={item.selected}
                                onPress={() => {
                                    setSeletctedItem(index);
                                    console.log("checked valye")
                                }} />}
                    />
                }

                <View style={styles.btnsView}>
                    <CustomButton
                        label="Apply Filter"
                        style={{ flex: 0.4, height: heightScale(150) }}
                        onPress={() => {
                            let tabName = props.route.params.tabname;
                            if (tabName === 'AlertStream') {
                                let indexValue = tabName === 'AlertStream' ? [...flowSelection] : selectedIndexValue;
                                props.navigation.navigate('AlertStream', { params: { indexValue: indexValue }, screen: tabName })
                            }else if(tabName === 'News'){
                                let indexValue = tabName === 'News' ? [...flowSelection] : selectedIndexValue;
                                let textValue = tabName === 'News' ? val : val
                            
                             props.navigation.navigate('News', { params: { indexValue: indexValue,textValue:textValue}, screen: tabName })
                            } 
                            else if(tabName === 'Category' ){
                                let indexValue = tabName === 'Category' ? [...flowSelection] : selectedIndexValue;
                                props.navigation.navigate('Category', { params: { indexValue: indexValue }, screen: tabName })
                            
                             props.navigation.navigate('Category', { params: { indexValue: indexValue}, screen: tabName })
                            }else {
                                let indexValue = tabName === 'Flow' ? [...flowSelection] : selectedIndexValue;
                                props.navigation.navigate('Options', { params: { indexValue: indexValue }, screen: tabName })
                            }



                        }} />

                    <CustomButton
                        label="Cancel"
                        style={{ flex: 0.4, height: heightScale(150) }}
                        gradientArray={['#F12D2D', '#AF0B0B']}
                        onPress={() => {
                            props.navigation.goBack()
                        }} />
                </View>

            </MainBackground>
            <Modal isVisible={showCalenderModal} style={styles.modalStyle}>
                <View style={styles.calenderView}>

                    <TouchableOpacity style={styles.btnTop} onPress={() => { setShowCalenderModal(false); setIsStartDatePicked(true) }}>
                        <Image source={images.calenderCorss} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <View style={styles.calenderView1}>
                        <View style={{ height: Dimensions.get('screen').height - heightScale(300) }}>
                            <CalendarList
                                ref={calenderRef}
                                calendarHeight={heightScale(350)}
                                current={new Date()}
                                minDate={new Date()}

                                scrollEnabled={true}
                                onDayPress={(day) => {

                                    if (!startDate) {

                                        setStartDate(day.dateString);
                                        let newMarkedDates = {};
                                        newMarkedDates[day.dateString] = { startingDay: true, textColor: 'white', selected: true, marked: true, dotColor: colors.APP_GREEN, }
                                        setPeriod(newMarkedDates);
                                        setShowCalenderModal(!showCalenderModal)

                                    }

                                    else {
                                        markPeriodFunc(day)

                                    }
                                }}
                                markedDates={period}
                                markingType={'period'}
                                theme={calenderConfig}
                                hideArrows={true}
                                renderHeader={(date) => { return <Text style={styles.monthNameStyle}>{getMonthNameFromDate(date)}</Text> }}
                            //renderHeader={(date) => {return null}}
                            //customHeader={CustomHeader}
                            />
                        </View>

                    </View>
                    <View style={{ height: heightScale(25), width: "100%", position: 'absolute', bottom: heightScale(20) }}>
                        <Text style={{ color: colors.LIGTH_GREEN, fontSize: widthScale(14), textAlign: 'center' }}>Wednesday, June 16, 2021</Text>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    headingStyle: {
        fontFamily: myFonts.montserratBold,
        color: colors.WHITE,
        fontSize: widthScale(14),
        marginTop: heightScale(25),
        marginBottom: heightScale(21),
        marginLeft: widthScale(25)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: widthScale(25),
        borderBottomWidth: 0.5,
        borderBottomColor: '#B3BFD0',
        marginBottom: heightScale(25)
    },
    dateText: {
        fontFamily: myFonts.montserratRegular,
        fontSize: widthScale(14),
        color: colors.APP_GREEN,
        marginLeft: widthScale(25),
        marginBottom: heightScale(8)

    },
    placeholderText: {
        fontFamily: myFonts.montserratRegular,
        fontSize: widthScale(14),
        color: colors.PASSWORD_EXAMPLE,
        //lineHeight:30
        marginBottom: heightScale(11)
        //  marginLeft:widthScale(25)
    },
    iconStyle: {
        marginRight: widthScale(10),
        width: 80,
        height: 40
    },
    calenderView: {
        height: Dimensions.get('screen').height - heightScale(181),
        width: '100%',
        backgroundColor: colors.CALENDER_BACKGROUND,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    calenderView1: {
        backgroundColor: colors.CALENDER_BACKGROUND,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        top: -15
    },
    customHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: widthScale(15),
        paddingVertical: heightScale(20)
    },
    monthNameStyle: {
        color: 'white',
        fontSize: widthScale(14),
        lineHeight: 17,
        fontFamily: myFonts.montserratMedium,
        textAlign: 'center',
        paddingVertical: heightScale(20)
    },
    viewLine: {
        borderWidth: 1,
        borderColor: colors.VIEW_BORDER_COLOR,
        width: '100%',
        marginBottom: heightScale(20)
    },
    btnTop: {
        top: -20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.CALENDER_BACKGROUND,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalStyle: {
        justifyContent: 'flex-end', alignItems: 'center',
        marginBottom: 0
    },
    btnsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightScale(0),
        paddingHorizontal: widthScale(20)
    },
    searchView:{
        marginTop:15
    },
    queryView:{
marginTop:20
    },
    queryTitle:{
        color:'white',
        fontWeight: '600',
        fontSize:14,
  

    },
    queryTitle1:{
        color:'white',
        fontWeight: '600',
        fontSize:14,
        marginTop:30
      

    },
    textInput: {
        marginTop:5,
        position: 'absolute',
        width: '100%',
        height: 42,
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#808080',
        backgroundColor: '#202020',
        paddingLeft: 15,
        color: colors.WHITE,
     
      }
})

export default Filter;