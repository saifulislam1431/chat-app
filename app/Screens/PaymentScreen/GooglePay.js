import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';

const HOST = "https://braintree-server0-1.vercel.app";

const GooglePay = ({ onNonceRetrieved }) => {
    const customUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
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
            }}>Please Pay.</Text>
            <WebView
                source={{ uri: `${HOST}/googlePay?client_token=${clientToken}&amount=100` }}
                cacheEnabled={false}
                cacheMode='LOAD_NO_CACHE'
                onMessage={(event) => {
                    onNonceRetrieved(JSON.parse(event.nativeEvent.data));
                }}
                webContentsDebuggingEnabled={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                userAgent={customUserAgent}
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

export default GooglePay;
