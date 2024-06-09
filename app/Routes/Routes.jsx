import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Screens/Login/Login';
import Register from '../Screens/Register/Register';
import MainInterfaceRoute from "./MainInterfaceRoute"


const Stack = createStackNavigator();

const Routes = () => {
    const user = true;
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName={user ? "HomeRoute" : 'Login'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="HomeRoute" component={MainInterfaceRoute} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
