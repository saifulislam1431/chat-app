import { View, Text, StyleSheet } from 'react-native';
import ChatBubble from 'react-native-chat-bubble';

const ChatItem = ({ chat }) => {
    return (
        <View style={styles.chatContainer}>
            <ChatBubble
                isOwnMessage={true}
                bubbleColor="#0077b6"
                tailColor="#0077b6"
                withTail={true}
                style={[styles.bubbleContainer, { padding: 20 }]}
            >
                <Text style={styles.textOwn}>{chat.Response.Question}</Text>
            </ChatBubble>

            <ChatBubble
                isOwnMessage={false}
                bubbleColor="lightgrey"
                withTail={true}
                style={[styles.bubbleContainer, { padding: 20 }]}
            >
                <Text style={styles.text}>{chat.Response.Answer}</Text>
            </ChatBubble>
        </View>
    );
};
const styles = StyleSheet.create({
    chatContainer: {
        paddingHorizontal: 20,
    },
    bubbleContainer: {
        maxWidth: "90%",
        width: "100%",
    },
    chatText: {
        fontSize: 16,
        fontFamily: "syneSemiBold",
        color: "#fff"
    },
    text: {
        color: 'black',
        fontFamily: "barlowMid",
        fontSize: 17
    },
    textOwn: {
        color: 'white',
        fontFamily: "barlowMid",
        fontSize: 17
    },
});

export default ChatItem;