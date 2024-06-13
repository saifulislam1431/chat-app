import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import WebView from 'react-native-webview';

const HOST = "https://braintree-server0-1.vercel.app";

const ApplePay = ({ onNonceRetrieved }) => {
    const [loading, setLoading] = useState(true);
    const [clientToken, setClientToken] = useState(null);

    useEffect(() => {
        const fetchClientToken = async () => {
            try {
                const response = await axios.get(`${HOST}/client_token`);
                setClientToken(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch client token:", error);
            }
        };
        fetchClientToken();
    }, []);

    const handleMessage = (event) => {
        const { data } = event.nativeEvent;
        try {
            const message = JSON.parse(data);
            if (message.isPaymentSuccessful) {
                Alert.alert("Payment Status", "Payment was successful!");
            } else {
                Alert.alert("Payment Status", "Payment failed: " + message.error);
            }
        } catch (error) {
            console.error('Failed to parse message from WebView:', error);
        }
    };

    return (
        <View style={{ flex: 1, width: "100%" }}>
            <Text style={{ fontSize: 24, fontFamily: "syneSemiBold", marginBottom: 20 }}>Please choose Apple Pay payment option.</Text>
            <WebView
                source={{ uri: `${HOST}/applePay?client_token=${clientToken}&amount=100` }}
                onLoad={() => setLoading(false)}
                cacheEnabled={false}
                cacheMode='LOAD_NO_CACHE'
                onMessage={handleMessage}
                style={{ flex: 1 }}
            />
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ApplePay;
