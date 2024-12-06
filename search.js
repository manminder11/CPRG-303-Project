import React, { useState } from "react";
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState(""); // Store the input
    const [results, setResults] = useState([]); // Store the fetched results
    const navigation = useNavigation();

    // Fetch data from the API when the user types
    const fetchSearchResults = async (query) => {
        if (!query) {
            setResults([]); // Clear results if the input is empty
            return;
        }
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&type=parking&key=AIzaSyDKswxdCGdjJM8S3d-JlHoR36aw5QhBgj4`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setResults(data.results); // Update state with the fetched results
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleSearch = () => {
        fetchSearchResults(searchQuery);
    };

    const handleResultClick = (item) => {
        navigation.navigate("Parking", { place: item });
    };

    return (
        <View style={styles.container}>
            {/* Search bar */}
            <TextInput
                style={styles.input}
                placeholder="Search for parking locations..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Search button */}
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>

            {/* Display results */}
            <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.resultItem}
                        onPress={() => handleResultClick(item)}
                    >
                        <Text>{item.name}</Text>
                        <Text style={styles.endpoint}>
                            {item.formatted_address}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    endpoint: { fontSize: 12, color: "gray" },
});

export default SearchComponent;
