import React, { useState ,useImperativeHandle,forwardRef,useRef} from 'react';
import {View , Text , StyleSheet, Image} from 'react-native';
import  {CheckBox}  from 'react-native-elements';
import colors from '../res/colors';
import images from '../res/images/images';
import { myFonts, widthScale } from '../utils/Utils';

const FilterView = forwardRef(( props , ref)=> {
    const [checked, setChecked] = useState(false);
    const checkBoxRef = useRef();

  React.useImperativeHandle(ref, () => ({
    reset: () => {
        setChecked(false);
    }
  }));
    return(
        <View style={[props.numColumns ?  {flexDirection:'row',alignItems:'center', width:'45%',} : {flexDirection:'row',alignItems:'center', width:'45%',}]}>
            <CheckBox
            ref={checkBoxRef}
            containerStyle={styles.checkBoxStyle}
            checked={props.checked}
            title={<Text numberOfLines={2} style={styles.filterText}>{props.title}</Text>}
            onPress={()=>{props.onPress()}}
            checkedIcon={<Image source={images.checkGreen} />}
            uncheckedIcon={<Image source={images.uncheck} />}
            />
        </View>
    )
});

const styles =  StyleSheet.create({
    filterText:{
        fontSize:widthScale(14),
        fontFamily:myFonts.montserratRegular,
        lineHeight:17,
        color:colors.FORGOT_PASSWORD,
        marginLeft:widthScale(15),
      //  letterSpacing:0.8

    },
    checkBoxStyle:{
        backgroundColor:'transparent',
        borderWidth:0
    }
})

export default FilterView;