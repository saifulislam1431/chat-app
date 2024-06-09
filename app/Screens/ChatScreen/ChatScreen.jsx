import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ChatItem from "@/components/ChatItem";
import chatsData from "@/assets/jsons/ChatJson.json"
import Icon from "react-native-vector-icons/FontAwesome"
import Icon2 from "react-native-vector-icons/AntDesign"
import Icon3 from "react-native-vector-icons/Entypo"
import ChatProfileModal from "../../../components/Modals/ChatProfileModal"

const ChatScreen = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMoreChats, setHasMoreChats] = useState(true);
    const [inputHeight, setInputHeight] = useState(45);
    const [promptText, setPromptText] = useState("");
    const [profileModal, setProfileModal] = useState(false);
    const [userData, setUserData] = useState({
        name: "Saiful Islam",
        image: "../../../assets/images/profile1.png",
        phone: "+88012345679",
        bio: "Hey there! I am using Chat Zone."
    })

    useEffect(() => {
        loadChats();
    }, []);

    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator size="large" style={{ marginTop: 10 }} />;
    };

    const loadChats = () => {
        if (loading || !hasMoreChats) return;

        setLoading(true);
        // Simulate fetching chats in pages of 15
        const newChats = chatsData.slice((page - 1) * 10, page * 10);

        if (newChats.length === 0) {
            setHasMoreChats(false);
        } else {
            setChats(prevChats => [...newChats, ...prevChats]);
        }

        setLoading(false);
    };

    const handleLoadMore = () => {
        if (hasMoreChats) {
            setPage(prevPage => prevPage + 1);
            loadChats();
        }
    };


    return (
        // <ScrollView style={styles.container} contentContainerStyle={{
        //     alignItems: "center",
        //     justifyContent: "flex-start"
        // }}>
        //     <Text>Chat Screen</Text>
        // </ScrollView>

        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-between",
                rowGap: 10,
                paddingHorizontal: 10,
                height: 60,
                backgroundColor: "#F4F3F8"
            }}>

                <TouchableOpacity>
                    <Icon2 name="arrowleft" size={26} color="#0077b6" />
                </TouchableOpacity>


                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    {/* Profile */}
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        rowGap: 10,
                        width: "70%"
                    }}>
                        <TouchableOpacity onPress={() => setProfileModal(true)}>
                            <Image
                                style={{
                                    width: 60,
                                    height: 44,
                                    objectFit: "contain",
                                }}
                                source={require("../../../assets/images/profile1.png")}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={{
                                fontSize: 17,
                                fontFamily: "syneSemiBold",
                                color: "#0077b6"
                            }}>Saiful Islam</Text>

                            <Text style={{
                                fontSize: 16,
                                fontFamily: "syne"
                            }}>Online</Text>
                        </View>
                        <ChatProfileModal visible={profileModal} setVisible={setProfileModal} userData={userData} />
                    </View>

                    <View style={{
                        width: "23%",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10
                    }}>

                        <TouchableOpacity>
                            <Icon name="phone" size={26} color="#0077b6" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Icon3 name="dots-three-vertical" size={26} color="#0077b6" />
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            <View style={{ flex: 1 }}>
                {loading && <ActivityIndicator size="large" style={styles.loader} />}
                <FlatList
                    data={chats}
                    inverted
                    keyExtractor={(item, index) => `${item._id}_${index}`} // Combine _id with index
                    renderItem={({ item }) => <ChatItem chat={item} />}
                    ListFooterComponent={renderFooter}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    rowGap: 10,
                    paddingHorizontal: 10,
                    height: inputHeight + 25,
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: "#ECECEC",
                        borderColor: "#D6D6D6",
                        borderWidth: 2,
                        borderRadius: 25,
                        borderStyle: "solid",
                        width: "85%",
                        height: inputHeight,
                        paddingHorizontal: 15,
                        shadowColor: "#8D8D8D",
                        shadowOffset: { width: 3.77, height: 3.77 },
                        shadowOpacity: 0.25,
                        shadowRadius: 7.53,
                        elevation: 4,
                    }}
                    autoCapitalize="none"
                    placeholder={`Type a message...`}
                    onFocus={() => setInputHeight(65)}
                    onBlur={() => setInputHeight(45)}
                    onChangeText={(text) => setPromptText(text)}
                />

                <TouchableOpacity style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0077b6",
                    width: 45,
                    height: 45,
                    borderRadius: 50
                }}>
                    <Icon name="send" color={"#ffffff"} size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
})

export default ChatScreen;
