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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuthContext } from "../../contexts/AuthContext";

const ModalReportProblem = ({ modalVisible, setModalVisible, roomId }) => {
  const [images, setImages] = useState([]);
  const [issueDescription, setIssueDescription] = useState("");

  const { axiosInstanceWithAuth } = useAuthContext();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
  const handleReport = async () => {
    try {
      const formData = new FormData();
      formData.append("roomId", roomId);
      formData.append("issueDescription", issueDescription);
      images.forEach((image, index) => {
        formData.append(`images`, {
          uri: image.uri,
          name: `image_${index + 1}.jpg`,
          type: "image/jpeg",
        });
      });
      const response = await axiosInstanceWithAuth.post(
        `/rooms/v3/report`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        setImages([]);
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error reporting problem:", error);
    }
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <View>
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
              placeholderTextColor="#666"
              onChangeText={(text) => setIssueDescription(text)}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Cancel" onPress={handleCancel} color="#999999" />
              <Button title="Submit" onPress={handleReport} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
