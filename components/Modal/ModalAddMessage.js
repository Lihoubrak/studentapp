import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  TextInput,
} from "react-native";

const ModalAddMessage = ({ modalVisible, setModalVisible }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [chats, setChats] = useState([
    {
      id: "1",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Tocky Parker",
    },
    {
      id: "2",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "John Doe",
    },
    {
      id: "3",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Jane Smith",
    },
    {
      id: "4",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Bob Johnson",
    },
    {
      id: "5",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Alice Brown",
    },
    {
      id: "6",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Eva White",
    },
    {
      id: "7",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Michael Black",
    },
    {
      id: "8",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Sophia Gray",
    },
    {
      id: "9",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "William Green",
    },
    {
      id: "10",
      avatar: require("../../assets/icons/profile.jpg"),
      username: "Olivia Red",
    },
  ]);

  const filteredChats = chats.filter((chat) =>
    chat.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClickChat = (item) => {
    setModalVisible(false);
    navigation.navigate("messagechat");
  };

  const handleCancel = () => {
    setModalVisible(false);
    searchQuery("");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleClickChat(item)}>
      <View style={styles.chatItem}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.chatContent}>
          <Text style={styles.username}>{item.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Message</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <FlatList
            data={filteredChats}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    elevation: 5,
    width: windowWidth,
    height: windowHeight * 0.8,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#999999",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default ModalAddMessage;
