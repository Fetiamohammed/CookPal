import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RecipeDetail from '../component/RecipeDetail'
import Welcome from '../pages/Welcome'
import Home from '../pages/home'
import UsersProfile from '../pages/usersProfile'
import BottomTabIcon from '../component/BottomTabIcon'
import LoginScreen from '../pages/LoginScreen'
import SignUpScreen from '../pages/SignupScreen'
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => (
                    <BottomTabIcon
                        focused={focused}
                        color={color}
                        route={route}
                    />
                )
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Profile"
                component={UsersProfile}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    )
}

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Welcome" component={Welcome} />

                <Stack.Screen
                    name="Home"
                    component={HomeTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RecipeDetail"
                    component={RecipeDetail}
                    options={{ headerShown: true }}
                />

                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                    options={{ headerShown: true }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
//this is the main navigation component that sets up the navigation for the app;
//it uses the NavigationContainer component to wrap the navigation components;
// it uses the createNativeStackNavigator and createBottomTabNavigator functions to create the navigation stack and bottom tab navigation;
