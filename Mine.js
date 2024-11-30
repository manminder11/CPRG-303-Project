import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function MinePage({route}) {
    const [isParkingDone, setIsParkingDone] = useState(false);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const navigation = useNavigation();
    //GET DATA FROM NAVIGATION
    const { data } = route.params;
    /*
    console.log(data.location);
    console.log(data.time);
    console.log(data.price);
    */
    const handleNavigate = () => {
        navigation.navigate('Navi') // 导航到Home页面
    }
    const handleConfirm = () => {
        // After confirmation, navigate to the Home page
        setIsConfirmationVisible(false)
        navigation.navigate('Home')
    }
    const handleStop = () => {
        Alert.alert('Have you left this parking spot?', '', [{
            text: 'No',
            onPress: () => {
                // If No, stay on the current page (MinePage)
                setIsParkingDone(false)
            },
            style: 'cancel',
        }, {
            text: 'Yes',
            onPress: () => {
                // If Yes, show the cost and then move to the home page
                Alert.alert('Duration:\n1h 45min\nCost:\n$20.00', '', [{
                    text: 'Got it !',
                    onPress: () => {
                        // If No, stay on the current page (MinePage)
                        navigation.navigate('Home')
                    },
                    style: 'cancel',
                }], { cancelable: false })
            },
        }], { cancelable: false })
    }
    
    return (
        <ImageBackground
            source='..//..//assets//background3.jpg' // Replace with your image path
            resizeMode='cover'
            style={styles.background}>
            <View style={styles.container}>
                <View style={styles.stack}>
                    <View style={styles.parkContainer}>
                        <Text style={styles.header}>
                            Current Parking:
                        </Text>
                        <TouchableOpacity onPress={handleNavigate} style={styles.row}>
                            <Text style={styles.address}>
                                {data.location}
                            </Text>
                            <Ionicons name='arrow-forward-circle' size={30} color='#007BFF' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.halfContainer}>
                            <Text style={styles.header}>
                                Duration:
                            </Text>
                            <Text style={styles.timer}>
                                {data.time}
                            </Text>
                        </View>
                        <View style={styles.halfContainer}>
                            <Text style={styles.header}>
                                Cost:
                            </Text>
                            <Text style={styles.cost}>
                                ${data.price}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleStop}>
                            <Text style={styles.buttonText}>
                                Stop
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        width: '100%',
        height: '100%', // 确保背景填满
    },
    stack: {
        width: '100%', // Ensure the stack takes full width
        alignItems: 'center', // Center all items horizontally
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center', // 水平方向居中
        justifyContent: 'flex-start', // 垂直方向对齐到顶部
        padding: 20,
    },
    header: { fontSize: 30, fontWeight: 'bold', color: '#333', marginBottom: 30 },
    row: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    parkContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        marginBottom: 100,
        width: '100%',
        // alignItems: "center",
    },
    timer: {
        fontSize: 25,
        fontWeight: '600', // 比 bold 稍轻，更现代的视觉效果
        color: '#2C3E50', // 深蓝灰色，柔和而清晰
        letterSpacing: 1.3, // 增加字母间距，使数字更易读
        textAlign: 'center', // 居中对齐
        backgroundColor: '#EFEFEF', // 添加淡灰背景，区分时间显示区域
        paddingVertical: 5, // 垂直填充，使文本更舒适
        paddingHorizontal: 10, // 水平填充
        borderRadius: 10, // 圆角边框，柔化整体视觉效果
        overflow: 'hidden', // 防止背景扩展超出
        shadowColor: '#000', // 添加阴影，立体感
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    rowContainer: {
        flexDirection: 'row', // Arrange items in a row (side by side)
        width: '100%', // Full width container
        justifyContent: 'space-between', // Space between time and cost
        marginBottom: 30,
    },
    halfContainer: {
        width: '49%', // Each takes half of the row width with small gap between
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        marginBottom: 50,
    },
    costContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        marginBottom: 30,
        width: '80%',
        alignItems: 'center',
    },
    cost: { fontSize: 25, color: '#4CAF50', fontWeight: 'bold' },
    buttonContainer: {
        width: '100%', // Button takes full width
        alignItems: 'center', // Center the button horizontally
        marginTop: 20, // Add some margin for spacing
    },
    button: {
        backgroundColor: '#FF6347', // Button background color
        paddingVertical: 10, // Padding for button
        paddingHorizontal: 20,
        borderRadius: 8, // Rounded corners
        borderWidth: 2,
        borderColor: '#FF4500', // Border color
        alignItems: 'center', // Center text inside the button
        width: '100%',
    },
    buttonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' }
})
