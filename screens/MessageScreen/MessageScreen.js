import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ModalAddMessage } from "../../components";

const MessageScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [chats, setChats] = useState([
    {
      id: "1",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Tocky Parker",
      lastMessage: "Okay fine",
    },
    {
      id: "2",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "John Doe",
      lastMessage: "How are you?",
    },
    {
      id: "3",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Jane Smith",
      lastMessage: "Let's catch up later.",
    },
    {
      id: "4",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Bob Johnson",
      lastMessage: "Sure thing!",
    },
    {
      id: "5",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Alice Brown",
      lastMessage: "See you soon!",
    },
    {
      id: "6",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Eva White",
      lastMessage: "What's up?",
    },
    {
      id: "7",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Michael Black",
      lastMessage: "Doing well, thanks!",
    },
    {
      id: "8",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Sophia Gray",
      lastMessage: "I'm busy right now.",
    },
    {
      id: "9",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "William Green",
      lastMessage: "Sure, let's talk later.",
    },
    {
      id: "10",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Olivia Red",
      lastMessage: "Good to hear!",
    },
  ]);
  const handleClickChat = (item) => {
    navigation.navigate("messagechat");
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleClickChat(item)}>
      <View style={styles.chatItem}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.chatContent}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <Text style={styles.time}>12:30 PM</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Message</Text>
      </View>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={styles.searchContainer}>
              <View style={styles.searchContent}>
                <MaterialIcons name="search" size={24} color="black" />
                <TextInput style={styles.textInput} placeholder="Search" />
              </View>
            </View>
          </>
        )}
        data={chats}
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
});
