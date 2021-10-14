import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleToast from 'react-native-simple-toast';
import CustomButton from '../../CustomUI/CustomButton';
import CustomTextInput from '../../CustomUI/CustomTextInput';
import MainBackground from '../../CustomUI/MainBackground';
import strings from '../../res/strings';
import { heightScale, validateEmail } from '../../utils/Utils';
import styles from './ForgatPassStyle';

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');
    const isValidate = () => {

        let valid = true;
        if (!email) {
            SimpleToast.show('Please enter your email.');
            valid = false;
        } else if (!validateEmail(email)) {
            SimpleToast.show("Please enter vaid email.")
            valid = false;
        }
        return valid

    }
    return (
        <MainBackground>
            <KeyboardAwareScrollView style={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.forgot_password_content}>{strings.forgot_password_content}</Text>

                    <CustomTextInput
                        label={strings.email_address}
                        initialvalue={email}
                        placeholder={strings.enter_email_address}
                        onInputChange={(value) => { setEmail(value) }} />

                    <CustomButton
                        style={{ marginTop: heightScale(30) }}
                        label="Send Email"
                        onPress={() => { isValidate() }
                        } />
                </View>
            </KeyboardAwareScrollView>
        </MainBackground>
    )
}


export default ForgotPassword;