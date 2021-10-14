import { StyleSheet } from 'react-native';
import colors from '../res/colors';
import { heightScale, myFonts, widthScale } from '../utils/Utils';

const styles = StyleSheet.create({

    tabStyle: {
        height: heightScale(50),
        backgroundColor: colors.HOME_MAIN_BOX,
        borderColor: colors.LIGTH_GREEN,

    },
    lastTabStyle: {
        color: colors.WHITE,
        fontSize: widthScale(14),
        fontFamily: myFonts.montserratRegular
    },
    activeTabTextStyle: {
        fontSize: widthScale(14),
        fontFamily: myFonts.montserratSemiBold,
        color: "#000000"
    },
    activeTabLeftStyle: {
        backgroundColor: colors.LIGTH_GREEN,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    activeTabRightStyle: {
        backgroundColor: colors.LIGTH_GREEN,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    }
});
export default styles;