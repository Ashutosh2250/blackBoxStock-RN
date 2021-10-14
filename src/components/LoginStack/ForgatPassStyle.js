
import { StyleSheet } from 'react-native';
import colors from '../../res/colors';
import { heightScale, myFonts, widthScale } from '../../utils/Utils';

const styles = StyleSheet.create({
    container: {
        padding: widthScale(30)
    },
    forgot_password_content: {
        fontFamily: myFonts.montserratRegular,
        fontSize: widthScale(15),
        color: colors.FORGOT_PASSWORD,
        marginBottom: heightScale(47),
        lineHeight: 22
    }
});
export default styles;