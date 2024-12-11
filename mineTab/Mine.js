import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useState } from "react";
import {
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Timer from "./Timer";
import Cost from "./Cost";



export default function MinePage({ route }) {
    const [duringParking, setDuringParking] = useState(false);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const navigation = useNavigation();
    const [duration, setDuration] = useState(0);
    const { data } = route.params || {};
    
    


    useEffect(() => {
        if (data && data.duringParking !== undefined) {
            setDuringParking(data.duringParking); // 根据传递过来的数据设置状态
        }
    }, [data]);


    const handleNavigate = () => {
        // Navigate to the Navigation page

        const endLocation = {
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.location,
            searchingParking: false,
        };


        navigation.navigate("Main", {
            screen: "Navi",
            params: { endLocation },
        });

    };

    const handleStop = () => {
        Alert.alert(
            "Have you left this parking spot?",
            "",
            [
                {
                    text: "No",
                    onPress: () => {
                        // If No, stay on the current page (MinePage)
                    },
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        let cost = ((duration * data.price) / 60).toFixed(2);
                        // If Yes, show the cost and then move to the home page
                        Alert.alert(
                            `Duration:\n${duration} mins\nCost:\n$ ${cost}`,
                            "",
                            [
                                {
                                    text: "Got it !",
                                    onPress: () => {
                                        setDuration(0); // Reset duration
                                        // If No, stay on the current page (MinePage)
                                        setDuringParking(false); // Update the duringParking state
                                        navigation.navigate("Home");
                                    },
                                    style: "cancel",
                                },
                            ],
                            { cancelable: false }
                        );
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ImageBackground
            source = {require ("../assets/background3.jpg")}// Replace with your image path
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.stack}>
                    <View style={styles.parkContainer}>
                        <Text style={styles.header}>Current Parking:</Text>
                        {duringParking ? (
                            <TouchableOpacity
                                onPress={handleNavigate}
                                style={styles.row}
                            >
                                <Text style={styles.address}>
                                    {data.location}
                                </Text>
                                <Ionicons
                                    name="arrow-forward-circle"
                                    size={30}
                                    color="#007BFF"
                                />
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.address}>
                                Your vehicle is not parked now!
                            </Text>
                        )}
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={styles.halfContainer}>
                            <Text style={styles.header}>Duration:</Text>
                            {duringParking ? (
                                <Timer
                                    starttime={data.time}
                                    onDurationUpdate={(newDuration) => {
                                        setDuration(newDuration); // Update the duration state
                                    }}
                                />
                            ) : (
                                <Text style={styles.timer}>00:00:00</Text>
                            )}
                        </View>
                        <View style={styles.halfContainer}>
                            <Text style={styles.header}>Cost:</Text>
                            {duringParking ? (
                                <Cost
                                    duration={duration}
                                    pricePerHour={data.price}
                                    style={styles.cost}
                                />
                            ) : (
                                <Text style={styles.cost}>$0.00</Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                !duringParking && styles.buttonDisabled, // 动态应用禁用样式
                            ]}
                            onPress={handleStop}
                            disabled={!duringParking} // 禁用按钮
                        >
                            <Text style={styles.buttonText}>Stop</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        //alignItems: "center",
        width: "100%",
        height: "100%", // 确保背景填满
    },
    address: {
        width: "90%",
    },
    stack: {
        width: "100%", // Ensure the stack takes full width
        alignItems: "center", // Center all items horizontally
    },
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        alignItems: "center", // 水平方向居中
        justifyContent: "flex-start", // 垂直方向对齐到顶部
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    timer: {
        fontSize: 25,
        fontWeight: "600", // 比 bold 稍轻，更现代的视觉效果
        color: "#2C3E50", // 深蓝灰色，柔和而清晰
        letterSpacing: 1.3, // 增加字母间距，使数字更易读
        textAlign: "center", // 居中对齐
        backgroundColor: "#EFEFEF", // 添加淡灰背景，区分时间显示区域
        paddingVertical: 5, // 垂直填充，使文本更舒适
        paddingHorizontal: 10, // 水平填充
        borderRadius: 10, // 圆角边框，柔化整体视觉效果
        overflow: "hidden", // 防止背景扩展超出
        shadowColor: "#000", // 添加阴影，立体感
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    cost: {
        fontSize: 24,
        color: "#4CAF50",
        fontWeight: "bold",
        paddingVertical: 5,
    },
    row: { flexDirection: "row", alignItems: "center", marginTop: 5 },
    parkContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        marginBottom: 100,
        width: "100%",
        // alignItems: "center",
    },

    rowContainer: {
        flexDirection: "row", // Arrange items in a row (side by side)
        width: "100%", // Full width container
        justifyContent: "space-between", // Space between time and cost
        marginBottom: 30,
    },
    halfContainer: {
        width: "49%", // Each takes half of the row width with small gap between
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 20, // 上下的 padding
        paddingHorizontal: 10, // 左右的 padding
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        marginBottom: 50,
    },
    costContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        marginBottom: 30,
        width: "80%",
        alignItems: "center",
    },
    //cost: { margin: 5,  },
    buttonContainer: {
        width: "100%", // Button takes full width
        alignItems: "center", // Center the button horizontally
        marginTop: 20, // Add some margin for spacing
    },
    button: {
        backgroundColor: "#FF6347", // Button background color
        paddingVertical: 10, // Padding for button
        paddingHorizontal: 20,
        borderRadius: 8, // Rounded corners
        borderWidth: 2,
        borderColor: "#FF4500", // Border color
        alignItems: "center", // Center text inside the button
        width: "100%",
    },
    buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
    buttonDisabled: {
        backgroundColor: "#d3d3d3", // 灰色按钮背景
        borderColor: "#a9a9a9", // 灰色边框
    },
});
