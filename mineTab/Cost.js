import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Cost = ({ duration, pricePerHour }) => {
    const totalCost = (duration * pricePerHour/60).toFixed(2); // 计算费用

    return (
        <View style={styles.costContainer}>
            <Text style={styles.cost}>${totalCost}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    //costContainer: { marginTop: 20 },
    cost: {
        fontSize: 24,
        color: "#4CAF50",
        fontWeight: "bold",
        paddingVertical: 5,
    },
});

export default Cost;
