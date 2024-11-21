import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    setQuery(""); // Clear the input field
    navigation.navigate("Map"); // Navigate to the Map screen
  };

  const handleFocus = () => {
    // No need to set show history state here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Type where"
        value={query}
        onChangeText={setQuery}
        onFocus={handleFocus}
        onSubmitEditing={handleSearch} // Handle enter key press
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "80%",
  },
});

export default Search;
const fakeHistory = [
  "Calgary Tower",
  "Prince's Island Park",
  "Calgary Zoo",
  "Heritage Park",
  "Glenbow Museum",
  "Fish Creek Provincial Park",
  "Spruce Meadows",
  "The Military Museums",
  "Fort Calgary",
  "Nose Hill Park",
];