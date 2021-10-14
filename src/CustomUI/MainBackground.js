import React from 'react';
import { TouchableWithoutFeedback ,View} from 'react-native';
import { ImageBackground, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/actions/MarketCategoryActions';
import images from '../res/images/images';

const MainBackground = (props) => {

    const dispatch =  useDispatch();
    const openCloseModal = useSelector(state => state.marketCategory.open_modal);
    return (
        <ImageBackground source={images.mainBackground} style={styles.container}>
            <TouchableWithoutFeedback onPress={()=>{if(openCloseModal){
                dispatch(openModal(!openCloseModal))
            }}}>
                <>
                {props.children}
                </>
           
            </TouchableWithoutFeedback>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


export default MainBackground;