import { StyleSheet } from 'react-native';
import colors from '../res/colors';
import { myFonts, widthScale } from '../utils/Utils';

const styles = StyleSheet.create({
    btnText: {
        fontFamily: myFonts.montserratSemiBold,
        fontSize: widthScale(18),
        color: colors.WHITE
    },
    btnContainer: {
        width: '100%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    }
})

export default styles;