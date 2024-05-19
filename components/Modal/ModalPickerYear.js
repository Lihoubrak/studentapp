import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ModalPickerYear = ({
  setShowPicker,
  showPicker,
  selectedYear,
  setSelectedYear,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPicker}
      onRequestClose={() => setShowPicker(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
            style={styles.picker}
          >
            <Picker.Item
              label={new Date().getFullYear().toString()}
              value={new Date().getFullYear().toString()}
            />
            <Picker.Item label="2022" value="2022" />
            <Picker.Item label="2023" value="2023" />
          </Picker>
          <Button
            title="Done"
            onPress={() => setShowPicker(false)}
            style={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalPickerYear;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: windowWidth * 0.05,
    backgroundColor: "white",
    borderRadius: 20,
    padding: windowWidth * 0.05,
    width: windowWidth * 0.9,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  picker: {
    width: "100%",
  },
  button: {
    marginTop: windowHeight * 0.02,
    backgroundColor: "#4e74f9",
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.05,
    borderRadius: 10, // Rounded corners
    width: "100%",
    alignItems: "center",
  },
});
