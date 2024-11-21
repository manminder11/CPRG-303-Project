import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ParkingSpots = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Spots</Text>
      {/* Add your content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ParkingSpots;