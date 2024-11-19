import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(['⏳ apple', '⏳ banana', '⏳ orange']);
  const navigation = useNavigation();

  const handleSearch = () => {
    if (query && !history.includes(`⏳ ${query}`)) {
      setHistory([`⏳ ${query}`, ...history]);
    }
    setShowHistory(false);
    navigation.navigate('Map'); // Navigate to the Map screen
  };

  const handleFocus = () => {
    setShowHistory(true);
  };

  const handleHistoryPress = (item) => {
    setQuery(item.replace('⏳ ', ''));
    setShowHistory(false);
    navigation.navigate('Map'); // Navigate to the Map screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your search query"
        value={query}
        onChangeText={setQuery}
        onFocus={handleFocus}
        onSubmitEditing={handleSearch} // Handle enter key press
      />
      {showHistory && (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleHistoryPress(item)}>
              <Text style={styles.historyItem}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.historyList}
        />
      )}
      <Button title="Search" onPress={handleSearch} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  historyList: {
    width: '80%',
    maxHeight: 100,
    marginBottom: 20,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default Search;
