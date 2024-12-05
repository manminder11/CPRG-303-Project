import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [endLocation, setEndLocation] = useState({
        latitude: 0,
        longitude: 0,
        address: "",
    });

    const handlePlaceholderClick = () => {
        navigation.navigate("Search", { endLocation });
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

export default HomeScreen;
