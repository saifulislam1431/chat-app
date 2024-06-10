import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';

const HOST = "https://braintree-server0-1.vercel.app";

const GooglePay = ({ onNonceRetrieved }) => {
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
                source={{ uri: `${HOST}/googlePay?client_token=${clientToken}&&amount=100` }}
                onMessage={(event) => {
                    // console.log(event);
                    onNonceRetrieved(JSON.parse(event.nativeEvent.data));
                }}
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

