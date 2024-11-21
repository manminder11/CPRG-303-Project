import React, { useEffect } from 'react';
import { Text, Button, StyleSheet, Image, ScrollView, View } from 'react-native';

const Home = ({ navigation }) => {
  const handleSearch = () => {
    navigation.navigate('Search');
  };

  useEffect(() => {
  
  }, []);

  const images = [
    require('./assets/3rd.jpg'),
    require('./assets/4th.jpg'),
    require('./assets/5th.jpg'),
    require('./assets/6th.jpg'),
    require('./assets/sec.jpg'),
    require('./assets/image.jpg'),
  ];

  const renderImagePairs = () => {
    const pairs = [];
    for (let i = 0; i < images.length; i += 2) {
      pairs.push(
        <View style={styles.imageRow} key={i}>
          <Image source={images[i]} style={styles.image} />
          {images[i + 1] && <Image source={images[i + 1]} style={styles.image} />}
        </View>
      );
    }
    return pairs;
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Home Page</Text>
      <Button title="Search" onPress={handleSearch} />
      {renderImagePairs()}
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
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginHorizontal: 5,
  },
});

export default Home;
