import React, { useCallback } from 'react'
import { Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './FeatureListStyle'
import { keyGenerator } from '../utils/Utils';

const FeatureListItem = props => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() =>
            props.data.id == 4 ||
                props.data.id == 5 ||
                props.data.id == 6 ||
                props.data.id == 7 ?
                navigation.navigate('Category', { name: props.data.title, index: props.data.selectedIndex }) :
                props.data.id == 8 ? navigation.navigate('Decliners') :
                    props.data.id == 10 ? navigation.navigate('Options') :
                        props.data.id == 9 ? navigation.navigate('AlertLogScreen') :
                            props.data.id == 3 ? navigation.navigate('AlertStream') :
                                props.data.id == 12 ? navigation.navigate("EducationScreen") :
                                    props.data.id == 11 ? navigation.navigate("StockTwitsScreen") :
                                        props.data.id == 2 ? navigation.navigate("ChartView") :
                                            props.data.id == 15 ? navigation.navigate("Stocks") :
                                                props.data.id == 13 ? navigation.navigate("News") :
                                                    props.data.id == 14 ? navigation.navigate("TeamTradeScreen") :
                                                        props.data.id == 1 ? navigation.navigate("TopGainerScreen")
                                                            : false} style={props.index >= 12 ? styles.container1 : styles.container}>
            <Image source={props.data.itemImage} resizeMode={'contain'} />
            <Text style={styles.textStyle}>{props.data.itemName}</Text>
        </TouchableOpacity>
    )
}
// https://images.unsplash.com/photo-1620057657132-e737f4983bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2600&q=80

export default FeatureListItem;