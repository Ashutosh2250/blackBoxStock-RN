import { StyleSheet } from 'react-native';
import colors from '../../res/colors';
import { heightScale, myFonts, widthScale } from '../../utils/Utils';

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 0.3,
        height: heightScale(90),
        backgroundColor: colors.DARK_GREY,

    },
    symbolText: {
        color: colors.WHITE,
        fontWeight: '500',
        fontSize: widthScale(20),
        fontFamily: myFonts.montserratThin,
        marginLeft: widthScale(26),
        marginTop: widthScale(12),

    },
    boxView: {
        flexDirection: 'column',


    },
    lineView: {
        borderEndWidth: 1,
        borderColor: 'rgba(0, 0, 0, 1)',
        marginLeft: widthScale(11),
        padding: widthScale(3)

    },
    priceText: {
        fontSize: widthScale(18),
        fontFamily: '500',
        fontFamily: myFonts.montserratRegular,
        color: colors.SELECTED_DATE_COLOR,
        marginRight: widthScale(8)

    },
    percentText: {
        fontSize: widthScale(16),
        fontFamily: '500',
        fontFamily: myFonts.montserratRegular,
        color: 'rgba(255, 0, 0, 1)',



    },
    innerBox: {
        marginLeft: widthScale(8),
        marginRight: widthScale(8),
        flexDirection: 'row',
        marginTop: widthScale(19),
        justifyContent: 'space-between'
    },
    firstBox: {
        paddingHorizontal: widthScale(10),
        paddingVertical: heightScale(10),
        flexDirection: 'row',
        backgroundColor: colors.HOME_MAIN_BOX,
        borderRadius: 6,
        marginVertical: heightScale(15),
        marginHorizontal: widthScale(5),
        height: heightScale(140),
        flex: 1,
        alignItems: 'center'
    },
    circleBox: {
        width: widthScale(100),
        height: widthScale(100),
        marginRight: widthScale(25),
        borderWidth: 1,
        borderRadius: widthScale(50),
        borderColor: colors.TEXT_INPUT_BORDER_LINE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleImage: {
        width: widthScale(80),
        height: widthScale(80),
        borderRadius: widthScale(40)
    },
    appNameText: {
        color: colors.WHITE,
        fontSize: widthScale(18),
        fontFamily: myFonts.montserratSemiBold,
        marginBottom: heightScale(5)
    },
    latestGaninersText: {
        color: colors.FORGOT_PASSWORD,
        fontSize: widthScale(14),
        fontFamily: myFonts.montserratRegular,
        marginBottom: heightScale(10)
    },
    tAndCText: {
        color: colors.WHITE,
        fontSize: widthScale(10),
        fontFamily: myFonts.montserratRegular,
        marginTop: heightScale(5),
        fontWeight: '500'
    },
    topGainersView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: heightScale(25),
        marginBottom: heightScale(20),
        marginHorizontal: widthScale(20)

    },
    textTopGainers: {
        fontFamily: myFonts.montserratSemiBold,
        color: colors.WHITE,
        fontSize: widthScale(18)
    },
    topGainersText: {
        fontSize: widthScale(12),
        fontFamily: myFonts.montserratRegular,
        color: colors.PASSWORD_EXAMPLE,
        padding: widthScale(10),
        flex: 1,
        textAlign: 'center'
    },
    topGainersTextHeading: {
        fontSize: widthScale(10),
        fontFamily: myFonts.openSansBold,
        color: colors.LIGTH_GREEN,
        padding: widthScale(0),
        flex: 1,
        textAlign: 'center',
    },
    viewLine: {
        borderWidth: 1,
        borderColor: colors.LIGTH_GREEN,
        marginVertical: heightScale(20)
    },
    whiteLine: {
        borderWidth: 0.5,
        borderColor: colors.PLACEHOLDER,
        marginVertical: heightScale(20)
    },
    realTimeNewsText: {
        marginTop: heightScale(25),
        marginBottom: heightScale(20),
        marginHorizontal: widthScale(20)
    },

    // Category styles

    categoryCon: {
        paddingLeft: widthScale(10),
        marginVertical: heightScale(15),
        paddingRight: widthScale(10)
    },
    tableContainer: {
        marginTop: heightScale(15),
        flex: 1,
    },

    // Chart View

    valueTextStyle: {
        color: colors.WHITE,
        fontSize: widthScale(12),
    },
    verticalIndicator: {
        marginTop: 1,
        marginLeft: widthScale(5),
        height: heightScale(10),
        width: 1,
        backgroundColor: colors.WHITE
    },
    lineAndValue: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainContainer: {
        justifyContent: 'center',
        paddingVertical: 10

    },
    rowDir: {
        flexDirection: 'row'
    },
    symbolStyle: {
        textAlign: 'center',
        marginTop: heightScale(15),
        color: colors.WHITE,
        fontSize: widthScale(18),
        justifyContent: 'center',
        fontFamily: myFonts.montserratBold
    },
    volatilityIndicator: {
        textAlign: 'center',
        marginTop: heightScale(15),
        color: colors.WHITE,
        fontSize: widthScale(16),
        justifyContent: 'center',
        fontFamily: myFonts.montserratBold
    },
    footerContainer: {
        flexDirection: 'row',
        marginTop: heightScale(20),
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    contentStyle: {
        fontSize: widthScale(18),
        color: colors.WHITE,
        fontFamily: myFonts.montserratMedium
    },
    contenttextStyle: {
        fontSize: widthScale(13),
        color: colors.LIGHT_GREY,
        fontFamily: myFonts.montserratBold
    },
    infooterConatainer: {
        marginTop: heightScale(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    volumeContainerStyle: {
        flexDirection: 'column',
        marginTop: heightScale(10)
    },
    volumevalueStyle: {
        textAlign: 'center',
        marginTop: heightScale(5),
        fontStyle: 'normal',
        fontSize: widthScale(16),
        color: colors.WHITE,
        fontFamily: myFonts.montserratBold
    },
    volumetextStyle: {
        textAlign: 'center',
        fontStyle: 'normal',
        fontSize: widthScale(13),
        color: colors.LIGHT_GREY,
    },
    finalDataStyle: {
        flexDirection: 'row',
        marginTop: heightScale(10),
        justifyContent: 'center'
    },
    finalDataValueStyle: {
        margin: widthScale(8),
        textAlign: 'center',
        fontSize: widthScale(20),
        color: colors.LIGTH_GREEN,
    },
    finalDataValueStyle1: {
        margin: widthScale(8),
        textAlign: 'center',
        fontSize: widthScale(20),
        color: "red",
    },
    finalPerValueStyle: {
        textAlign: 'center',
        fontStyle: 'normal',
        fontSize: widthScale(20),
        color: colors.LIGTH_GREEN,
    },
    footertextStyle: {
        marginTop: widthScale(10),
        textAlign: 'center',
        fontSize: widthScale(13),
        color: colors.LIGHT_GREY,
    }
})

export default styles;