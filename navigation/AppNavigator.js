import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import TimerScreen from '../screens/TimerScreen';
import BreakScreen from '../screens/BreakScreen';


import MyWorkScreen from '../screens/MyWorkScreenHook';
import SittingScreen from '../screens/SittingScreen';
import * as Icon from '@expo/vector-icons';




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


export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
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



            </Tab.Navigator>
        </NavigationContainer>
    );
}

