import { StyleSheet } from "react-native";
import colors from "../res/colors";
import { heightScale, myFonts, widthScale } from "../utils/Utils";

const styles = StyleSheet.create({
    labelTxt: {
        color: colors.LIGTH_GREEN,
        fontFamily: myFonts.montserratMedium,
        fontSize: widthScale(14),
        marginBottom: heightScale(8)
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
    passwordHeading: {
        color: colors.PASSWORD_EXAMPLE,
        fontFamily: myFonts.montserratRegular,
        fontSize: widthScale(14)
    }
});
export default styles;