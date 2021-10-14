import { StyleSheet } from 'react-native';
import colors from '../../res/colors';
import { heightScale, myFonts, widthScale } from '../../utils/Utils';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: widthScale(30),
        paddingTop: heightScale(106),
    },
    loginHeading: {
        fontFamily: myFonts.montserratSemiBold,
        color: colors.WHITE,
        fontSize: widthScale(24)
    },
    loginSubHeading: {
        fontFamily: myFonts.montserratMedium,
        color: colors.FORGOT_PASSWORD,
        fontSize: widthScale(14),
        marginTop: heightScale(10)
    },
    forgotPassword: {
        fontSize: widthScale(14),
        fontFamily: myFonts.montserratSemiBold,
        color: colors.WHITE
    },
    btnForgotPassword: {
        marginTop: heightScale(20),
        alignSelf: 'flex-end'
    },
    orText: {
        fontSize: widthScale(14),
        fontFamily: myFonts.montserratRegular,
        color: colors.FORGOT_PASSWORD,
        marginTop: heightScale(65),
        textAlign: 'center'
    },
    socialLogo: {
        position: 'absolute',
        top: 0,
        left: 9,
        right: 0,
        bottom: 0,
        alignSelf: 'center'
    },
    gradientCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    textInput: {
        color: colors.WHITE,
        fontSize: widthScale(13),
        fontFamily: myFonts.montserratRegular,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.TEXT_INPUT_BORDER_LINE,
        margin: 0,
        padding: 0,
        paddingBottom: heightScale(10),
        marginBottom: heightScale(25),
        marginLeft: 0,
    },
    textInputBorder: {
        color: colors.WHITE,
        fontSize: widthScale(13),
        fontFamily: myFonts.montserratRegular,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGTH_GREEN,
        margin: 0,
        padding: 0,
        marginLeft: 0,
        paddingBottom: heightScale(10),
        marginBottom: heightScale(25)
    },
    labelTxt: {
        color: colors.LIGTH_GREEN,
        fontFamily: myFonts.montserratMedium,
        fontSize: widthScale(14),
        marginBottom: heightScale(8)
    },
});
export default styles;