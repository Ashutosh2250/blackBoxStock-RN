import React, { useEffect, useReducer } from "react";
import { View, Text, TextInput } from "react-native";
import colors from "../res/colors";
import styles from './CustomInputStyle';

const CHANGE_INPUT = "CHANGE_INPUT";
const INPUT_BLUR = "INPUT_BLUR";
const inputReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        value: action.value,
      };
    default:
      return state;
  }
};

const CustomTextInput = (props) => {
  // useReducer returns two things - inputstate , dispatch (just a varible )
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialvalue ? props.initialvalue : "",

  });

  const onInputBlur = () => {
    dispatch({ type: INPUT_BLUR, status: false });
  };

  const textChangeHandler = (value) => {

    dispatch({ type: CHANGE_INPUT, value: value, status: true });
  };

  const { onInputChange } = props;
  // useEffect(() => {
  //   console.log(inputState.value, "onInputChange", props.initialvalue);
  //   if (!props.initialvalue) {
  //     onInputChange(inputState.value);
  //   }
  //   else {
  //     return;
  //   }

  // }, [inputState, onInputChange]);

  return (
    <View style={props.textInputContainer ? props.textInputContainer : {}}>
      <Text style={styles.labelTxt}>{props.label}</Text>
      <TextInput
        {...props}
        value={inputState.value}
        placeholderTextColor={colors.PLACEHOLDER}
        underlineColorAndroid={'transparent'}
        autoFocus={false}
        onChangeText={(value) => {
          onInputChange(value)
          textChangeHandler(value)
        }}
        style={inputState.value.length > 0 ? styles.textInputBorder : styles.textInput}
      />
      {props.secureTextEntry
        ?
        <Text style={styles.passwordHeading}>Password will be a combination of Numbers, Alphabets and Characterts</Text>
        :
        null
      }

    </View>
  );
};


export default CustomTextInput;
