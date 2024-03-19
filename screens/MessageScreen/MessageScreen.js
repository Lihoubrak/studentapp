import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ModalAddMessage } from "../../components";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { useSocketContext } from "../../contexts/SocketContext";
import { fetchUserToken } from "../../utils";
const MessageScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { auth } = useAuthContext();
  const [refreshing, setRefreshing] = useState(false);
  const { onlineUsers } = useSocketContext();
  const fetchChats = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.4:3000/messages/v16/users-with-conversations`,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );
      setChats(res.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  const handleClickChat = (item) => {
    navigation.navigate("messagechat", { receiverId: item.id });
  };
  const filterChats = chats.filter(
    (students) =>
      students.firstName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      students.lastName?.toLowerCase().includes(searchQuery?.toLowerCase())
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchChats();
    setRefreshing(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchChats();
    }, [])
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleClickChat(item)}>
      <View style={styles.chatItem}>
        {onlineUsers && onlineUsers.some((user) => user.userId === item.id) && (
          <MaterialIcons
            name={"fiber-manual-record"}
            size={15}
            color={"#4CAF50"}
            style={{ position: "absolute", top: 15, left: 55, zIndex: 10 }}
          />
        )}
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.chatContent}>
          <Text style={styles.username}>
            {item.firstName} {item.lastName}
          </Text>
          <Text
            style={[
              styles.lastMessage,
              // item.status === "pending" && styles.lastMessageNotSeen,
            ]}
          >
            {item.lastMessage}
          </Text>
        </View>
        <Text
          style={[
            styles.time,
            // item.status === "pending" && styles.lastMessageNotSeen,
          ]}
        >
          {new Date(item.sendDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        data={filterChats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
      <ModalAddMessage
        modalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        auth={auth}
      />
    </View>
  );
};

export default MessageScreen;

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
    fontSize: 16,
    fontWeight: "bold",
  },
});
