import React from 'react';
import { View, Text } from 'react-native';
import styles from './NewsSectionStyle';

const NewsSection = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>The Fly News</Text>
            <Text style={styles.dateTimeText}>February 05, 2021 at 15:09</Text>
            <Text style={styles.despHeading}>Lorem Ipsum is simply dummy text of the</Text>
            <Text style={styles.desp}>Lorem Ipsum has been the industry's standard dum
            my text ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived
            not only five centuries,</Text>

        </View>
    )
}

export default NewsSection;