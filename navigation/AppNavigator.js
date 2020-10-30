import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage'


import HomeScreen from '../screens/HomeScreen';
import TimerScreen from '../screens/TimerScreen';
import BreakScreen from '../screens/BreakScreen';

import { AuthContext } from '../components/contex';


import MyWorkScreen from '../screens/MyWorkScreenHook';
import SittingScreen from '../screens/SittingScreen';
import * as Icon from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import RootStackScreen from '../screens/RootStackScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: 'aliceblue' },
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TimerScreen"
                component={TimerScreen}
                options={({ route }) => {
                    const timeStart = route.params.timeStart;
                    return {
                        headerBackTitle: null,
                        headerTruncatedBackTitle: null,
                        headerTitle: `Anfangen ${timeStart}`,
                    };
                }}
            />
        </Stack.Navigator>
    );
}
function WorkStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: 'aliceblue' },
            }}
        >
            <Stack.Screen
                name="MyWorkScreen"
                component={MyWorkScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BreakScreen"
                component={BreakScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>

    )
}
function LoginStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: 'aliceblue' },
            }}>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>)
}


export default function AppNavigator() {


    //const [isLoading, setIsLoading] = React.useState(true);
    // const [userToken, setUserToken] = React.useState(null);

    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,

    };
    const [user, setUser] = useState([])
    useEffect(() => {
        _retrieveData();

    }, [])

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    userName: action.id,
                    userToken: action.token,
                    isLoading: action.lod,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            // default :return null;
        }
    }
    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    const _retrieveData = async () => {
        let value = await AsyncStorage.getItem('2');
        if (value !== null) {
            value = JSON.parse(value);
            setUser(value)
            console.log("success");
            console.log(user)
        }
    }

    const authContext = React.useMemo(() => ({
        signIn: (userName, password) => {
            // userToken = String(foundUsesr[0].userToken)
            // userName = String(foundUsesr[0].username)
            -_retrieveData();
            //userName = null;
            const foundUser = user.filter(item => {
                return userName == item.username && password == item.password;

            });
            if (foundUser.length >= 1) {
                dispatch({ type: 'LOGIN', id: userName, token: userName, lod: false });

            }
            else {
                dispatch({ type: 'LOGIN', id: null, token: null, lod: false });

                Alert.alert('type Fehler', 'username oder Passwort ist leerrr', [
                    { text: 'okay' }
                ]);
                return;
            }

        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken')
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: 'LOGOUT' })
        },
        signUp: (username) => {
            dispatch({ type: 'REGISTER', token: username, id: username })
        },

    }), [])

    useEffect(() => {
        setTimeout(async () => {
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken')
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
        }, 1000);
    }, []);

    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text>Loading</Text>
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.userToken !== null ? (<Tab.Navigator
                    screenOptions={

                        ({ route }) => ({

                            tabBarIcon: ({ focused, color, size }) => {
                                let icon;

                                if (route.name === 'Home') {
                                    icon = focused ? 'home' : 'home-outline';
                                } else if (route.name === 'MyWork') {
                                    icon = focused ? 'check-network' : 'check-network-outline';
                                }
                                else if (route.name === 'Setting') {
                                    icon = focused ? 'settings' : 'settings-outline';
                                }

                                return (
                                    <Icon.MaterialCommunityIcons
                                        name={icon}
                                        size={40}
                                        color={color}
                                    />
                                );
                            },
                        })}
                    tabBarOptions={{
                        activeTintColor: 'darkorange',
                        style: { backgroundColor: 'aliceblue', height: 60 },
                    }}
                >
                    <Tab.Screen name="Home" component={HomeStack} options={{
                        title: ''
                    }} />
                    <Tab.Screen name="MyWork" component={WorkStack} options={{
                        headerStyle: { backgroundColor: 'aliceblue' },
                        title: ''
                    }} />
                    <Tab.Screen name="Setting" component={SittingScreen} options={{
                        headerStyle: { backgroundColor: 'aliceblue' },
                        title: ''
                    }} />




                </Tab.Navigator>

                ) : <RootStackScreen />}

            </NavigationContainer>
        </AuthContext.Provider>
    );
}

