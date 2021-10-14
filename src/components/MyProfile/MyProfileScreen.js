import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../CustomUI/CustomButton';
import CustomTextInput from '../../CustomUI/CustomTextInput';
import Loader from '../../CustomUI/Loader';
import strings from '../../res/strings';
import { checkspecialCharsAndNumbers, heightScale, validateEmail, widthScale } from '../../utils/Utils';
import MainBackground from '../../CustomUI/MainBackground';
import SimpleToast from 'react-native-simple-toast';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppSingleton from '../../utils/AppSingleton';
import images from '../../res/images/images';
import colors from '../../res/colors';
import { notifications_Tags, hitGetProfileActionApi, hitUpdateProfileActionApi } from '../../redux/actions/LoginAction';
import { useDispatch } from 'react-redux';
import API_URL from '../../utils/ApiUrl';

const MyProfileScreen = (props) => {

    const [email, setEmail] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [screenName, setScreenName] = useState('');
    // const [bioName, setBioName] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {

    }, [])

    const getValue = async () => {
        const myToken = await AsyncStorage.getItem('@token_key')
        const myUserId = await AsyncStorage.getItem('@userId_key')
        const dataObj = { "id": "81edc14a-8af7-44f6-886e-164df1efba99", "token": JSON.parse(myToken) }
        const getResponse = dispatch(hitGetProfileActionApi(API_URL.get_profile_data_url, dataObj))
        await getResponse.then(async (response) => {
            console.log(response, "getResponse");
            if (response.data) {
                setEmail(response.data.email)
                setFName(response.data.firstName)
                setLName(response.data.lastName)
                setScreenName(response.data.screenName)
                await AsyncStorage.setItem('@userinfo', JSON.stringify(response.data))

            }
            else {
                console.log(response, "getResponse");
            }
        })


    }
    getValue()
    const updateValue = async () => {
        const myToken = await AsyncStorage.getItem('@token_key')
        const myUserId = await AsyncStorage.getItem('@userId_key')
        const dataObj = {
            "id": "81edc14a-8af7-44f6-886e-164df1efba99", "token": JSON.parse(myToken),
            "email": email, "firstName": fName, "lastName": lName, "screenName": screenName
        }
        const getResponse = dispatch(hitUpdateProfileActionApi(API_URL.update_profile_data_url, dataObj))
        await getResponse.then(async (response) => {
            if (response.data) {
                SimpleToast.show(response.msg);
                console.log(response, "getResponsenow");
                await AsyncStorage.setItem('@userinfo', JSON.stringify(response.data))

            }
            else {
                console.log(response, "getResponse");
            }
        })


    }

    const isValidate = () => {
        let valid = true;
        if (!email) {
            console.log("jsbsjb")
            SimpleToast.show('Please enter your email.');
            valid = false;
        } else if (!validateEmail(email)) {
            SimpleToast.show("Please enter vaid email.")
            valid = false;
        } else if (!password) {
            SimpleToast.show("Please enter your password.");
            valid = false;
        } else if (!checkspecialCharsAndNumbers(password)) {
            SimpleToast.show("Password must contain atleast 1 special character , 1 number and alphabets");
            valid = false;
        } else if (password.length <= 6) {
            SimpleToast.show("Password must contain greater than 6 characters");
            valid = false;
        }
        if (valid) {
            let appUsrObj = AppSingleton.getInstance();
            appUsrObj.email = email;
            const userEmail = ['@EMAIL', email];
            try {
                AsyncStorage.multiSet([userEmail])
                props.navigation.navigate('TermsAndCondition')
            } catch (e) {
                console.log("Error saving user details", e);
            }
        }
    }


    return (
        <MainBackground>
            <KeyboardAwareScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container} >
                    <Loader isLoading={false} />
                    <View style={styles.rowFrontVisible}>
                        <Image source={{ uri: "https://images.unsplash.com/photo-1620057657132-e737f4983bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2600&q=80" }} style={styles.profileIcon} resizeMode={'cover'} />
                        <View style={{ flex: 1 }}>
                            <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.userNameTextStyle}>{fName + " " + lName}</Text>
                            <Text ellipsizeMode={'tail'} numberOfLines={1} style={[styles.userNameTextStyle, { color: colors.LIGTH_GREEN, marginTop: heightScale(5) }]}>{screenName}</Text>
                            <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.emailTextStyle}>{email}</Text>
                        </View>
                    </View>
                    <View style={{ height: 40, backgroundColor: colors.HOME_MAIN_BOX, width: "100%", borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={styles.headingTextStyle}>Active Session Limits</Text>
                    </View>
                    <View style={{ marginVertical: heightScale(15), marginHorizontal: widthScale(23) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: heightScale(10) }}>
                            <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: 'white', marginTop: heightScale(5) }} />
                            <Text style={styles.descTextStyle}>{"Your account has  access to one mobile login and one desktop login"}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: heightScale(10) }}>
                            <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: 'white', marginTop: heightScale(5) }} />
                            <Text style={styles.descTextStyle}>{"A desktop may have upto three active sessions. The fourth login will log out the oldest session"}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: heightScale(10) }}>
                            <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: 'white', marginTop: heightScale(5) }} />
                            <Text style={styles.descTextStyle}>{"A mobile login  may only have one active session"}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: heightScale(10) }}>
                            <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: 'white', marginTop: heightScale(5) }} />
                            <Text style={styles.descTextStyle}>{"If a user logs in from a different location, all other locations are logged out"}</Text>
                        </View>
                    </View>
                    <View style={{ height: 40, backgroundColor: colors.HOME_MAIN_BOX, width: "100%", alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={styles.headingTextStyle}>User Information</Text>
                    </View>
                    <View style={{ justifyContent: 'center', marginVertical: widthScale(15), marginHorizontal: widthScale(38) }}>
                        <Text style={styles.labelTxt}>{strings.email_address}</Text>
                        <TextInput
                            value={email}
                            placeholderTextColor={colors.PLACEHOLDER}
                            underlineColorAndroid={'transparent'}
                            autoFocus={false}
                            placeholder={strings.enter_email_address}
                            onChangeText={(value) => {
                                setEmail(value)
                            }}
                            style={styles.textInputBorder}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.labelTxt}>{"First Name"}</Text>
                                <TextInput
                                    value={fName}
                                    placeholderTextColor={colors.PLACEHOLDER}
                                    underlineColorAndroid={'transparent'}
                                    autoFocus={false}
                                    placeholder={"Enter First Name"}
                                    onChangeText={(value) => {
                                        setFName(value)
                                    }}
                                    style={styles.textInputBorder1}
                                />
                            </View>
                            <View>
                                <Text style={styles.labelTxt}>{"Last Name"}</Text>
                                <TextInput
                                    value={lName}
                                    placeholderTextColor={colors.PLACEHOLDER}
                                    underlineColorAndroid={'transparent'}
                                    autoFocus={false}
                                    placeholder={"Enter Last Name"}
                                    onChangeText={(value) => {
                                        setLName(value)
                                    }}
                                    style={styles.textInputBorder1}
                                />
                            </View>
                        </View>
                        <Text style={styles.labelTxt}>{"Screen Name"}</Text>
                        <TextInput
                            value={screenName}
                            placeholderTextColor={colors.PLACEHOLDER}
                            underlineColorAndroid={'transparent'}
                            autoFocus={false}
                            placeholder={"Enter Screen Name"}
                            onChangeText={(value) => {
                                setScreenName(value)
                            }}
                            style={styles.textInputBorder}
                        />
                        {/* <Text style={styles.labelTxt}>{"Bio"}</Text>
                        <TextInput
                            value={bioName}
                            placeholderTextColor={colors.PLACEHOLDER}
                            underlineColorAndroid={'transparent'}
                            autoFocus={false}
                            placeholder={"Enter Bio"}
                            onChangeText={(value) => {
                                setBioName(value)
                            }}
                            style={styles.textInputBorder}
                        /> */}
                        {/* <TouchableOpacity onPress={() => alert("Work in Progress")} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.checkGreen} resizeMode={"contain"} />
                            <Text numberOfLines={2} style={styles.filterText}>{"Enable TradeStation Trading"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert("Work in Progress")} style={{ flexDirection: 'row', alignItems: 'center', marginTop: heightScale(15) }}>
                            <Image source={images.uncheck} resizeMode={"contain"} />
                            <Text numberOfLines={2} style={styles.filterText}>{"Show Rapid Decline Alerts"}</Text>
                        </TouchableOpacity> */}
                        <CustomButton
                            style={{ marginTop: heightScale(20) }}
                            label="Update"
                            onPress={() => updateValue()} />
                    </View>

                </View>
            </KeyboardAwareScrollView>
        </MainBackground >

    )
}

export default MyProfileScreen;