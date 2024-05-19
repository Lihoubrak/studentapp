import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Button,
  Dimensions,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ModalPickerMonth = ({
  setShowPicker,
  showPicker,
  selectedMonth,
  setSelectedMonth,
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
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="January" value="1" />
            <Picker.Item label="February" value="2" />
            <Picker.Item label="March" value="3" />
            <Picker.Item label="April" value="4" />
            <Picker.Item label="May" value="5" />
            <Picker.Item label="June" value="6" />
            <Picker.Item label="July" value="7" />
            <Picker.Item label="August" value="8" />
            <Picker.Item label="September" value="9" />
            <Picker.Item label="October" value="10" />
            <Picker.Item label="November" value="11" />
            <Picker.Item label="December" value="12" />
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

export default ModalPickerMonth;

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
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
});
