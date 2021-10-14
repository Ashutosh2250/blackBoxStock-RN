import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native'
import SimpleToast from 'react-native-simple-toast';
import CustomButton from '../../CustomUI/CustomButton';
import CustomSegmentControlTab from '../../CustomUI/CustomSegmentControlTabs';
import FeatureListItem from '../../CustomUI/FeatureListItem';
import MainBackground from '../../CustomUI/MainBackground';
import colors from '../../res/colors';
import images from '../../res/images/images';
import strings from '../../res/strings';
import API_URL from '../../utils/ApiUrl';
import { featureListData, heightScale, widthScale } from '../../utils/Utils';
import GainersHub from './GainersHub';
const signalR = require("@aspnet/signalr");
import styles from './styles';
import CustomMainHeader from '../../CustomUI/CustomMainHeader'
import CustomHeaderText from '../../CustomUI/CustomHeaderText'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLogin } from '../../redux/actions/LoginAction';
import { saveSelectedSymbol, saveSelectedSymbol1, saveOptionSymbol, saveOptionSymbol1, saveHomeSymbol, saveNewsSymbol, saveStocksSymbol, saveAlertSymbol } from '../../redux/actions/MarketCategoryActions';

const HomeScreen = props => {
  const selectedSym = useSelector(state => state.marketCategory.selectedSymbol);
  const homesymbol = useSelector(state => state.marketCategory.homeSymbol);
  const newssymbol = useSelector(state => state.marketCategory.selectedNews);
  const stocktwitsSym = useSelector(state => state.marketCategory.stocktwitsSym);
  const selectedAlertsSym = useSelector(state => state.marketCategory.selectedAlertsSym);
  const checksymb = useSelector(state => state.marketCategory.saveSymbol);
  const checksymb1 = useSelector(state => state.marketCategory.saveSymbol1);
  const optionHome = useSelector(state => state.marketCategory.saveHomesym);

  const dispatch = useDispatch();
  var connection;
  const data = [...featureListData()];
  const newsdata = [
    {
      id: 1,
      title: 'The Fly News',
      dateTime: 'February 05, 2021 at 15:09',
      descriptionHeading: 'February 05, 2021 at 15:09',
      description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,'

    }
  ]
  setInterval(async () => {
    const subscriberId = await AsyncStorage.getItem('@token_key')
    const deviceid = await AsyncStorage.getItem('@userId_key')
    const data = { "SubscriberId": subscriberId, "DeviceId": deviceid }
    axios.post(API_URL.verify_session_url, data)
      .then(async (response) => {
        if (response.status == 200) {
        } else {
          try {
            const keys = ["@TOKEN", '@storage_Key', '@token_key'];
            try {
              await AsyncStorage.multiRemove(keys)
              dispatch(userLogin(null))
            } catch (e) {
              console.log("Error removing data from async storage.", e);
            }

          } catch (error) {
            console.log("Error while logging out", err)
          }
        }
      }
      ).catch((error) => {
        console.log(error, "error")
      })
  }, 10000)
  useEffect(() => {

    if (selectedSym && checksymb != true && checksymb1 != true) {
      dispatch(saveSelectedSymbol1(selectedSym))
      dispatch(saveSelectedSymbol(null))
      dispatch(saveNewsSymbol(selectedSym))
      dispatch(saveStocksSymbol(selectedSym))
      dispatch(saveAlertSymbol(selectedSym))

      props.navigation.navigate('ChartView')
    }
    console.log("checkhome", selectedSym, checksymb1)
    if (checksymb == true || checksymb1 == true) {
      dispatch(saveOptionSymbol(false))
      dispatch(saveOptionSymbol(false))

    }
  }, [selectedSym || homesymbol])
  return (

    <MainBackground>
      <CustomMainHeader showSearch={true} {...props} label="Home" />

      <ScrollView style={{ flexGrow: 1 }} bounces={false} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <View style={{ flex: 1 }}>
          <View style={styles.firstBox}>
            <View style={styles.circleBox} >
              <Image source={images.logo_new} style={styles.circleImage} resizeMode={"contain"} />
            </View>

            <View>
              <Text style={styles.appNameText}>{strings.app_name}</Text>
              <Text style={styles.latestGaninersText}>{strings.latest_gainers}</Text>
              <CustomButton
                label="Know More"
                onPress={() => { false }}
                textStyle={{ fontSize: widthScale(14), fontWeight: '600' }}
                style={{ height: heightScale(30), width: widthScale(120) }} />
              <Text style={styles.tAndCText}>{strings.t_and_c_applied}</Text>
            </View>
          </View>

          <View>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              numColumns={4}
              style={{ backgroundColor: colors.HOME_MAIN_BOX }}
              renderItem={({ item, index }) => {
                return (
                  <FeatureListItem data={item} index={index} />
                )
              }}
            />
          </View>


        </View>
      </ScrollView>
    </MainBackground>
  );

}

export default HomeScreen;
