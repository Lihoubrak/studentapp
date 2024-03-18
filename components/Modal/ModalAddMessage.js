import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { useSocketContext } from "../../contexts/SocketContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const ModalAddMessage = ({ modalVisible, setModalVisible, auth }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const { onlineUsers } = useSocketContext();
  const fetchAllStudent = async () => {
    const res = await axios.get(`http://192.168.1.4:3000/users/v1/alluser`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
    setStudents(res.data);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchAllStudent();
    }, [])
  );
  const filterStudent = students.filter(
    (students) =>
      students.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      students.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleClickChat = (item) => {
    setModalVisible(false);
    navigation.navigate("messagechat", { receiverId: item.id });
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSearchQuery("");
  };
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
            data={filterStudent}
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
