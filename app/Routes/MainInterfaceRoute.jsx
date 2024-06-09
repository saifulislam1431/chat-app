import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import WelcomeScreen from '../Screens/WelcomeScreen/WelcomeScreen';
import ChatScreen from '../Screens/ChatScreen/ChatScreen';
import PaymentScreen from '../Screens/PaymentScreen/PaymentScreen';

const Tab = createBottomTabNavigator();

const MainInterfaceRoute = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let IconComponent;

                        if (route.name === 'Home') {
                            iconName = 'home';
                            IconComponent = focused ? Entypo : AntDesign; // Use Entypo for focused, AntDesign for unfocused
                        } else if (route.name === 'Chat') {
                            iconName = focused ? "chatbubble-ellipses-sharp" : "chatbubble-ellipses-outline"
                            IconComponent = Ionicons;
                        } else if (route.name === "Payment") {
                            iconName = focused ? "card" : "card-outline"
                            IconComponent = Ionicons;
                        }

                        // You can return any component that you like here!
                        return (
                            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
                                <IconComponent name={iconName} size={24} color={color} />
                            </View>)
                    },
                    tabBarStyle: {
                        height: 60, // Add vertical padding
                    },
                    tabBarLabelStyle: {
                        fontFamily: 'syneSemiBold', // Change font family
                        fontSize: 11,
                        paddingBottom: 3, // Optional: change font size
                    },
                    tabBarActiveTintColor: '#03045e',
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen name="Home" component={WelcomeScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Payment" component={PaymentScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    iconContainerFocused: {
        backgroundColor: '#E8E8E898', // Background color when active
    },
})

export default MainInterfaceRoute;
