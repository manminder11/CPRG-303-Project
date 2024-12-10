import React from "react";
import { Text, View, StyleSheet } from "react-native";
import NavigationScreen from "./NavigationMap";

export default function NavigationPage({ route, navigation }) {
    const { endLocation } = route.params || {};

    if (!endLocation) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.errorText}>
                    Error: endLocation is not provided.
                </Text>
            </View>
        );
    }

    return (
        <NavigationScreen endLocation={endLocation} navigation={navigation} />
    );
}

const styles = StyleSheet.create({
    // 居中容器样式
    centeredContainer: {
        flex: 1, // 使容器占据整个屏幕高度
        justifyContent: "center", // 垂直居中
        alignItems: "center", // 水平居中
    },
    // 设置文本样式
    errorText: {
        fontSize: 16,
        color: "red",
    },
});
