import { StyleSheet } from 'react-native';
import colors from '../res/colors';
import { widthScale, heightScale, myFonts } from '../utils/Utils';

const styles = StyleSheet.create({
    barConStyle: {
        backgroundColor: "#202020",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightScale(5),
        width: '100%'
    },
    leftBarStyle: {
        paddingVertical: heightScale(15),
        paddingHorizontal: widthScale(10),
        width: widthScale(110),

    },
    medBarStyle: {
        paddingVertical: heightScale(15),
        paddingHorizontal: widthScale(10),
        width: '33%'
    },
    rightBarStyle: {
        paddingVertical: heightScale(15),
        paddingHorizontal: widthScale(10),
        width: '33%'
    },
    barTextStyle: {
        fontSize: widthScale(15),
        color: colors.WHITE,
        textAlign: 'center',
        fontFamily: myFonts.montserratRegular
    }
});
export default styles;