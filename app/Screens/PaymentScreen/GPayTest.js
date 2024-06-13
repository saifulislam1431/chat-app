import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, View } from 'react-native';
import { GooglePay } from 'react-native-google-pay';

const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
const HOST = "https://braintree-server0-1.vercel.app";

const GPayTest = () => {
    const [loading, setLoading] = useState(true);
    const [clientToken, setClientToken] = useState(null);

    const requestData = {
        cardPaymentMethod: {
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                gateway: 'braintree',
                gatewayMerchantId: '378317447873447996',
                'braintree:apiVersion': 'v1',
                'braintree:merchantId': 'n9xd2ttx7p9zgpzk',
                'braintree:clientKey': clientToken,
            },
            allowedCardNetworks,
            allowedCardAuthMethods,
        },
        transaction: {
            totalPrice: '100',
            totalPriceStatus: 'FINAL',
            currencyCode: 'USD',
        },
        merchantName: 'Example Merchant',
    };

    useEffect(() => {
        // Set up Google Pay
        try {
            GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
            GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
                .then((ready) => {
                    if (!ready) {
                        Alert.alert('Google Pay is not available on this device');
                    }
                })
                .catch((error) => Alert.alert('Error', error.message));
        } catch (error) {
            console.error("Google Pay initialization error:", error);
            Alert.alert('Error', 'Google Pay initialization failed');
        }
    }, []);

    useEffect(() => {
        const fetchClientToken = async () => {
            try {
                const response = await axios.get(`${HOST}/client_token`);
                setClientToken(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch client token:", error);
                Alert.alert('Error', 'Failed to fetch client token');
            }
        };
        fetchClientToken();
    }, []);

    const handleGooglePayPress = () => {
        if (!clientToken) {
            Alert.alert('Error', 'Client token is not available');
            return;
        }

        GooglePay.requestPayment(requestData)
            .then((token) => {
                // Send a token to your payment gateway
                Alert.alert('Payment successful', `Token: ${token}`);
            })
            .catch((error) => Alert.alert('Payment failed', error.message));
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View>
            <Button title="Pay with Google Pay" onPress={handleGooglePayPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GPayTest;
