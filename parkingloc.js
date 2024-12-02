import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const GOOGLE_PLACES_API_KEY = "AIzaSyAg6LTheTgM_iKgThyl1ABUknKgCHYIO-8";

const ParkingLocations = () => {
  const [parkingLocations, setParkingLocations] = useState([]);

  const fetchParkingLocations = async () => {
    const latitude = "37.7749"; // Example latitude
    const longitude = "-122.4194"; // Example longitude (San Francisco)
    const radius = 1000; // 1 km search radius

    const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=parking&key=${GOOGLE_PLACES_API_KEY}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.status === "OK") {
        setParkingLocations(data.results); // Update state with parking locations
      } else {
        console.error("Google Places API Error:", data.status);
      }
    } catch (error) {
      console.error("Error fetching parking locations:", error);
    }
  };

  useEffect(() => {
    fetchParkingLocations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Locations</Text>
      <FlatList
        data={parkingLocations}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text>{item.vicinity}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  locationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  locationName: { fontWeight: "bold" },
});

export default ParkingLocations;
