import React from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import GooglePay from '@/app/Screens/PaymentScreen/GooglePay';
import GPayTest from '@/app/Screens/PaymentScreen/GPayTest';

const HOST = "https://braintree-server0-1.vercel.app";

const GooglePayPaymentModal = ({ visible, setVisible }) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", width: "100%" }}>
            <Modal visible={visible} animationType="slide" transparent={true}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: "#ffffff",
                        padding: 20,
                        width: '90%',
                        maxHeight: "90%",
                        borderRadius: 20
                    }}>
                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={{
                                fontSize: 24,
                                fontFamily: "syneBold",
                                color: "#0077b6"
                            }}>Pay With GPay</Text>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Entypo name="cross" color={"#FF1A1A"} size={34} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginTop: 30,
                            flex: 1,
                            width: "100%"
                        }}>
                            {/* <GooglePay onNonceRetrieved={async ({ nonce, deviceData }) => {
                                try {
                                    const response = await axios.post(`${HOST}/createPaymentTransactionByGooglePay`, {
                                        amount: 100, // Change to price gotten from your user
                                        nonce: nonce,
                                        deviceData: deviceData
                                    });
                                    const { isPaymentSuccessful, errorText } = response.data;
                                    Alert.alert(isPaymentSuccessful ? "Payment successful" : `Payment error - ${errorText}`);
                                } catch (error) {
                                    console.error("Payment failed: ", error);
                                    Alert.alert("Payment error", "An error occurred while processing the payment.");
                                }
                            }} /> */}
                            <GPayTest />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default GooglePayPaymentModal;
