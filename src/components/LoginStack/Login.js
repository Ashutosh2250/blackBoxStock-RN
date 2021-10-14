import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../CustomUI/CustomButton';
import CustomTextInput from '../../CustomUI/CustomTextInput';
import Loader from '../../CustomUI/Loader';
import strings from '../../res/strings';
import { checkspecialCharsAndNumbers, heightScale, validateEmail, widthScale } from '../../utils/Utils';
import MainBackground from '../../CustomUI/MainBackground';
import SimpleToast from 'react-native-simple-toast';
import styles from './LoginStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppSingleton from '../../utils/AppSingleton';
import API_URL from '../../utils/ApiUrl';
import { useDispatch } from 'react-redux';
import { notifications_Tags, hitLoginActionApi } from '../../redux/actions/LoginAction';
import colors from '../../res/colors';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getValue()
    }, [])

    const getValue = async () => {
        const myEmail = await AsyncStorage.getItem('@email_key')
        setEmail(myEmail)
    }

    const isValidate = () => {
        let valid = true;
        if (!email) {
            SimpleToast.show('Please enter your email.');
            valid = false;
        } else if (!validateEmail(email)) {
            SimpleToast.show("Please enter vaid email.")
            valid = false;
        } else if (!password) {
            SimpleToast.show("Please enter your password.");
            valid = false;
        } else if (!checkspecialCharsAndNumbers(password)) {
            SimpleToast.show("Password must contain atleast 1 number and alphabets");
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
                hitLoginAPI()
            } catch (e) {
                console.log("Error saving user details", e);
            }
        }
    }

    const hitLoginAPI = async () => {
        const g = { "grant_tye": "password", "userName": email, "passwordhash": password }
        const getResponse = dispatch(hitLoginActionApi(API_URL.login_url, g))
        await getResponse.then(async (response) => {
            const getToken = response && response.data && response.data.accessToken ? response.data.accessToken : "";
            console.log(getToken, "login response", response, response.data.notificationsTags)
            props.navigation.navigate('TermsAndCondition', { token: getToken })
            setIsLoading(false)
            let array1 = (response.data.notificationsTags).split(',');
            console.log("response.data.data.notificationsTags", response.data.notificationsTags);
            await AsyncStorage.setItem('@storage_Key', JSON.stringify(array1))
            await AsyncStorage.setItem('@token_key', JSON.stringify(response.data.accessToken))
            await AsyncStorage.setItem('@email_key', email)
            await AsyncStorage.setItem('@userId_key', response.data.id)
            dispatch(notifications_Tags(array1))
        })
            .catch(error => {
                console.log("error", error);
                SimpleToast.show("You are not a registered user.")
                setIsLoading(false)
            })
    }

    const onChangeText = (text) => {
        setEmail(text)
    }

    return (
        <MainBackground>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container} >
                    <Text style={styles.loginHeading}>Login</Text>
                    <Text style={styles.loginSubHeading}>Let's get started</Text>
                    <View style={{ justifyContent: 'center', marginVertical: widthScale(75), marginHorizontal: widthScale(7) }}>
                        <Text style={styles.labelTxt}>{strings.email_address}</Text>
                        <TextInput
                            value={email}
                            placeholderTextColor={colors.PLACEHOLDER}
                            underlineColorAndroid={'transparent'}
                            autoFocus={false}
                            placeholder={strings.enter_email_address}
                            onChangeText={(value) => {
                                onChangeText(value)
                            }}
                            style={styles.textInputBorder}
                        />
                        <CustomTextInput
                            secureTextEntry={true}
                            label={strings.password}
                            initialvalue={password}
                            placeholder={strings.enter_password}
                            onInputChange={(value) => { setPassword(value) }} />

                        <TouchableOpacity style={styles.btnForgotPassword} onPress={() => { props.navigation.navigate('ForgotPassword') }}>
                            <Text style={styles.forgotPassword}>Forgot password?</Text>
                        </TouchableOpacity>
                        <CustomButton
                            style={{ marginTop: heightScale(30) }}
                            label="Login"
                            onPress={() => { isValidate() }} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <Loader isLoading={isLoading} />
        </MainBackground>
    )
}

export default Login;