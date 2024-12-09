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
import { GOOGLE_MAPS_API_KEY } from "@env";

//dotenv.config();

// 获取环境变量
//const API_KEY = Constants.manifest.extra.GOOGLE_MAPS_API_KEY;

//const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigation = useNavigation();

    const fetchNearbyParking = async (query) => {
        if (!query) {
            setResults([]);
            return;
        }
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
                    "parking near" + query
                }&region=ca&type=parking&key=${GOOGLE_MAPS_API_KEY}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setResults(data.results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleSearch = () => {
        fetchNearbyParking(searchQuery);
    };

    const handleResultClick = (item) => {
        const endLocation = {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
            address: item.formatted_address,
        };
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: "Main",
                    state: {
                        routes: [{ name: "Navi", params: { endLocation } }],
                    },
                },
            ],
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for nearby parking locations..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>

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

export default SearchScreen;
