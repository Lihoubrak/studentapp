import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  updateDoc,
} from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";

const MessageChat = () => {
  const navigation = useNavigation();
  const { db } = useFirebase();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [userReceiver, setUserReceiver] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { receiverId } = route.params;
  const { axiosInstanceWithAuth, userIdFromToken } = useAuthContext();

  useEffect(() => {
    const fetchUserReceiver = async () => {
      try {
        const response = await axiosInstanceWithAuth.get(
          `/messages/v16/receiver/${receiverId}`
        );
        setUserReceiver(response.data.receiver);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching receiver data:", error);
        setLoading(false);
      }
    };
    fetchUserReceiver();
    const unsubscribe = fetchMessagesAndReceiver();

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, [receiverId]);

  const fetchMessagesAndReceiver = () => {
    try {
      const messagesQuery = query(
        collection(db, "messages"),
        where("senderId", "in", [userIdFromToken, receiverId]),
        where("receiverId", "in", [userIdFromToken, receiverId]),
        orderBy("timestamp", "desc")
      );

      const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          if (
            data.senderId === receiverId &&
            data.receiverId === userIdFromToken &&
            !data.seenBy[userIdFromToken]
          ) {
            // Update the seenBy field if the message is sent by the other user and not seen by the current user
            updateDoc(doc.ref, {
              seenBy: {
                ...data.seenBy,
                [userIdFromToken]: true,
              },
            });
          }
          return {
            id: doc.id,
            ...data,
          };
        });
        setMessages(messages);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  const handleSend = async () => {
    if (content.trim()) {
      try {
        const response = await axiosInstanceWithAuth.post(
          `/messages/v16/create`, // Adjust the endpoint as needed
          {
            content: content.trim(),
            receiverId: receiverId,
          }
        );
        setContent("");
        // Fetch messages again to update the UI
        fetchMessagesAndReceiver();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const renderItemChat = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.timestamp}>
        {item.timestamp?.toDate().toLocaleDateString() ?? ""}
      </Text>
      {item.senderId !== userIdFromToken ? (
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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E74F9" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
            <Image
              source={{
                uri: userReceiver?.avatar.replace("localhost", "192.168.1.4"),
              }}
              style={styles.avatar}
            />
            <View style={styles.userInfoText}>
              <Text style={styles.username}>
                {userReceiver?.firstName} {userReceiver?.lastName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItemChat}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
        inverted
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={content}
            onChangeText={(text) => setContent(text)}
          />
        </View>
        <TouchableOpacity onPress={handleSend}>
          <MaterialIcons name="send" size={24} color="#4267B2" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  activeStatus: {
    alignItems: "center",
    color: "white",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
