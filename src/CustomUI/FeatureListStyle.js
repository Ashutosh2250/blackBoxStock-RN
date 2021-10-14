import { StyleSheet } from 'react-native';
import colors from '../res/colors';
import { heightScale, myFonts, widthScale } from '../utils/Utils';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: heightScale(20),
        width: widthScale(104),
        height: heightScale(110),
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRightColor: 'rgba(204,204,204,0.1)',
        borderBottomColor: 'rgba(204,204,204,0.1)',
        paddingBottom: heightScale(10)
    },
    container1: {
        alignItems: 'center',
        justifyContent: 'center',
        width: widthScale(104),
        height: heightScale(110),
        borderRightWidth: 1,
        borderRightColor: 'rgba(204,204,204,0.1)',
    },
    textStyle: {
        color: colors.FORGOT_PASSWORD,
        fontSize: widthScale(12),
        fontFamily: myFonts.montserratRegular,
        marginTop: heightScale(8),
        width: '100%',
        textAlign: 'center',
        fontWeight: '500'
    }
});
export default styles;