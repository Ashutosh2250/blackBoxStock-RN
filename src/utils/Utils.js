"use strict";

/* This provide helper methods used in application*/
import {
  Platform,
  Dimensions,
  NetInfo,
  DeviceEventEmitter,
  Linking,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SimpleToast from "react-native-simple-toast";
import images from "../res/images/images";
import AppUser from "./AppUser";

export const myWidth = Dimensions.get("window").width;
const myHeight = Dimensions.get("window").height;
const isPlatformIOS = Platform.OS == "ios";
const isPlatformANDROID = Platform.OS == "android";
var appToken = null;
const width = (num) => myWidth * handleSize(num);
const height = (num) => myHeight * handleSize(num);
const isiPhoneX = isPlatformIOS && myHeight > 800;
const totalSize = (num) =>
  Math.sqrt(myHeight * myHeight + myWidth * myWidth) * handleSize(num);
const handleSize = (num) => {
  if (num <= 0) return 0;
  if (num > 100) return 1;
  return num / 100;
};

const standardWidth = 414.0;
const standardHeight = 896.0;

export const myFonts = {

  montserratBlack: "Montserrat-Black",
  montserratBold: "Montserrat-Bold",
  montserratExtraBold: "Montserrat-ExtraBold",
  montserratLight: "Montserrat-Light",
  montserratRegular: "Montserrat-Regular",
  montserratThin: "Montserrat-Thin",
  montserratSemiBold: "Montserrat-SemiBold",
  montserratMedium: "Montserrat-Medium",
  openSansBold: "OpenSans-Bold"
};
export function widthScale(dimension) {
  return (dimension / standardWidth) * myWidth;
}

export function heightScale(dimension) {
  return (dimension / standardHeight) * myHeight;
}

export function keyGenerator() { return '_' + Math.random().toString(36).substr(2, 9) }

export function featureListData() {

  let data = [
    {
      id: 15,
      itemName: 'Stocks',
      itemImage: images.stock,
      title: 'Stocks'
    },

    {
      id: 10,
      itemName: 'Options',
      itemImage: images.options,
      title: 'Options'
    },
    {
      id: 2,
      itemName: 'Chart',
      itemImage: images.chart,
      title: 'Chart'
    },
    {
      id: 16,
      itemName: 'Community',
      itemImage: images.community,
      title: 'Community'
    },
    {
      id: 1,
      itemName: 'Gainers',
      itemImage: images.gainers,
      title: 'Gainers'
    },
    {
      id: 8,
      itemName: 'Decliners',
      itemImage: images.decliners,
      title: 'Decliners'
    },
    {
      id: 9,
      itemName: 'Alert Log',
      itemImage: images.alert_logs,
      selectedIndex: 5,
      title: 'Alert Log'
    },

    {
      id: 3,
      itemName: 'Alert Stream',
      itemImage: images.alert_stream,
      selectedIndex: 6,
      title: 'Alert Stream'
    },
    {
      id: 4,
      itemName: 'Pre-Market \n Scan',
      itemImage: images.pre_market_sacn,
      selectedIndex: 1,
      title: 'PreMarket'
    },
    {
      id: 6,
      itemName: 'Market-Scan',
      itemImage: images.market_scan,
      selectedIndex: 2,
      title: 'MarketScan'
    },
    {
      id: 5,
      itemName: 'Post-Market \n Scan',
      itemImage: images.post_market_scan,
      selectedIndex: 3,
      title: 'PostMarket'
    },

    {
      id: 7,
      itemName: 'Volume Ratio',
      itemImage: images.volume_ratio,
      selectedIndex: 4,
      title: 'Volume Ratio'
    },

    {
      id: 13,
      itemName: 'News',
      itemImage: images.news,
      title: 'News'
    },
    {
      id: 12,
      itemName: 'Education',
      itemImage: images.education,
      title: 'Education'
    },
    {
      id: 11,
      itemName: 'StockTwits',
      itemImage: images.stock_twits,
      title: 'StockTwits'
    },


    {
      id: 14,
      itemName: 'My Alerts',
      itemImage: images.alert_logs,
      title: 'My Alerts'
    },


  ];


  return data;



}

export function checkspecialCharsAndNumbers(value) {

  var isValid = true;
  // to check alphabets
  var regExp = /[a-zA-Z]/g;
  //Regex for special characters
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let numFormat = /\d/;


  if (!regExp.test(value)) {
    isValid = false; //if not
  }

  // if (!format.test(value)) {
  //   isValid = false; //if not
  // }
  numFormat.test(value);
  if (!numFormat.test(value)) {
    isValid = false; // if not
  }
  return isValid;
}

export function getInitial(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map(val => val.trim().charAt(0))
    .filter(val => val != "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export var validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export var validatePhoneNumber = (phoneNumber) => {
  var re = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  return re.test(phoneNumber);
};


export const getTokenFromStorage = async () => {

  let token = await AsyncStorage.getItem('token');
  return token;

}
export var addCommaRegx = text => {
  let regex = /\B(?=(\d{3})+(?!\d))/g;
  return text.toString().replace(regex, ",")
}

export const getFakeArray = (start, end) => {

  let array = [];
  let istart = start == "" ? 1 : start;
  let iend = end = "" ? 20 : end;
  let redArrow = images.redDown;
  let greenArrow = images.greenUp
  for (let i = istart; i < iend; i++) {
    let obj = {
      'column1': i,
      'column2': Math.random(100).toFixed(2),
      'column3': Math.random(100).toFixed(2),
      'column4': 100 + Math.random(200).toFixed(2),
      'column5': 200 + Math.random(300).toFixed(2),
      'column6': 200 + Math.random(300).toFixed(2),
    };
    //  
    array.push(obj);
  }
  return array;
}


export function getMonthNameFromDate(d) {

  var weekday = new Array(7);
  weekday[1] = "January";
  weekday[2] = "February";
  weekday[3] = "March";
  weekday[4] = "April";
  weekday[5] = "May";
  weekday[6] = "June";
  weekday[7] = "July";
  weekday[8] = "August";
  weekday[9] = "Sepetember";
  weekday[10] = "October";
  weekday[11] = "November";
  weekday[12] = "December";

  var n = weekday[d.getMonth() + 1];

  return n;
}

export function getHeader() {
  let appUsrObj = AppUser.getInstance();
  let headers = {};
  let token = appUsrObj.token;
  if (token && token.length > 0) {
    headers = {
      "Authorization": token,
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  } else {
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }
  return headers;
}