import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import colors from '../res/colors';
import images from '../res/images/images';
import { heightScale, keyGenerator, myFonts, widthScale } from '../utils/Utils';
import { saveSelectedSymbol, saveSelectedSymbol1, saveOptionSymbol, saveHomeSymbol, saveNewsSymbol, saveStocksSymbol, saveAlertSymbol } from '../redux/actions/MarketCategoryActions';
import { useDispatch, useSelector } from 'react-redux';

const TableViewFlatlist = (props) => {
  const { data } = props;
  const selectedSym = useSelector(state => state.marketCategory.selectedSymbol);
  const homesymbol = useSelector(state => state.marketCategory.homeSymbol);
  const selectedAlertsSym = useSelector(state => state.marketCategory.selectedAlertsSym);
  const checksymb = useSelector(state => state.marketCategory.saveSymbol);
  const dispatch = useDispatch();
  if (checksymb == true) {
    dispatch(saveOptionSymbol(null))

  }
  const alertSymbol = selectedSym ? selectedSym : selectedAlertsSym ? selectedAlertsSym : null
  const result = data.filter(word => word.column2 == alertSymbol);

  console.log("checkfilter", result, data, alertSymbol)
  const componentHeader = useMemo(() => {

    return (
      <View style={{ width: '100%', height: heightScale(70) }} >
        <View style={styles.flatlistCon}>
          {props.headerData.map((item) => {
            let isIcon = item.tabname == "ICON" ? true : false;
            return isIcon ?
              <View style={{ flexDirection: 'row' }}>
                <Image source={images.greenDown} resizeMode={'contain'} style={[styles.arrowDownStyle]} />
                <Image source={images.greenUp} resizeMode={'contain'} style={[styles.arrowStyle,]} />
              </View> :
              <Text style={[styles.topGainersTextHeading, props.tabNameStyle]}>{item.tabname}</Text>
          })}
        </View>
        <View style={[styles.viewLine, props.viewLineStyle]} />
      </View >
    )
  }, [props.headerData]);

  return (

    <View style={styles.container} >
      {componentHeader}
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        //data={getFilterData && getFilterData.length > 0 ? getFilterData : []}
        data={data && data.length > 0 && props.route.name == "AlertStream" && alertSymbol ? result : data}
        keyExtractor={(index) => { return keyGenerator() }}
        renderItem={({ item, index }) => {

          return (
            <TouchableOpacity onPress={() => {
              if (props.route.name == "AlertStream") {

                dispatch(saveSelectedSymbol1(item.column2))
                dispatch(saveSelectedSymbol(item.column2))
                dispatch(saveAlertSymbol(item.column2))
                dispatch(saveNewsSymbol(item.column2))
                dispatch(saveAlertSymbol(item.column2))

                if (item.column2) {
                  props.navigation.navigate('ChartView')
                }
              } else if (props.route.name == "AlertLogScreen") {
                dispatch(saveSelectedSymbol(item.column2))
                if (item.column2) {
                  props.navigation.navigate('ChartView')
                }
              } else if (props.route.name == "Alert Log") {

                dispatch(saveSelectedSymbol(item.column2))
                if (item.column2) {
                  props.navigation.navigate('ChartView')
                }
              } else {

                dispatch(saveSelectedSymbol(item.column1))
                if (item.column1) {
                  props.navigation.navigate('ChartView')
                }
              }

            }}>
              <View key={item.id} style={[styles.mainRow,
              props.headerData.length == 4 ? { flex: 4 } : { flex: 5 },
              index % 2 == 0 ? { backgroundColor: '#202020' } : {
                backgroundColor: '#010101',
                paddingVertical: heightScale(15)
              }]}>
                {item.column1 ?
                  <Text style={[item.color ? { ...styles.topGainersText, color: item.color.toLowerCase() } : styles.topGainersText]}>{item.column1 ? item.column1 : ""}</Text>
                  : null}
                {item.iconCol == 2 ? <Image source={item.column2} style={styles.icon} /> :
                  item.column2 ? <Text style={[item.color ? { ...styles.topGainersText, color: item.color.toLowerCase() } : styles.topGainersText]}>{item.column2 ? item.column2 : ""}</Text> : null}
                {item.iconCol == 3 ? <Image source={item.column3} style={styles.icon} /> :
                  item.column3 ? <Text style={[item.color ? { ...styles.topGainersText, color: item.color.toLowerCase() } : styles.topGainersText]}>{item.column3 ? item.column3 : ""}</Text> : null}

                {item.column4 ?
                  <Text style={[item.color ? { ...styles.topGainersText, color: item.color.toLowerCase() } :
                    item.color1 ? { ...styles.topGainersText, color: item.color1.toLowerCase() } : styles.topGainersText]}>{item.column4 ? item.column4 : ""}</Text> : null}
                {item.column5 && item.upDownIndicator ?
                  <Image style={{ height: 5, width: 7, marginEnd: 0 }} source={item.upDownIndicator}></Image> : null}
                {item.column5 ? <Text style={[item.color ? { ...styles.topGainersText, color: item.color.toLowerCase() } : styles.topGainersText]}>{item.column5 ? item.column5 : ""}</Text> : null}

                {item.column6 && item.upDownIndicator ?
                  <Image style={{ height: 5, width: 7, marginleft: 30 }} source={item.upDownIndicator}></Image> : null}
                {item.column6 ? <Text style={[item.color ? { ...styles.topGainersText, color: item.color.toLowerCase() } : styles.topGainersText]}>{item.column6 ? item.column6 : ""}</Text> : null}

                {item.column7 && item.upDownIndicator ?
                  <Image style={{ height: 5, width: 7 }} source={item.upDownIndicator}></Image> : null}

                {item.column7 ? <Text style={[item.color ? { ...styles.topGainersText, color: item.color.toLowerCase() } : styles.topGainersText]}>{item.column7 ? item.column7 : ""}</Text> : null}
              </View>

            </TouchableOpacity>)
        }}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatlistCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: widthScale(-2),

  },
  topGainersText: {
    fontSize: widthScale(10),
    fontFamily: myFonts.montserratRegular,
    color: colors.FORGOT_PASSWORD,
    padding: widthScale(4),
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',

  },
  arrowStyle: {
    alignSelf: 'center',
    marginRight: widthScale(20),
    marginTop: heightScale(10)
  },
  arrowDownStyle: {
    alignSelf: 'center',
    marginLeft: widthScale(20),
    marginTop: heightScale(10)
  },
  icon: {
    marginHorizontal: widthScale(30)
    //flex:1
  },
  topGainersTextHeading: {
    fontSize: widthScale(10),
    fontFamily: myFonts.openSansBold,
    color: colors.LIGTH_GREEN,
    flex: 1,
    textAlign: 'center',
    marginTop: heightScale(10)
  },
  viewLine: {
    borderTopWidth: 2,
    borderColor: colors.LIGTH_GREEN,
    marginBottom: heightScale(20),
    marginHorizontal: heightScale(12),

  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: heightScale(30),
    paddingVertical: heightScale(7)
  }
})



export default TableViewFlatlist;