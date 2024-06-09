import React from 'react';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, SlideInLeft, SlideInUp, ZoomInRotate } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import BraintreePayment from "../../../components/BraintreePayment"
import PaymentScreen from '../PaymentScreen/PaymentScreen';
import axios from 'axios';
const HOST = "http://192.168.0.114:5000";

const WelcomeScreen = () => {
    const navigation = useNavigation()
    const dimensions = Dimensions.get('window');
    const maxWidth = dimensions.width;
    const theme = {
        darkBlue: "#03045e",
        lightBlue: "#0077b6",
        skyBlue: "#00b4d8",
        lightSky: "#90e0ef",
        whiteSky: "#caf0f8"
    }


    const handleNonceRetrieved = async (nonce) => {
        console.log("Click");
        console.log(nonce);
        const response = await axios.post(`${HOST}/createPaymentTransaction`, {
            amount: 10, // change to price gotten from your user
            nonce: nonce,
        });
        const { isPaymentSuccessful, errorText } = await response.data;
        Alert.alert(isPaymentSuccessful ? "Payment successful" : `Payment error - ${errorText}`);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Animated.View entering={ZoomInRotate.springify()
                .damping(30)
                .mass(5)
                .stiffness(10)
                .overshootClamping(false)
                .restDisplacementThreshold(0.1)
                .restSpeedThreshold(0.1)}>
                <MaterialCommunityIcons name="chat-processing-outline" size={100} color="#E0E0E0" />
            </Animated.View>

            <Animated.View entering={SlideInLeft.springify()
                .damping(30)
                .mass(5)
                .stiffness(10)
                .overshootClamping(false)
                .restDisplacementThreshold(0.1)
                .restSpeedThreshold(5)} style={{
                    marginTop: 50,
                    marginBottom: 40
                }}>
                <Text style={{
                    fontFamily: "syneBold",
                    textAlign: "center",
                    fontSize: 34,
                    color: theme.darkBlue
                }}>You don't have chat</Text>
                <Text style={{
                    fontFamily: "syneBold",
                    textAlign: "center",
                    fontSize: 34,
                    color: theme.darkBlue
                }}>messages</Text>
            </Animated.View>

            <Animated.View entering={SlideInLeft.springify()
                .damping(35)
                .mass(5)
                .stiffness(10)
                .overshootClamping(false)
                .restDisplacementThreshold(0.1)
                .restSpeedThreshold(5)} style={{
                    marginTop: 50,
                    marginBottom: 40
                }}>
                <Text style={{
                    fontFamily: "quicksand",
                    textAlign: "center",
                    fontSize: 22,
                    paddingHorizontal: 20,
                    color: "#A1A1A1"
                }}>Please start a new chat.</Text>
            </Animated.View>


            <Animated.View entering={FadeInDown.delay(300).duration(3000).springify()} style={{
                width: maxWidth
            }}>
                <Pressable style={{
                    backgroundColor: theme?.lightBlue,
                    width: maxWidth / 2.5,
                    padding: 12,
                    borderRadius: 20,
                    marginHorizontal: "auto",
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    columnGap: 5
                }} onPress={() => {
                    navigation.navigate("Chat")
                }}>
                    <Text className="text-white text-center font-semibold"
                        style={{
                            color: "#ffffff",
                            fontFamily: "syneSemiBold",
                            textAlign: "center",
                            fontSize: 20
                        }}
                    >Start </Text>
                    <MaterialCommunityIcons name="chat" size={24} color="#ffffff" />
                </Pressable>
            </Animated.View>


            {/* <BraintreePayment /> */}


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
    },
})

export default WelcomeScreen;
