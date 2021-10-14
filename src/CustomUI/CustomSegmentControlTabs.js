import React, { useState } from 'react';
import SegmentedControlTab from "react-native-segmented-control-tab";
import colors from '../res/colors';
import { widthScale } from '../utils/Utils';
import styles from './SegmentedTabStyle';

const CustomSegmentControlTab = props => {

    const [selectedIndex, setSeletctedIndex] = useState(0);
    return (
        <SegmentedControlTab
            values={[...props.dataArray]}
            selectedIndex={selectedIndex}
            tabStyle={styles.tabStyle}
            borderRadius={widthScale(10)}
            tabsContainerStyle={{
                borderColor: colors.LIGTH_GREEN,
                ...props.style
            }}
            activeTabStyle={selectedIndex == 0 ? styles.activeTabLeftStyle : styles.activeTabRightStyle}
            tabTextStyle={styles.lastTabStyle}
            onTabPress={(index) => {
                setSeletctedIndex(index)
                props.onTabPress(index)
            }}
            activeTabTextStyle={styles.activeTabTextStyle}
        />
    )
}

export default CustomSegmentControlTab;