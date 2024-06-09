import { AntDesign, Entypo } from '@expo/vector-icons';
import React from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ChatProfileModal = ({ visible, setVisible, userData }) => {
    console.log(userData);
    return (
        <ScrollView style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{
                justifyContent: "center",
            }}
        >
            <Modal visible={visible} animationType="fade" transparent={true}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>


                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: "#ffffff",
                        padding: 20,
                        width: '100%',
                        maxHeight: "100%",
                        borderRadius: 0
                    }}>
                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Text>
                                    <AntDesign name="arrowleft" color={"#0077b6"} size={34} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Text>
                                    <TouchableOpacity>
                                        <Entypo name="dots-three-vertical" size={26} color="#0077b6" />
                                    </TouchableOpacity>
                                </Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            alignItems: "center"
                        }}>
                            <Image
                                style={{
                                    width: 150,
                                    height: 150,
                                    objectFit: "contain",
                                    borderRadius: 15
                                }}
                                source={require("@/assets/images/profile1.png")}
                            />
                            <Text style={{
                                marginTop: 20,
                                fontSize: 30,
                                fontFamily: "syneSemiBold",
                                color: "#0077b6"
                            }}>{userData?.name}</Text>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: "barlowMid",
                                color: "#0077b6"
                            }}>{userData?.phone}</Text>

                            <View style={{
                                width: "100%",
                                marginTop: 30,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 50
                            }}>
                                <TouchableOpacity style={{
                                    alignItems: "center",
                                    paddingHorizontal: 25,
                                    paddingVertical: 5,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: "#0077b6"
                                }}>
                                    <Entypo name="phone" size={26} color="#0077b6" />
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 18,
                                        fontFamily: "syneSemiBold"
                                    }}>Audio</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    alignItems: "center",
                                    paddingHorizontal: 25,
                                    paddingVertical: 5,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: "#0077b6"
                                }}>
                                    <AntDesign name="search1" size={26} color="#0077b6" />
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 18,
                                        fontFamily: "syneSemiBold"
                                    }}>Search</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{
                            marginTop: 30,
                            width: "100%",
                            paddingVertical: 16,
                            paddingHorizontal: 25,
                            backgroundColor: "#F3F3F3",
                            borderRadius: 10
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: "syneSemiBold",
                            }}>{userData?.bio}</Text>
                        </View>
                    </View>

                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default ChatProfileModal;
