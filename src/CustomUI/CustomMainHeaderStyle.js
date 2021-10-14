import { StyleSheet } from 'react-native';
import colors from '../res/colors';
import { heightScale, myFonts, widthScale } from '../utils/Utils';

const styles = StyleSheet.create({
    container: {
        height: heightScale(33),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: widthScale(20),
        width: '100%'
    },
    headerText: {
        color: colors.WHITE,
        fontSize: widthScale(20),
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: myFonts.montserratMedium
    },
    headerSection: {
        marginHorizontal: widthScale(20),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%'
    },
    mainContainer: {
        // backgroundColor: '#010101',
        // shadowColor: '#ececec',
        // shadowOpacity: 1,
        // elevation: 5,
        backgroundColor: '#010101',
        elevation: 5,
        shadowColor: '#ececec',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2
    },
    hipSlopStyle: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
    }
});
export default styles;