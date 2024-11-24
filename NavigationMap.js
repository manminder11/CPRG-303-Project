import React, { useState } from 'react'
import {
    Alert,
    Button,
    ImageBackground,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

export default function NavigationMap() {
    const [modalVisible, setModalVisible] = useState(false)
    const [inputText, setInputText] = useState('')

    const showPrompt = () => {
        setModalVisible(true)
    }

    const handleInputChange = (text) => {
        setInputText(text)
    }

    const handleSubmit = () => {
        console.log('User input:', inputText)
        setModalVisible(false)
    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    return (
        <ImageBackground
            source={require('./assets/map.jpg')} // Replace with your image file
            style={styles.imageBackground}
            imageStyle={styles.image} // Optional: To style the image itself
        >
            <TouchableOpacity
                onPress={() => Alert.alert(
                    'Confirm parking', // Title of the alert
                    'Did you want to park here?', // Message
                    [{
                        text: 'Cancel', // Button text
                        onPress: () => console.log('Cancel Pressed'), // Action for "Cancel"
                        style: 'cancel' // Styling for the "Cancel" button
                    }, {
                        text: 'OK', // Button text
                        onPress: () => {
                            showPrompt()
                        } // Action for "OK"
                    }],
                    { cancelable: false } // Whether the alert can be dismissed by tapping outside
                )}>
                <Text
                    style={{
                        borderColor: 'green',
                        backgroundColor: 'green',
                        borderWidth: 1,
                        padding: 10,
                        width: 100,
                        color: 'white',
                        textAlign: 'center',
                        marginLeft: 250,
                        marginTop: 550
                    }}>
                    Exit
                </Text>
            </TouchableOpacity>
            <View>
                <Modal visible={modalVisible} animationType='slide' transparent={true}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text>What is the hourly price for this parking lot?</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='type here your unit price'
                                value={inputText}
                                onChangeText={handleInputChange}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Button title='OK' onPress={handleSubmit} color='green' />
                                <Button title='Cancel' onPress={handleCancel} color='green' />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover', // Makes sure the image covers the container
        justifyContent: 'center', // Aligns content (text) to the bottom
        alignItems: 'center', // Centers text horizontally
        alignSelf: 'center',
        width: Platform.OS === 'web' ? '500' : '100%',
        height: '100%'
    },
    image: {
        // Optional: Add styles for the image itself (e.g., borderRadius, etc.)
    },
    textBottom: {
        fontSize: 30,
        color: 'black',
        paddingBottom: 20, // Optional: Adjust space from the bottom
        textAlign: 'left', // Centers the text horizontally
        borderColor: 'black',
        borderWidth: 2,
        width: '100%'
    },
    modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContainer: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
    modalTitle: { fontSize: 18, marginBottom: 10 },
    input: { borderWidth: 1, borderColor: 'gray', width: '100%', padding: 10, marginBottom: 20, borderRadius: 5 }
})
