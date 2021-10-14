import { StyleSheet } from 'react-native';
import colors from '../../res/colors';
import { heightScale, myFonts, myWidth, widthScale } from '../../utils/Utils';

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: widthScale(30),
        paddingTop: heightScale(25),
    },
    rowFrontVisible: {
        justifyContent: 'flex-start',
        flexDirection: "row",
        alignItems: 'center',
        marginHorizontal: widthScale(30),
        marginBottom: heightScale(25)
    },
    profileIcon: {
        width: widthScale(80),
        height: widthScale(80),
        borderRadius: widthScale(40),
        borderWidth: 2,
        borderColor: colors.LIGTH_GREEN
    },
    userNameTextStyle: {
        marginLeft: widthScale(20),
        fontSize: widthScale(16),
        fontFamily: myFonts.montserratMedium,
        color: 'white',
        marginBottom: heightScale(5)
    },
    descTextStyle: {
        marginLeft: widthScale(20),
        fontSize: widthScale(14),
        fontFamily: myFonts.montserratMedium,
        color: 'white'
    },
    headingTextStyle: {
        marginLeft: widthScale(20),
        fontSize: widthScale(16),
        fontFamily: myFonts.montserratMedium,
        color: colors.LIGTH_GREEN
    },
    checkBoxStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    filterText: {
        fontSize: widthScale(14),
        fontFamily: myFonts.montserratRegular,
        color: colors.FORGOT_PASSWORD,
        marginLeft: widthScale(15),
    },
    emailTextStyle: {
        marginLeft: widthScale(20),
        fontSize: widthScale(14),
        fontFamily: myFonts.montserratMedium,
        color: colors.PLACEHOLDER
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
    textInputBorder1: {
        color: colors.WHITE,
        fontSize: widthScale(13),
        fontFamily: myFonts.montserratRegular,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGTH_GREEN,
        margin: 0,
        padding: 0,
        marginLeft: 0,
        paddingBottom: heightScale(10),
        marginBottom: heightScale(25),
        width: myWidth / 3
    },

});
export default styles;