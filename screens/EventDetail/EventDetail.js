import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ModalBuyTicketEvent, ModalRegisterEvent } from "../../components";
import axios from "axios";

const EventDetail = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const route = useRoute();
  const [eventDetail, setEventDetail] = useState(null);
  const { eventId } = route.params;
  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axios(
        `http://192.168.1.4:3000/events/v9/detailevent/${eventId}`
      );
      setEventDetail(res.data);
    };
    fetchDetail();
  }, [eventId]);
  const handleRegistrationPress = () => {
    setRegisterModalVisible(true);
  };
  const handleBuyTicketPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Detail</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{eventDetail?.eventName}</Text>
          <Text style={styles.description}>
            {eventDetail?.eventDescription}
          </Text>
          <Text style={styles.date}>DateStart: {eventDetail?.eventDate}</Text>
          <Text style={styles.date}>DateEnd: {eventDetail?.eventExpiry}</Text>
          <Text style={styles.location}>
            Location: {eventDetail?.eventLocation}
          </Text>
          <View style={styles.additionalInfoContainer}>
            <MaterialCommunityIcons name="food" size={24} color="#FF6347" />
            <View style={{ flex: 1 }}>
              <Text style={styles.additionalInfoTitle}>Food Menu:</Text>
              <Text style={styles.additionalInfo}>{eventDetail?.foodMenu}</Text>
            </View>
          </View>
          <View style={styles.additionalInfoContainer}>
            <MaterialCommunityIcons name="cash" size={24} color="#32CD32" />
            <Text style={[styles.additionalInfo, styles.boldText]}>
              Payment per Student:
            </Text>
            <Text style={styles.additionalInfo}>
              {eventDetail?.paymentPerStudent}
            </Text>
          </View>
          <View style={styles.additionalInfoContainer}>
            <MaterialCommunityIcons name="ticket" size={24} color="#1E90FF" />
            <Text style={[styles.additionalInfo, styles.boldText]}>
              Ticket Price:
            </Text>
            <Text style={styles.additionalInfo}>
              {eventDetail?.ticketPrice}
            </Text>
          </View>
          <View style={styles.additionalInfoContainer}>
            <MaterialCommunityIcons name="calendar" size={24} color="#FFD700" />
            <View style={{ flex: 1 }}>
              <Text style={styles.additionalInfoTitle}>Events in Program:</Text>
              <Text style={styles.additionalInfo}>
                - {eventDetail?.eventsInProgram}
              </Text>
            </View>
          </View>
          {/* Button for registering */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegistrationPress}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          {/* Button for buying tickets */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#1E90FF" }]}
            onPress={handleBuyTicketPress}
          >
            <Text style={styles.buttonText}>Buy Ticket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Modal for buying tickets */}
      <ModalBuyTicketEvent
        modalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <ModalRegisterEvent
        modalVisible={isRegisterModalVisible}
        setModalVisible={setRegisterModalVisible}
      />
    </View>
  );
};

export default EventDetail;

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
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
  },
  additionalInfoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  additionalInfoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  additionalInfo: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 10,
    marginRight: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4e74f9",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
