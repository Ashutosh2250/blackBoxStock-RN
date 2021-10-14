import { StyleSheet } from 'react-native';
import colors from '../res/colors';
import { heightScale, myFonts, widthScale } from '../utils/Utils';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: widthScale(20)
    },
    title: {
        fontFamily: myFonts.montserratRegular,
        fontSize: widthScale(16),
        color: colors.LIGTH_GREEN,
        marginBottom: heightScale(5)
    },
    dateTimeText: {
        fontSize: widthScale(15),
        fontFamily: myFonts.montserratRegular,
        color: colors.PASSWORD_EXAMPLE,
        marginBottom: heightScale(15)
    },
    despHeading: {
        fontSize: widthScale(15),
        fontFamily: myFonts.montserratRegular,
        color: colors.LIGTH_GREEN,
        marginBottom: heightScale(10)
    },
    desp: {
        fontSize: widthScale(15),
        fontFamily: myFonts.montserratRegular,
        color: colors.PASSWORD_EXAMPLE,
        marginBottom: heightScale(25)
    }
});
export default styles;