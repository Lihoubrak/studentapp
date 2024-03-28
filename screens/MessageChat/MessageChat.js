import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSocketContext } from "../../contexts/SocketContext";
import { formatDateTime } from "../../utils";
import { useMessageContext } from "../../contexts/MessageContext";
const MessageChat = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [userReceiver, setUserReceiver] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { receiverId } = route.params;
  const { auth } = useAuthContext();
  const { onlineUsers, socket } = useSocketContext();
  const flatListRef = useRef(null);
  const { setMessageCount } = useMessageContext();
  console.log("MessageChat");
  useEffect(() => {
    setMessageCount(
      messages.filter((message) => !message.seen_by_user2).length
    );
  }, [messages]);
  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };
  useEffect(() => {
    console.log("fetchUserReceiver");
    const fetchUserReceiver = async () => {
      try {
        const resReceiver = await axios.get(
          `http://192.168.1.4:3000/users/v1/${receiverId}/detail`
        );
        setUserReceiver(resReceiver.data);
      } catch (error) {
        console.error("Error fetching user receiver:", error);
      }
    };

    fetchUserReceiver();
  }, []);
  useEffect(() => {
    console.log("fetchMessage");
    const fetchMessage = async () => {
      try {
        const res = await axios.get(
          `http://192.168.1.4:3000/messages/v16/all/${receiverId}`,
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        );
        socket?.on("newMessage", handleNewMessage);
        setMessages(res.data);
        setLoading(false);

        // Extract messageId from each message
        const messageIds = res.data.map((message) => message.id);
        // Update seen status for each message
        messageIds.forEach(async (messageId) => {
          await axios.put(
            `http://192.168.1.4:3000/messages/v16/update-status-seen/${messageId}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessage();
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [receiverId, auth]);

  const handleSend = async () => {
    if (content) {
      try {
        const response = await axios.post(
          `http://192.168.1.4:3000/messages/v16/create`,
          {
            content,
            receiverId: receiverId,
          },
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        );
        setMessages([...messages, response.data]);
        setContent("");
        flatListRef.current.scrollToEnd({ animated: true });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  const renderItemChat = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.timestamp}>{formatDateTime(item.createdAt)}</Text>
      {item.receiver_id !== receiverId ? (
        <View style={styles.systemMessage}>
          <Text style={styles.systemMessageText}>{item.content}</Text>
        </View>
      ) : (
        <View style={styles.userMessage}>
          <Text style={styles.messageText}>{item.content}</Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("detail", { userId: receiverId })}
        >
          <View style={styles.userInfo}>
            {onlineUsers.some((user) => user.userId === receiverId) ? (
              <MaterialIcons
                name={"fiber-manual-record"}
                size={15}
                color={"#4CAF50"}
                style={{ position: "absolute", top: 25, left: 25, zIndex: 10 }}
              />
            ) : null}

            <Image
              source={{ uri: userReceiver?.avatar }}
              style={styles.avatar}
            />
            <View style={styles.userInfoText}>
              <Text style={styles.username}>
                {userReceiver?.firstName} {userReceiver?.lastName}
              </Text>
              <Text style={styles.activeStatus}>
                {onlineUsers &&
                onlineUsers.some((user) => user.userId === receiverId)
                  ? "Online"
                  : `Offline `}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item, index) => index.toString()} // Convert index to string
        renderItem={renderItemChat}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        } // Scroll to end on content size change
      />
      <View style={styles.inputContainer}>
        <View style={styles.actionIcons}>
          <TouchableOpacity>
            <MaterialIcons name="camera-alt" size={24} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="image" size={24} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="keyboard-voice" size={24} color="#4267B2" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={content}
            onChangeText={(text) => setContent(text)}
          />
          <TouchableOpacity>
            <MaterialIcons name="insert-emoticon" size={24} color="#4267B2" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSend}>
          <MaterialIcons name="send" size={24} color="#4267B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    backgroundColor: "#4e74f9",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfoText: {},
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  activeStatus: { alignItems: "center", color: "white" },
  callIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  chatMessages: {
    flex: 1,
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingHorizontal: 12,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  messageContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  timestamp: {
    textAlign: "center",
    marginBottom: 5,
    color: "#888888",
    fontSize: 12,
  },
  systemMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5E5",
    padding: 8,
    borderRadius: 10,
  },
  systemMessageText: {
    color: "#000",
    fontSize: 16,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4267B2",
    padding: 8,
    borderRadius: 10,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
});
