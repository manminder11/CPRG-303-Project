import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const inputRef = useRef(null);

  const handlePlaceholderClick = () => {
    navigation.navigate("Search");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInputWrapper}>
        <TouchableOpacity
          style={styles.searchInput}
          onPress={handlePlaceholderClick}
        >
          <Text style={styles.placeholder}>Search...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInputWrapper: {
    width: "80%",
    position: "relative",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    width: "100%",
    justifyContent: "center",
  },
  placeholder: {
    color: "gray",
  },
});

export default Home;
