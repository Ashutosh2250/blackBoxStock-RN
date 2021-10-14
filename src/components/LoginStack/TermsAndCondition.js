import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import CustomButton from '../../CustomUI/CustomButton';
import Loader from '../../CustomUI/Loader';
import strings from '../../res/strings';
import { heightScale } from '../../utils/Utils';
import MainBackground from '../../CustomUI/MainBackground';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/actions/LoginAction';
import SimpleToast from 'react-native-simple-toast';
import styles from './TermAndCondiStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TermsAndCondition = (props) => {
    const dispatch = useDispatch();

    const saveTokenAndNavigate = async () => {
        const getToken = props.route && props.route.params && props.route.params.token ? props.route.params.token : "";
        console.log(getToken, "getToken")
        const userToken = ["@TOKEN", getToken];
        try {
            await AsyncStorage.multiSet([userToken])
            dispatch(userLogin(userToken))
        } catch (e) {
            console.log("Error saving user details", e);
        }
    }

    return (
        <MainBackground>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container} >
                    <Loader isLoading={false} />
                    <Text style={styles.termsHeading}>{strings.terms_and_condition_heading}</Text>
                    <Text style={styles.terms_and_condition}>{strings.temrs_and_cond_para}</Text>
                    <View style={styles.btnsView}>
                        <CustomButton
                            label="I Accept"
                            style={{ flex: 0.4, height: heightScale(150) }}
                            onPress={() => { saveTokenAndNavigate() }} />
                        <CustomButton
                            label="Decline"
                            style={{ flex: 0.4, height: heightScale(150) }}
                            gradientArray={['#F12D2D', '#AF0B0B']}
                            onPress={() => {
                                SimpleToast.show("Please accept terms and conditions to continue!")
                            }} />
                    </View>

                </View>
            </ScrollView>
        </MainBackground>
    )
}

export default TermsAndCondition;