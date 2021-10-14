import { StyleSheet } from 'react-native';
import colors from '../../res/colors';
import { heightScale, myFonts, widthScale } from '../../utils/Utils';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: widthScale(23),
        paddingTop: heightScale(30),
        paddingBottom: heightScale(5)
    },
    termsHeading: {
        fontFamily: myFonts.montserratSemiBold,
        fontSize: widthScale(14),
        color: colors.WHITE
    },
    terms_and_condition: {
        fontFamily: myFonts.montserratRegular,
        fontSize: widthScale(14),
        color: colors.WHITE,
        marginTop: heightScale(20)
    },
    terms_and_condition1: {
        fontFamily: myFonts.montserratRegular,
        fontSize: widthScale(14),
        color: colors.WHITE,
        marginTop: heightScale(20)
    },
    btnsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightScale(20),
    }
});
export default styles;