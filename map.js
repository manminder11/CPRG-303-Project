import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Map = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fake Map</Text>
      <View style={styles.mapContainer}>
        <View style={styles.mapRow}>
          <View style={styles.mapCell} />
          <View style={styles.mapCell} />
          <View style={styles.mapCell} />
        </View>
        <View style={styles.mapRow}>
          <View style={styles.mapCell} />
          <View style={styles.mapCell} />
          <View style={styles.mapCell} />
        </View>
        <View style={styles.mapRow}>
          <View style={styles.mapCell} />
          <View style={styles.mapCell} />
          <View style={styles.mapCell} />
        </View>
      </View>
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
  mapContainer: {
    width: '80%',
    height: '60%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapRow: {
    flexDirection: 'row',
  },
  mapCell: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#b0b0b0',
  },
});

export default Map;