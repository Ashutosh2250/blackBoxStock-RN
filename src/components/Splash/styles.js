import { StyleSheet } from 'react-native';
import colors from '../../res/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.APP_THEME,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        position: 'absolute',
        bottom: 20,
    }
});

export default styles;