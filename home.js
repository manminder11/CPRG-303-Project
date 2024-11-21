import React, { useEffect } from 'react';
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  useEffect(() => {
    // Any side effects can be handled here
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Home Page</Text>
      <TouchableOpacity style={styles.input} onPress={() => navigation.navigate('Search')}>
        <Text style={styles.placeholder}>Type where</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    justifyContent: 'center',
  },
  placeholder: {
    color: 'gray',
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
