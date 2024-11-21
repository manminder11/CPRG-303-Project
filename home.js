import React, { useEffect } from 'react';
import { Text, Button, StyleSheet, Image, ScrollView } from 'react-native';

const Home = ({ navigation }) => {
  const handleSearch = () => {
    navigation.navigate('Search');
  };

  useEffect(() => {
    // This code is for React Native
  }, []);

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Home Page</Text>
      <Button title="Search" onPress={handleSearch} />
      <Image source={require('./assets/3rd.jpg')} style={styles.image} />
      <Image source={require('./assets/4th.jpg')} style={styles.image} />
      <Image source={require('./assets/5th.jpg')} style={styles.image} />
      <Image source={require('./assets/6th.jpg')} style={styles.image} />
      <Image source={require('./assets/sec.jpg')} style={styles.image} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default Home;
