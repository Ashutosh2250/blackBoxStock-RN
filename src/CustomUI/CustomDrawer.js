import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import images from '../res/images/images';
import { widthScale } from '../utils/Utils';
import MainBackground from './MainBackground';
import styles from './CustomDrawerStyle'
import strings from '../res/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/LoginAction';


const CustomDrawer = props => {
    const dispatch = useDispatch();
    const onPressLogout = async () => {
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
    };
    const [email, setEmail] = useState('');
    const [firstNam, setFname] = useState('');
    const [secondNam, setLname] = useState('');
    const [fullname, setFullname] = useState('');


    const getValue = async () => {
        const myEmail = await AsyncStorage.getItem('@email_key')
        const INFO = await AsyncStorage.getItem('@userinfo')
        const value = JSON.parse(INFO)
        setEmail(myEmail)
        setFname(value.firstName)
        setLname(value.lastName)
        console.log(myEmail, "myEmail", value);
    }
    getValue()
    return (
        <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={styles.drawerScrollStyle}>
            <MainBackground>
                <View style={{ padding: widthScale(20) }}>
                    <TouchableOpacity onPress={() => { props.navigation.toggleDrawer() }}>
                        <Image source={images.backBtn} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => false} style={styles.avtarBoxStyle}>
                        <View style={styles.avtarStyle}>
                            <Image source={images.logo_new} style={styles.avatar} resizeMode={'contain'} />
                        </View>
                        <View style={styles.profileCon}>
                            <Text style={styles.nameText}>{firstNam ? firstNam + ' ' + secondNam : ""}</Text>
                            <Text style={styles.emailText}>{email ? email : "NA"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewLine} />
                <View style={styles.drawerCon}>
                    <DrawerItem
                        label={"HOME"}
                        labelStyle={styles.drawerLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => props.navigation.navigate('Home')}
                        icon={() => <Image source={images.drawer_home} style={styles.imageStyle} resizeMode={'contain'} />}
                    />

                    <DrawerItem
                        label={"MY ACCOUNT"}
                        labelStyle={styles.drawerLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            props.navigation.navigate('MyProfileScreen')
                        }}
                        icon={() => <Image source={images.drawer_account} style={styles.imageStyle} resizeMode={'contain'} />}
                    />
                    <DrawerItem
                        label={strings.settings}
                        labelStyle={styles.drawerLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            props.navigation.navigate('MySettings')
                        }}
                        icon={() => <Image source={images.drawer_settings} style={styles.imageStyle} resizeMode={'contain'} />}
                    />
                    <DrawerItem
                        label={'SUPPORT'}
                        labelStyle={styles.drawerLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            alert("Work in Progress")
                        }}
                        icon={() => <Image source={images.drawer_support} style={styles.imageStyle} resizeMode={'contain'} />}
                    />
                    <DrawerItem
                        label={strings.legal_term}
                        labelStyle={styles.drawerLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            alert("Work in Progress")
                        }}
                        icon={() => <Image source={images.drawer_terms} style={styles.imageStyle} resizeMode={'contain'} />
                        }
                    />

                    <DrawerItem
                        label={strings.logout}
                        labelStyle={styles.drawerLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => { onPressLogout() }}
                        icon={() => <Image source={images.drawer_logout} style={styles.imageStyle} resizeMode={'contain'} />}
                    />
                </View>
            </MainBackground>
        </DrawerContentScrollView>
    )
}

export default CustomDrawer;