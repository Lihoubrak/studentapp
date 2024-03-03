import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ModalReportProblem = ({ modalVisible, setModalVisible }) => {
  const [images, setImages] = useState([]);

  // Function to handle image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  // Function to handle cancel button click
  const handleCancel = () => {
    // Clear the images array
    setImages([]);
    // Close the modal
    setModalVisible(false);
  };

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item.uri }} style={styles.image} />
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
          <Text style={styles.modalText}>Report a Problem</Text>
          <FlatList
            data={images}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginBottom: 20 }}
            horizontal
          />
          <TouchableOpacity onPress={pickImage}>
            <Text style={{ color: "blue", marginBottom: 20 }}>
              Choose Image
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter your problem"
            placeholderTextColor="#999999"
          />
          <View style={styles.modalButtonContainer}>
            <Button title="Cancel" onPress={handleCancel} color="#999999" />
            <Button title="Submit" onPress={() => {}} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const windowWidth = Dimensions.get("window").width;

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
    padding: 35,
    alignItems: "center",
    elevation: 5,
    width: windowWidth * 0.8,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default ModalReportProblem;
