import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import {
    Alert,
    Button,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Linking,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_API_KEY } from "@env";

// 初始化 Geocoder
Geocoder.init(GOOGLE_MAPS_API_KEY);

const { height } = Dimensions.get("window");

export default function NavigationMap({ endLocation, navigation }) {
    const [startLocation, setStartLocation] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState("");

    // 请求位置权限并实时更新位置
    useEffect(() => {
        const requestLocationPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permission denied",
                    "Enable location permissions to continue"
                );
                return;
            }

            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 5,
                },
                (location) => {
                    setStartLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });
                }
            );

            return () => subscription && subscription.remove();
        };

        requestLocationPermission();
    }, []);

    // 更新路径
    useEffect(() => {
        if (startLocation && endLocation) {
            fetchRoute();
        }
    }, [startLocation, endLocation]);

    const fetchRoute = async () => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation.latitude},${startLocation.longitude}&destination=${endLocation.latitude},${endLocation.longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );

            const data = await response.json();
            if (data.routes?.length) {
                const points = decodePolyline(
                    data.routes[0].overview_polyline.points
                );
                setRouteCoordinates(points);

                const route = data.routes[0].legs[0];
                setDistance(route.distance.text);
                setDuration(route.duration.text);
            }
        } catch (error) {
            console.error("Error fetching route:", error);
        }
    };

    const decodePolyline = (encoded) => {
        let points = [];
        let index = 0,
            len = encoded.length;
        let lat = 0,
            lng = 0;

        while (index < len) {
            let b,
                shift = 0,
                result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            let dlat = result & 1 ? ~(result >> 1) : result >> 1;
            lat += dlat;

            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            let dlng = result & 1 ? ~(result >> 1) : result >> 1;
            lng += dlng;

            points.push({
                latitude: lat / 1e5,
                longitude: lng / 1e5,
            });
        }
        return points;
    };

    const handleExit = () => {
        Alert.alert(
            "Do you want to park here?",
            "",
            [
                { text: "No", style: "cancel" },
                { text: "Yes", onPress: () => setModalVisible(true) },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            {startLocation ? (
                <>
                    {/* 地图显示 */}
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: startLocation.latitude,
                            longitude: startLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={startLocation}
                            title="Start Location"
                            pinColor="green"
                        />
                        <Marker
                            coordinate={endLocation}
                            title="End Location"
                            pinColor="red"
                        />
                        <Polyline
                            coordinates={routeCoordinates}
                            strokeWidth={4}
                            strokeColor="blue"
                        />
                    </MapView>

                    {/* 显示终点地址框 */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inlineInput}>
                            <Text style={styles.input}>
                                {endLocation.address}
                            </Text>
                        </View>
                    </View>

                    {/* 底部操作区域 */}
                    <View style={styles.bottomView}>
                        <View style={styles.inlineContainer}>
                            <Text style={styles.text}>
                                You'll drive {distance || "loading..."} in about{" "}
                                {duration || "loading..."}
                            </Text>
                            <TouchableOpacity
                                style={styles.inlineButton}
                                onPress={handleExit}
                            >
                                <Text style={styles.inlineButtonText}>
                                    Park Here
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            ) : (
                <Text>Loading...</Text>
            )}

            {/* 弹窗 */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text>
                            What is the hourly price for this parking lot?
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type here your unit price"
                            value={inputText}
                            keyboardType="numeric"
                            onChangeText={setInputText}
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                title="Cancel"
                                onPress={() => setModalVisible(false)}
                            />
                            <Button
                                title="OK"
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    inputContainer: {
        position: "absolute",
        top: height * 0.07,
        width: "80%",
        alignSelf: "center",
        backgroundColor: "rgba(245, 245, 220, 0.8)",
        padding: 10,
        borderRadius: 10,
    },
    input: { fontSize: 16, textAlign: "center" },
    bottomView: {
        position: "absolute",
        bottom: height * 0.04,
        width: "80%",
        alignSelf: "center",
        backgroundColor: "rgba(245, 245, 220, 0.8)",
        //padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    inlineContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // 使文本和按钮左右分布
        width: "100%",
    },
    inlineButton: {
        backgroundColor: "red",
        paddingHorizontal: 10,
        //paddingVertical: 5 ,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        height: "100%",
        justifyContent: "center",
    },
    inlineButtonText: {
        fontSize: 19,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    text: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#333",
        //backgroundColor: "rgba(245, 245, 220, 0.8)",
        flex: 1, // 占据剩余空间
        padding: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },

    navButton: {
        backgroundColor: "red",
        padding: 10,
        marginRight: 20,
        borderRadius: 5,
        alignSelf: "center",
    },
    navButtonText: { color: "white", textAlign: "center" },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
});
