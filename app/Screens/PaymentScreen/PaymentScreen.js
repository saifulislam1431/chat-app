import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, Alert, StatusBar, TouchableOpacity, Text } from 'react-native';
import Payment from './Payment';
import GooglePay from './GooglePay';
import Paypal from './Paypal';
import CardPaymentModal from "../../../components/Modals/CardPaymentModal"
import PaypalPaymentModal from "../../../components/Modals/PaypalPaymentModal"

const HOST = "https://braintree-server0-1.vercel.app";

const PaymentScreen = () => {
    const [cardModal, setCardModal] = useState(false);
    const [paypalModal, setPaypalModal] = useState(false);

    return (
        <View style={styles.container}>

            {/* <GooglePay
                onNonceRetrieved={async ({ nonce, type, billingAddress }) => {
                    try {
                        const response = await axios.post(`${HOST}/createPaymentTransaction`, {
                            amount: 100, // Change to price gotten from your user
                            nonce: nonce,
                            type: type,
                            billingAddress: billingAddress
                        });
                        const { isPaymentSuccessful, errorText } = response.data;
                        Alert.alert(isPaymentSuccessful ? "Payment successful" : `Payment error - ${errorText}`);
                    } catch (error) {
                        console.error("Payment failed: ", error);
                        Alert.alert("Payment error", "An error occurred while processing the payment.");
                    }
                }}
            /> */}

            <StatusBar style="auto" />

            <View style={{
                marginTop: 20,
                paddingHorizontal: 20
            }}>
                <Text style={{
                    fontSize: 28,
                    fontFamily: "barlowBold"
                }}>Choose Your Payment Method.</Text>

                <View style={{
                    marginTop: 20,
                    alignItems: "flex-start",
                    rowGap: 10
                }}>
                    <TouchableOpacity style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "#0077b6",
                        alignItems: "center",
                        paddingVertical: 5,
                        paddingHorizontal: 20
                    }} onPress={() => setCardModal(true)}>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: "barlowSemiBold",
                            color: "#0077b6"
                        }}>
                            Card
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "#0077b6",
                        alignItems: "center",
                        paddingVertical: 5,
                        paddingHorizontal: 20
                    }} onPress={() => setPaypalModal(true)}>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: "barlowSemiBold",
                            color: "#0077b6"
                        }}>
                            Paypal
                        </Text>
                    </TouchableOpacity>
                </View>
                <CardPaymentModal visible={cardModal} setVisible={setCardModal} />
                <PaypalPaymentModal visible={paypalModal} setVisible={setPaypalModal} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default PaymentScreen;
