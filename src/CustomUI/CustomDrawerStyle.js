import { StyleSheet } from 'react-native';
import { myFonts, widthScale, heightScale } from '../utils/Utils';
import colors from '../res/colors';

const styles = StyleSheet.create({
    drawerItem: {
        marginVertical: 0
    },
    drawerLabel: {
        color: colors.WHITE,
        fontFamily: myFonts.montserratMedium,
        fontSize: widthScale(13),
        marginLeft: widthScale(-5)

    },
    avatar: {
        width: 39, height: 39, borderRadius: 19.5
    }, nameText: {
        color: colors.WHITE,
        fontFamily: myFonts.montserratRegular,
        fontSize: widthScale(14),
        lineHeight: 19,

    }, emailText: {
        color: '#808080',
        fontFamily: myFonts.montserratRegular,
        fontSize: widthScale(12),
        lineHeight: 14,
        marginTop: heightScale(5)
    }, drawerItemStyle: {
        // marginVertical: heightScale(0),
    }, imageStyle: {
        width: widthScale(20),
        height: widthScale(20)
    },
    avtarStyle: {
        width: widthScale(60),
        height: widthScale(60),
        borderColor: colors.APP_GREEN,
        borderWidth: 1,
        borderRadius: widthScale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerCon: {
        paddingLeft: widthScale(20),
        marginTop: heightScale(20),
        paddingRight: widthScale(20)
    },
    profileCon: {
        alignItems: 'center',
        marginTop: heightScale(10)
    },
    avtarBoxStyle: {
        alignItems: 'center',
        paddingLeft: widthScale(22),
        paddingTop: heightScale(30)
    },
    drawerScrollStyle: {
        flex: 1,
        backgroundColor: colors.APP_THEME
    },
    viewLine: {
        backgroundColor: '#010101',
        shadowColor: '#ececec',
        borderWidth: 1,
        elevation: 5,
    }
})

export default styles;