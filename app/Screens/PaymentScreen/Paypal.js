import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import WebView from 'react-native-webview';

const HOST = "https://braintree-server0-1.vercel.app";

const Paypal = ({ onNonceRetrieved }) => {
    const [loading, setLoading] = useState(true);

    return (
        <View style={{ flex: 1, width: "100%" }}>
            <Text style={{
                fontSize: 24,
                fontFamily: "syneSemiBold",
                marginBottom: 20
            }}>Please choose paypal payment option.</Text>
            <WebView
                source={{ uri: `${HOST}/paypal` }}
                onLoad={() => setLoading(false)}
                onMessage={(event) => {
                    const data = JSON.parse(event.nativeEvent.data);
                    onNonceRetrieved(data);
                }}
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

export default Paypal;
