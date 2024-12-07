import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedSign, setSelectedSign] = useState(null);

  const parkingSigns = [
    {
      id: 1,
      source: require("./assets/signs/no-parking.png"),
      title: "No Parking - Tow Away Zone",
      explanation:
        "Vehicles parked in this area will be towed at the owner's expense.",
    },
    {
      id: 2,
      source: require("./assets/signs/lot-closed.png"),
      title: "Lot Closed",
      explanation:
        "This parking lot is temporarily closed due to construction work.",
    },
    {
      id: 3,
      source: require("./assets/signs/time-parking.png"),
      title: "2 Hour Parking (8:00-18:00)",
      explanation:
        "Parking is limited to 2 hours maximum between 8:00 AM and 6:00 PM.",
    },
    {
      id: 4,
      source: require("./assets/signs/handicapped.png"),
      title: "Handicapped Parking",
      explanation:
        "This space is reserved for vehicles displaying valid handicapped parking permits.",
    },
    {
      id: 5,
      source: require("./assets/signs/no-block.png"),
      title: "Do Not Block Gate",
      explanation:
        "Keep this area clear at all times for vehicles entering and exiting.",
    },
    {
      id: 6,
      source: require("./assets/signs/no-stopping.png"),
      title: "No Stopping",
      explanation: "No stopping is allowed in either direction.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>Home</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="menu" size={24} color="black" style={styles.menuIcon} />
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("Search")}
        >
          <TextInput
            style={styles.searchInput}
            placeholder="Where to ?"
            editable={false}
          />
          <Ionicons
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Signs Section */}
      <ScrollView style={styles.signsSection}>
        <Text style={styles.signsTitle}>Did you know these signs?</Text>
        <View style={styles.signsGrid}>
          {parkingSigns.map((sign) => (
            <TouchableOpacity
              key={sign.id}
              style={styles.signContainer}
              onPress={() => setSelectedSign(sign)}
            >
              <Image
                source={sign.source}
                style={styles.signImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Sign Explanation Modal */}
      <Modal
        visible={selectedSign !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedSign(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedSign(null)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setSelectedSign(null)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            {selectedSign && (
              <View style={styles.modalInner}>
                <Image
                  source={selectedSign.source}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
                <Text style={styles.modalTitle}>{selectedSign.title}</Text>
                <Text style={styles.modalExplanation}>
                  {selectedSign.explanation}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#007AFF" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="navigate" size={24} color="gray" />
          <Text style={styles.navText}>Navi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="gray" />
          <Text style={styles.navText}>Mine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  menuIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F0F7",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  signsSection: {
    flex: 1,
    padding: 15,
  },
  signsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  signsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  signContainer: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
  },
  signImage: {
    width: "100%",
    height: "100%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    maxHeight: "80%",
  },
  modalClose: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 1,
  },
  modalInner: {
    width: "100%",
    alignItems: "center",
  },
  modalImage: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalExplanation: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    color: "#333",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
    color: "gray",
  },
  activeNavText: {
    color: "#007AFF",
  },
});

export default HomeScreen;
