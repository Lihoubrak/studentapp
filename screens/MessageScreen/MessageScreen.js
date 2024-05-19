import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { ModalAddMessage } from "../../components";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";

const MessageScreen = () => {
  const navigation = useNavigation();
  const { userIdFromToken } = useAuthContext();
  const [isModalVisible, setModalVisible] = useState(false);
  const { db } = useFirebase();
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const handleClickChat = (item) => {
    navigation.navigate("messagechat", { receiverId: item.userId });
  };
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const sentMessagesQuery = query(
          collection(db, "messages"),
          where("senderId", "==", userIdFromToken),
          orderBy("timestamp", "desc")
        );
        const receivedMessagesQuery = query(
          collection(db, "messages"),
          where("receiverId", "==", userIdFromToken),
          orderBy("timestamp", "desc")
        );

        const [sentMessagesSnapshot, receivedMessagesSnapshot] =
          await Promise.all([
            getDocs(sentMessagesQuery),
            getDocs(receivedMessagesQuery),
          ]);

        const lastMessages = {};

        sentMessagesSnapshot.forEach((doc) => {
          const message = doc.data();
          const receiverId = message.receiverId;

          if (
            !lastMessages[receiverId] ||
            message.timestamp > lastMessages[receiverId].timestamp
          ) {
            lastMessages[receiverId] = message;
          }
        });

        receivedMessagesSnapshot.forEach((doc) => {
          const message = doc.data();
          const senderId = message.senderId;

          if (
            !lastMessages[senderId] ||
            message.timestamp > lastMessages[senderId].timestamp
          ) {
            lastMessages[senderId] = message;
          }
        });

        const chatDetails = await Promise.all(
          Object.keys(lastMessages).map(async (userId) => {
            const userDoc = await getDoc(doc(db, "users", userId));
            const userData = userDoc.data();

            const {
              MajorId,
              RoleId,
              RoomId,
              password,
              expo_push_token,
              ...filteredUserData
            } = userData;

            return {
              userId,
              user: filteredUserData,
              lastMessage: lastMessages[userId],
            };
          })
        );

        setChats(chatDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();

    // Set up real-time listener for new messages
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      fetchChats(); // Update the chat list whenever a new message arrives
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const renderItem = ({ item }) => {
    const { user, lastMessage } = item;
    const isSender = lastMessage.senderId === userIdFromToken;
    const hasSeenMessage = isSender
      ? true
      : lastMessage.seenBy[userIdFromToken];

    return (
      <TouchableOpacity onPress={() => handleClickChat(item)}>
        <View style={styles.chatItem}>
          <Image
            source={{ uri: user.avatar?.replace("localhost", "192.168.1.4") }}
            style={styles.avatar}
          />
          <View style={styles.chatContent}>
            <Text style={styles.username}>
              {user.firstName} {user.lastName}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  styles.lastMessage,
                  !hasSeenMessage && styles.lastMessageNotSeen,
                ]}
              >
                {lastMessage.content}
              </Text>
              <Text
                style={[
                  styles.time,
                  !hasSeenMessage && styles.lastMessageNotSeen,
                ]}
              >
                {lastMessage.timestamp.toDate().toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Message</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchContent}>
          <MaterialIcons name="search" size={24} color="black" />
          <TextInput
            style={styles.textInput}
            placeholder="Search"
            placeholderTextColor={"#666"}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={chats.filter(
            (chat) =>
              chat.user.firstName
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              chat.user.lastName
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.userId}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
      <ModalAddMessage
        modalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

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
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  searchContent: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    color: "#333",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    position: "relative",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatContent: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666666",
  },
  time: {
    fontSize: 12,
    color: "#999999",
    marginLeft: 8,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4e74f9",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  lastMessageNotSeen: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageScreen;
