
import { StyleSheet, } from 'react-native';
import colors from '../res/colors';
import { heightScale, myFonts, widthScale } from '../utils/Utils';

const styles = StyleSheet.create({
    borderBox: {
        width: widthScale(114),
        height: heightScale(46),
        justifyContent: 'center',
        borderColor: colors.APP_GREEN,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: '#202020',
        alignItems: 'center',

    },
    smallBorderBox: {
        width: widthScale(50),
        height: heightScale(46),
        justifyContent: 'center',
        borderColor: colors.APP_GREEN,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        backgroundColor: '#202020',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    smallBorderBox2: {
        width: widthScale(50),
        height: heightScale(46),
        justifyContent: 'center',
        borderColor: colors.APP_GREEN,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: '#202020',
        alignItems: 'center',
        marginLeft: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    textStyle: {
        color: colors.WHITE,
        textAlign: 'center',
        fontSize: widthScale(14),
        fontFamily: myFonts.montserratSemiBold
    },
    borderRightStyle: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderRightWidth: 2
    },
    borderLeftStyle: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    mainRow: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
export default styles;