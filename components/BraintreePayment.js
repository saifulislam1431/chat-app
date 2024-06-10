import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import BraintreeDropIn from 'react-native-braintree-dropin-ui';

const BraintreePayment = () => {
    const [clientToken, setClientToken] = useState(null);
    console.log(clientToken);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Fetch client token when the component mounts
        axios.get('https://braintree-server0-1.vercel.app/client_token')
            .then(response => {
                setClientToken(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching client token:', error);
                setLoading(false);
            });
    }, []);
    const showDropIn = () => {
        if (!clientToken) {
            Alert.alert('Error', 'Client token is not available');
            return;
        }

        // const options = {
        //     clientToken: clientToken,
        //     merchantIdentifier: '', // iOS only
        //     googlePayMerchantId: '', // Android only
        //     countryCode: 'US', // Apple Pay only
        //     currencyCode: 'USD', // Apple Pay only
        //     merchantName: 'Your Merchant Name for Google Pay', // Android only
        //     orderTotal: 'Total to be Paid',
        // };

        BraintreeDropIn.show({
            clientToken: clientToken,
            countryCode: 'US',
            currencyCode: 'USD',
            orderTotal: '10.00',
            googlePay: false,
            applePay: false,
            vaultManager: false,
            payPal: true,
            cardDisabled: false,
            darkTheme: true,
        })
            .then((result) => {
                if (result.nonce) {
                    // Use the nonce to create a transaction on your server
                    axios.post('https://braintree-server0-1.vercel.app/checkout', {
                        nonce: result.nonce,
                        amount: '10.00', // Example amount, you can change it as needed
                    })
                        .then(response => {
                            Alert.alert('Payment Success', `Transaction ID: ${response.data.transaction.id}`);
                        })
                        .catch(error => {
                            Alert.alert('Payment Error', error.message);
                        });
                } else {
                    Alert.alert('Payment Cancelled');
                }
            })
            .catch((error) => {
                Alert.alert('Payment Error', error.message);
            });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <View>
            <Button title="Pay with Braintree" onPress={showDropIn} />
        </View>
    );
}

const styles = StyleSheet.create({})

export default BraintreePayment;
