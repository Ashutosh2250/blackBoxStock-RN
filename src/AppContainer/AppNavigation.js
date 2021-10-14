import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ForgotPassword from '../components/LoginStack/ForgotPassword';
import Login from '../components/LoginStack/Login';
import TermsAndCondition from '../components/LoginStack/TermsAndCondition';
import Splash from '../components/Splash/Splash';
import CustomHeaderText from '../CustomUI/CustomHeaderText';
import colors from '../res/colors';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../CustomUI/CustomDrawer';
import Animated from 'react-native-reanimated';
import HomeScreen from '../components/HomeStack/HomeScreen';
import CustomMainHeader from '../CustomUI/CustomMainHeader';
import Category from '../components/HomeStack/Category';
import AlertLogScreen from '../components/AlertLog/AlertLogScreen'
import styles from './style'
import Decliners from '../components/HomeStack/Decliners';
import Options from '../components/HomeStack/Options';
import Filter from '../components/HomeStack/Filter/Filters';
import MyProfileScreen from '../components/MyProfile/MyProfileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLogin } from '../redux/actions/LoginAction';
import EducationScreen from '../components/HomeStack/Education/EducationScreen';
import StockTwitsScreen from '../components/HomeStack/StockTwits/StockTwitsScreen';
import News from '../components/HomeStack/News/News';
import MySettings from '../components/Settings/MySettings';
import Mods from '../components/Mods/Mods';
import AlertStream from '../components/AlertStream/AlertStream';
import ChartView from '../components/HomeStack/ChartView';
import Stocks from '../components/HomeStack/Stocks';
import TopGainerScreen from '../components/HomeStack/GainerScreen'
import TeamTradeScreen from '../components/HomeStack/TeamTradeScreen'



const Screens = ({ props, style }) => {
    const Stack = createStackNavigator();
    const selectedSymbol = useSelector(state => state.marketCategory.selectedSymbol);
    return (<Animated.View style={StyleSheet.flatten([styles.stack, style])}>
        <Stack.Navigator>
            <Stack.Screen
                name={'Home'}
                component={HomeScreen}
                options={{
                    header: (props) => null
                }}
            />
            <Stack.Screen
                name={'Category'}
                options={({ route, navigation }) => {

                    const { index } = route && route.state ? route.state : {}

                    return ({

                        header: (props) => (

                            <CustomHeaderText
                                showFilterIcon={index != 5 || index == undefined ? false : true}

                                showSearch={true} {...props} label="Stock Scanners"
                            />


                        ),



                    })
                }
                }
                component={Category} />
            <Stack.Screen
                name={'TopGainerScreen'}

                options={{
                    header: (props) => <CustomHeaderText showSearch={true} {...props} label="Top Gainer" />
                }}
                component={TopGainerScreen} />
            <Stack.Screen
                name={'TeamTradeScreen'}
                options={{
                    header: (props) => <CustomHeaderText showSearch={false} {...props} label="Team Trade" />
                }}
                component={TeamTradeScreen} />
            <Stack.Screen
                name={'AlertLogScreen'}
                options={{
                    headerShown: false
                }}
                component={AlertLogScreen} />
            <Stack.Screen
                name={'AlertStream'}
                options={{
                    headerShown: false
                }}
                component={AlertStream} />
            <Stack.Screen
                name={'Decliners'}
                options={{
                    header: (props) => <CustomHeaderText showSearch={false} {...props} label="Decliners" />
                }}
                component={Decliners} />
            <Stack.Screen
                name={'News'}
                options={{
                    headerShown: false
                }}
                component={News} />
            <Stack.Screen
                name={'Options'}
                options={({ route, navigation }) => {
                    console.log("route...", route);
                    return ({

                        header: (props) => (
                            <CustomHeaderText {...props}
                                showSearch={true}
                                showFilterIcon={route.params ? route.params.showFilter : 'Flow'}
                                label={"Options"}
                                showChart={true}
                            />
                        ),

                    })
                }}
                component={Options} />
            <Stack.Screen
                name={'ChartView'}
                options={({ route, navigation }) => {
                    console.log("route123...", route);
                    return ({

                        header: (props) => (
                            <CustomHeaderText {...props}
                                showSearch={true}
                                label={"Chart"}

                            />
                        ),

                    })
                }}
                component={ChartView} />

            <Stack.Screen
                name={'Stocks'}
                options={({ route, navigation }) => {
                    return ({
                        header: (props) => (
                            <CustomHeaderText {...props}
                                showSearch={true}
                                label={"Stocks"}

                            />
                        ),

                    })
                }}
                component={Stocks} />

            <Stack.Screen
                name={'Filter'}
                options={({ route, navigation }) => ({
                    header: (props) => (
                        <CustomHeaderText {...props}
                            label="Filter"
                            showReset={true}
                            showFilterIcon={route.params ? route.params.showFilter : 'Flow'}
                            resetCallback={() => route.params.resetClicked()} />
                    ),

                })}
                component={Filter} />
            <Stack.Screen
                name={'MyProfileScreen'}
                options={{
                    header: (props) => <CustomMainHeader showSearch={false} {...props} label="My Account" />
                }}
                component={MyProfileScreen} />
            <Stack.Screen
                name={'EducationScreen'}
                options={{
                    header: (props) => <CustomHeaderText showSearch={true} {...props} label="Education" />
                }}
                component={EducationScreen} />
            <Stack.Screen
                name={'StockTwitsScreen'}
                options={{
                    header: (props) => <CustomHeaderText showSearch={true} {...props} label="StockTwits" />
                }}
                component={StockTwitsScreen} />

            <Stack.Screen
                name={'MySettings'}
                options={{
                    header: (props) => <CustomMainHeader showSearch={false} {...props} label="Settings" />
                }}
                component={MySettings} />
            <Stack.Screen
                name={'Mods'}
                options={{
                    header: (props) => <CustomMainHeader showSearch={false} {...props} label="Mods" />
                }}
                component={Mods} />
        </Stack.Navigator>
    </Animated.View>
    );
};

const AppNavigation = (props) => {
    const RegisterStack = createStackNavigator();
    const Drawer = createDrawerNavigator();
    const [isLoading, setIsLoading] = useState(true);
    const isUserLogin = useSelector(state => state.user.userLogin);
    const [progress, setProgress] = useState(new Animated.Value(0));
    const dispatch = useDispatch();

    useEffect(async () => {
        try {
            let getToken = await AsyncStorage.getItem('@TOKEN', "");
            dispatch(userLogin(getToken))
        } catch (error) {
            console.log(error, "error");
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, []);
    if (isLoading) {
        return <Splash />
    }
    const scale = Animated.interpolateNode(progress, {

        inputRange: [0, 1],
        outputRange: [1, 0.8],

    });
    const borderRadius = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 16],
    });
    const animatedStyle = { borderRadius, transform: [{ scale }] };
    return (
        <NavigationContainer>
            {
                isUserLogin
                    ?
                    <Drawer.Navigator initialRouteName="Home"
                        drawerType={'back'}
                        overlayColor={{ backgroundColor: colors.APP_THEME }}
                        drawerContent={(props) => {
                            setProgress(props.progress)
                            return (<CustomDrawer {...props} />)
                        }}
                        drawerStyle={styles.drawerStyles}
                        contentContainerStyle={{ flex: 1 }}
                        drawerContentOptions={{
                            activeBackgroundColor: colors.APP_THEME,
                            activeTintColor: 'white',
                            inactiveTintColor: 'white',
                        }}
                        screenOptions={{ headerShown: false }}
                        sceneContainerStyle={{ backgroundColor: '#010101' }}
                    >
                        <Drawer.Screen name="Screens">
                            {props => <Screens {...props} style={animatedStyle} />
                            }
                        </Drawer.Screen>
                    </Drawer.Navigator>
                    :
                    <RegisterStack.Navigator
                        initialRouteName="Login">
                        <RegisterStack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false }}
                        />
                        <RegisterStack.Screen
                            name="TermsAndCondition"
                            component={TermsAndCondition}
                            options={{
                                header: (props) => <CustomHeaderText showSearch={false} {...props} label="Terms And Condition" />,
                            }}
                        />
                        <RegisterStack.Screen
                            name="ForgotPassword"
                            component={ForgotPassword}
                            options={{
                                header: (props) => <CustomHeaderText showSearch={false} {...props} label="Forgot Password" />,
                            }}
                        />
                    </RegisterStack.Navigator>

            }
        </NavigationContainer >
    )
}

export default AppNavigation;