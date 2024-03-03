import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons
import { useNavigation } from "@react-navigation/native";

const MessageChat = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const messageData = [
    { type: "system", text: "Hi, how are you today?", timestamp: "21:32" },
    { type: "user", text: "Hi", timestamp: "21:32" },
    // Add more messages as needed
  ];
  const handleSend = () => {
    console.log("Message sent:", message);
    setMessage("");
  };
  const renderItemChat = ({ item, index }) => (
    <View>
      <View style={styles.chatMessages}>
        <View style={styles.messageContainer}>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
          {item.type === "system" ? (
            <View style={styles.systemMessage}>
              <Text style={styles.systemMessageText}>{item.text}</Text>
            </View>
          ) : (
            <View
              style={
                item.type === "user" ? styles.userMessage : styles.otherMessage
              }
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("detail")}>
          <View style={styles.userInfo}>
            <Image
              source={require("../../assets/icons/profile.jpg")}
              style={styles.avatar}
            />
            <View style={styles.userInfoText}>
              <Text style={styles.username}>John Doe</Text>
              <Text style={styles.activeStatus}>Active 21 minutes ago</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={messageData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemChat}
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
            value={message}
            onChangeText={(text) => setMessage(text)}
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
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: 12,
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
