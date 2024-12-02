import * as React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";

const parkingLocations = [
  {
    name: "Downtown Parking Lot",
    address: "123 4th Ave SW, Calgary, AB",
    capacity: 150,
  },
  {
    name: "East Village Parking",
    address: "567 Riverfront Ave SE, Calgary, AB",
    capacity: 200,
  },
  {
    name: "Chinook Centre Parking",
    address: "6455 Macleod Trail SW, Calgary, AB",
    capacity: 500,
  },
  {
    name: "University District Parking",
    address: "2500 University Dr NW, Calgary, AB",
    capacity: 300,
  },
  {
    name: "Stampede Parkade",
    address: "1410 Olympic Way SE, Calgary, AB",
    capacity: 400,
  },
];

const ParkingScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={parkingLocations}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.address}</Text>
            <Text>Capacity: {item.capacity}</Text>
          </View>
        )}
      />
    </View>
  );
};

const CodeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.code}>{codeString}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  code: {
    fontFamily: "monospace",
    fontSize: 12,
  },
});

export default { ParkingScreen, CodeScreen };
