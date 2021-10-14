/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';
import AppNavigation from './src/AppContainer/AppNavigation';
import colors from './src/res/colors';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider, useSelector } from 'react-redux';
import login_reducer from './src/redux/reducers/LoginReducer'
import apiMiddleware from './src/utils/SignalRMiddlewre';
import marketcategory from './src/redux/reducers/MarketCategoryReducer';
import SearchModal from './src/CustomUI/SearchModal';
import messaging from '@react-native-firebase/messaging'
import firebase from '@react-native-firebase/app'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableWithoutFeedback } from 'react-native';

const reducer = combineReducers({
  user: login_reducer,
  marketCategory: marketcategory
});

export const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {

    state = undefined;
  }

  return reducer(state, action);
};
const store = createStore(rootReducer, applyMiddleware(thunk, apiMiddleware));


export async function checkApplicationPermission() {
  const authorizationStatus = await messaging().requestPermission()

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {

    getToken()
  } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {

    requestUserPermission()
  } else {
  }
}

export async function getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log("fcmToken", fcmToken);
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken()
    console.log("fcmToken", fcmToken);
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
  global.fcmToken = fcmToken
}

export async function requestUserPermission() {
  const authorizationStatus = await messaging().requestPermission()

  if (authorizationStatus) {
    getToken()
  }
}

const App = (props) => {
  // alert(selectedSymbol)
  useEffect(() => {


    checkApplicationPermission();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.APP_THEME} />
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigation />

          <SearchModal navigation={props} />

        </View>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.APP_THEME,
    //alignItems:'center'
  }
});

export default App;