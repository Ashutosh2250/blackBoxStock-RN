import { StyleSheet } from 'react-native';
import colors from '../res/colors';

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: colors.WHITE,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5
        //    flex: 1,
        // borderWidth: 5,
        // borderColor: 'rgba(255, 255, 255, 0.3)'
    },
    drawerStyles: {
        flex: 1,
        width: '65%',
        backgroundColor: colors.WHITE
    },
})

export default styles;