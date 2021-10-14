import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import CustomSwitch from '../../CustomUI/CustomSwitch';
import MainBackground from '../../CustomUI/MainBackground';
import colors from '../../res/colors';
import { settings } from '../../res/constants';
import { heightScale, myFonts, widthScale } from '../../utils/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const MySettings = (props) => {
    const [settingsData, setSettings] = useState(settings);
    const [checkData, setCheckData] = useState();
    const [selectedTags, setselectedTags] = useState();
    const [token, setToken] = useState();
    const [email, setEmail] = useState();
    const [fcm, setfcm] = useState();
    const isFocused = useIsFocused();
    const saveNotificationTag = useSelector(state => state.user.notification)

    async function myData() {
        let tokenVal = await AsyncStorage.getItem('@token_key')
        let emailVal = await AsyncStorage.getItem('@email_key')
        let fcmVal = await AsyncStorage.getItem('fcmToken')
        let val = await AsyncStorage.getItem('@storage_Key')

        let valTag = JSON.parse(val)
        console.log("checkval", valTag)
        let settingsDataText = []
        setToken(JSON.parse(tokenVal))
        setEmail(emailVal)
        setselectedTags(valTag)
        settingsDataText = settingsData.map(data => data.text.split(" ").join(""))

        let matchedTag = [];
        valTag.forEach(
            element => {
                var index = settingsDataText.indexOf(element)
                settingsData[index].selected = true

            }
        )
        // for (var i = 0; i < matchedTag.length; i++) {
        //     settingsData[i].selected = true;

        // }
        setSettings([...settingsData]);
        console.log("tagvalues", settingsData, matchedTag)

    }

    useEffect(() => {
        if (isFocused) {
            myData()
        }

    }, [isFocused])


    const selectItem = item => {
        item.selected = !item.selected;
        let settings = [...settingsData];

        settings.forEach(element => {
            if (element.text == item.text && !element.selected) {
                element.selected = false;
            } else if (element.text == item.text && element.selected) {
                element.selected = true;
            }
        });
        let selectedTags = settings.filter(value => value.selected);
        let tagsToPost = selectedTags.map(data => data.text.split(" ").join(""));
        setSettings([...settings]);

        let data1 = {
            token: token,
            username: email,
            handle: "eRd0cOVSTZ6g3mnNB4qP6s:APA91bHghHeamZj_BYxxzK15FeEPMPGsvhSy24yLDecKpJBWCCvwc7_bgDUwB4xEZTjsGt9EpTqTmRmArcnPSzPLW6H0P0JE9N_ioDtsrNwNkkm5QeTpxJ-hTERSmbNUCzthoo9SNVAW",
            devicePlatform: "fcm",
            tags: tagsToPost
        }

        axios.post('https://svc.blackboxstocks.com:8102/notifications/register', data1)
            .then(async (response) => {
                if (response.status == 200) {
                    console.log("checkasyncdata", response, tagsToPost)
                    await AsyncStorage.setItem('@storage_Key', JSON.stringify(tagsToPost))
                }



            })
            .catch(error => {
                console.log("error", error);
                SimpleToast.show("You are not a registered user.")
                setIsLoading(false)
            })



    };

    return (
        <MainBackground>
            <FlatList
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={settingsData}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <View style={styles.rowStyle}>
                                <Text style={styles.textStyle}>{item.text}</Text>
                                <CustomSwitch switchOn={item.selected} onPress={() => selectItem(item)} />
                            </View>
                            <View style={{ height: 0.5, backgroundColor: colors.HOME_MAIN_BOX, width: "100%" }} />
                        </View>
                    )
                }}
            />
        </MainBackground>
    )
}

const styles = StyleSheet.create({
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: widthScale(20),
        marginVertical: heightScale(24),

    },
    textStyle: {
        fontSize: widthScale(16),
        fontFamily: myFonts.montserratMedium,
        lineHeight: 20,
        color: colors.WHITE
    }
})

export default MySettings;