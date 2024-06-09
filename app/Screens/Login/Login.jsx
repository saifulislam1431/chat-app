import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Pressable, TextInput } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const Login = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dimensions = Dimensions.get('window');
    const maxWidth = dimensions.width;
    const navigation = useNavigation();

    const theme = {
        maxWidth: maxWidth,
        darkBlue: "#03045e",
        lightBlue: "#0077b6",
        skyBlue: "#00b4d8",
        lightSky: "#90e0ef",
        whiteSky: "#caf0f8"
    }

    const onSubmit = async () => {
        if (email === "") {
            return setError("Email is required.");
        }
        else if (password === "") {
            return setError("password is required.");
        } else {
            const userInfo = {
                email: email,
                password: password
            }
            navigation.navigate("HomeRoute")
        }

    }


    return (
        <ScrollView
            style={styles.container} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "flex-start"
            }}>
            <View style={{
                maxHeight: 250,
                width: "100%",
                position: "relative",
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <View style={{
                    position: "absolute",
                    top: 0
                }}>
                    <Image source={require("@/assets/images/login.png")} style={{
                        width: maxWidth,
                        height: 400,
                    }}></Image>

                </View>

                <View
                    style={{
                        alignItems: "center"
                    }}
                >
                    <Animated.Text entering={FadeInUp.delay(100).duration(1000)} style={{
                        marginTop: 20,
                        color: "#FFFFFF",
                        fontSize: 28,
                        fontFamily: "syneSemiBold",
                        textAlign: "center",
                    }}>Don't you have a account?</Animated.Text>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Register")
                    }} style={{
                        marginVertical: 20,
                        backgroundColor: "#ffffff",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 15,
                    }}>
                        <Text style={{
                            fontFamily: "syne",
                            fontSize: 16,
                            color: "#0077b6"
                        }}>Sign Up</Text>
                    </TouchableOpacity>

                    <Animated.Text entering={FadeInUp.delay(150).duration(1000)} style={{
                        marginTop: 20,
                        color: "#FFFFFF",
                        fontSize: 45,
                        fontFamily: "quicksandBold",
                        textAlign: "center",
                    }}>Welcome Back!</Animated.Text>


                    <View>

                    </View>
                </View>
            </View>

            {/* Form */}
            <View style={{

                width: maxWidth,
                rowGap: 20,
                marginTop: 200,
                zIndex: 50,
                alignItems: 'center'

            }}>
                <Animated.View style={{ width: maxWidth / 1.2, }} entering={FadeInDown.delay(300).duration(1000).springify()}>
                    <Text style={{
                        color: theme?.darkBlue,
                        fontFamily: "quicksandBold",
                        fontSize: 15,
                        marginBottom: 10
                    }}>Email <Text style={{
                        color: "#FF204E"
                    }}>*</Text></Text>
                    <View style={{
                        backgroundColor: "rgba(0, 119, 182, .7)",
                        width: maxWidth / 1.2,
                        padding: 12,
                        borderRadius: 20,
                        marginHorizontal: "auto",
                    }}>
                        <TextInput onChangeText={setEmail} placeholder='example@email.com' placeholderTextColor={"#ffffff"} style={{
                            width: "100%",
                            color: "#ffffff"
                        }} />
                    </View>
                </Animated.View>

                <Animated.View style={{ width: maxWidth / 1.2, }} entering={FadeInDown.delay(400).duration(1000).springify()}>

                    <Text style={{
                        color: theme?.darkBlue,
                        fontFamily: "quicksandBold",
                        fontSize: 15,
                        marginBottom: 10
                    }}>Password <Text style={{
                        color: "#FF204E"
                    }}>*</Text></Text>

                    <View style={{
                        backgroundColor: "rgba(0, 119, 182, .7)",
                        width: maxWidth / 1.2,
                        padding: 12,
                        borderRadius: 20,
                        marginHorizontal: "auto",
                    }}>
                        <TextInput onChangeText={setPassword} placeholder='******' placeholderTextColor={"#ffffff"} secureTextEntry
                            style={{
                                width: "100%",
                                color: "#ffffff"
                            }}
                        />
                    </View>
                </Animated.View>

                {
                    error && <View>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: "quicksand",
                            fontWeight: 500,
                            color: "#FF204E"
                        }}>{error}</Text>
                    </View>
                }

                <Animated.View entering={FadeInDown.delay(300).duration(1000).springify()} style={{
                    width: maxWidth
                }}>
                    <TouchableOpacity disabled={!email || !password && true} style={{
                        backgroundColor: theme?.lightBlue,
                        width: maxWidth / 1.2,
                        padding: 12,
                        borderRadius: 20,
                        marginHorizontal: "auto",
                    }} onPress={onSubmit}>
                        <Text className="text-white text-center font-semibold"
                            style={{
                                color: "#ffffff",
                                fontFamily: "syneSemiBold",
                                textAlign: "center",
                            }}
                        >Login</Text>
                    </TouchableOpacity>
                </Animated.View>


                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={{
                    width: maxWidth,
                    marginVertical: 20
                }}>
                    <TouchableOpacity onPress={() => {
                        console.log("Forgot pass");
                    }}>
                        <Text className="text-white text-center font-semibold"
                            style={{
                                color: theme?.darkBlue,
                                fontFamily: "quicksand",
                                textAlign: "center",
                                fontSize: 20,
                                textDecorationColor: theme?.darkBlue,
                                textDecorationStyle: "solid",
                                textDecorationLine: "underline"
                            }}
                        >Forgot your password?</Text>
                    </TouchableOpacity>
                </Animated.View>


                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={{
                    width: maxWidth,
                    marginVertical: 10
                }}>
                    <View style={{
                        width: maxWidth / 1.2,
                        marginHorizontal: "auto",
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "center",
                        columnGap: 10,
                    }}>
                        <View style={{
                            width: "100%",
                            borderTopWidth: 1,
                            borderTopColor: theme?.lightBlue,
                            borderStyle: 'solid'
                        }} />
                        <Text style={{
                            fontFamily: "syneSemiBold",
                            color: theme?.lightBlue
                        }}>Or sign in with</Text>
                        <View style={{
                            width: "100%",
                            borderTopWidth: 1,
                            borderTopColor: theme?.lightBlue,
                            borderStyle: 'solid'
                        }} />
                    </View>


                    <View style={{
                        marginVertical: 30,
                        flexDirection: 'column',
                        alignItems: "center",
                        justifyContent: "center",
                        columnGap: 20
                    }}>
                        <Pressable
                            style={{
                                backgroundColor: "rgba(0, 119, 182, .8)",
                                width: 70,
                                height: 70,
                                borderRadius: 50,
                                alignItems: "center",
                                justifyContent: "center"

                            }}
                            onPress={() => {
                                console.log("Google");
                            }}>
                            <Text className="text-white text-center font-semibold"
                                style={{
                                    color: "#ffffff",
                                }}
                            ><FontAwesome name="google" size={40} color="#ffffff" /></Text>
                        </Pressable>
                    </View>
                </Animated.View>

            </View>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        position: "relative",
        backgroundColor: "#ffffff",

    },

    image: {
        borderColor: "#000",
        borderWidth: 1,
        borderStyle: "solid",
        width: "100%",
        height: "500px"
    },




})

export default Login;
