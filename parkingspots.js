import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const parkingLocations = {
  "Calgary Tower": ["Parking Lot A", "Parking Lot B", "Parking Lot C"],
  "Prince's Island Park": ["Parking Lot D", "Parking Lot E"],
  "Heritage Park": ["Parking Lot F", "Parking Lot G"],
  "Calgary Zoo": ["Parking Lot H", "Parking Lot I"],
  "Glenbow Museum": ["Parking Lot J", "Parking Lot K"],
  "Fish Creek Provincial Park": ["Parking Lot L", "Parking Lot M"],
  "Stephen Avenue Walk": ["Parking Lot N", "Parking Lot O"],
};

const ParkingSpots = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Parking Spots</Text>
      {Object.keys(parkingLocations).map((location, index) => (
        <View key={index}>
          <Text style={styles.locationText}>{location}</Text>
          {parkingLocations[location].map((spot, index) => (
            <Text key={index} style={styles.parkingText}>
              {spot}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  parkingText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default ParkingSpots;
