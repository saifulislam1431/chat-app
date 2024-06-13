import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'react-native';
import BraintreeDropIn from 'react-native-braintree-payments-drop-in';

const HOST = "https://braintree-server0-1.vercel.app";

const GPayTest = () => {
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

    const showGooglePay = async () => {
        if (clientToken) {
            try {
                const result = await BraintreeDropIn.show({
                    clientToken: clientToken,
                    googlePay: {
                        enabled: true,
                        environment: 'TEST', // Use 'PRODUCTION' for production
                        merchantId: '378317447873447996',
                        currencyCode: 'USD',
                        countryCode: 'US',
                    },
                });
                console.log(result);
            } catch (error) {
                console.error("Error showing Google Pay:", error);
            }
        } else {
            console.error("Client token not available.");
        }
    };

    return (
        <Fragment>
            <Button title="Pay with Google Pay" onPress={showGooglePay} disabled={loading} />
        </Fragment>
    );
};

export default GPayTest;
