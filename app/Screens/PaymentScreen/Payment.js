import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Linking, Button } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';

const HOST = "https://braintree-server0-1.vercel.app";

const Payment = ({ onNonceRetrieved }) => {
    const customUserAgent = "Mozilla/5.0 (Linux; Android 4.4.4; One Build/KTU84L.H4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.135 Mobile Safari/537.36";
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



    // console.log(clientToken);


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, width: "100%" }}>
            <Text style={{
                fontSize: 24,
                fontFamily: "syneSemiBold"
            }}>Please enter your card details.</Text>
            <WebView
                source={{ uri: `${HOST}/braintree?client_token=${clientToken}&&amount=100` }}
                onMessage={(event) => {
                    // console.log(event);
                    onNonceRetrieved(JSON.parse(event.nativeEvent.data));
                }}
                webContentsDebuggingEnabled={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Payment;
