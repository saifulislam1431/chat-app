import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';

const HOST = "http://192.168.0.114:5000";

const Payment = ({ onNonceRetrieved }) => {
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
        <View style={{ flex: 1, height: 500 }}>
            <Text style={{ fontSize: 30, fontWeight: '500' }}>BrainTree Payment Integration</Text>
            <WebView
                source={{ uri: `${HOST}/googlePay` }}
                onMessage={(event) => {
                    console.log(event);
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

export default Payment;
