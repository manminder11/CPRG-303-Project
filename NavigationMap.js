import React, { useState,useEffect } from 'react'

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
import MapView, { Marker, Polyline } from 'react-native-maps'
import * as Location from "expo-location"

export default function NavigationMap({endLocation,navigation, duringParking, 
    setDuringParking}) {
    
    const [startLocation, setStartLocation] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    //const [endLocation] = useState(endLoc);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    //Model get unique price
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    //DATA SEND TO CHEN
    const [data, setData] = useState({
      location: 'Calgary',
      time: 0,
      price: 0,
  });

    const showPrompt = () => {
        setModalVisible(true)
    }

    const handleInputChange = (text) => {
        setInputText(text)
        
    }

    const handleSubmit = () => {
          const updatedData = {
            location: endLocation.address,
            time: new Date().toLocaleTimeString(),
            price: parseFloat(inputText),
        };
        //setDuringParking(true);
        setData(updatedData);
        //console.log('User input:', inputText);
        setModalVisible(false);
        navigation.navigate('Mine', { data:updatedData });
    }

    const handleCancel = () => {
        setModalVisible(false)
    }
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setStartLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);
    useEffect(() => {
        if (startLocation && startLocation.latitude && startLocation.longitude) {
            console.log(startLocation.longitude + '-' + startLocation.latitude);
            const fetchRoute = async () => {
                
                
                try {
                    const startLat = startLocation.latitude;
                
                    const startLng = startLocation.longitude;
                    const endLat = endLocation.latitude;
                    const endLng = endLocation.longitude;

                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${endLat},${endLng}&key=AIzaSyDg618T8Fso8lgi9JqeUh8wQPLkLsAkXMM`
                    );
                    const data = await response.json();
                    if (data.routes.length > 0) {
                        // Assuming you have a function to decode polyline
                        const points = decodePolyline(data.routes[0].overview_polyline.points);
                        setRouteCoordinates(points);
                        const route = data.routes[0].legs[0];
                        console.log(route.distance.text);
                        console.log(route.duration.text);

                        setDistance(route.distance.text);
                        setDuration(route.duration.text); 
                    }
                    
                } catch (error) {
                    console.log(error);
                }
                
            };

            fetchRoute();
        }
    }, [startLocation, endLocation]);
    const decodePolyline = (encoded) => {
        let points = [];
        let index = 0, len = encoded.length;
        let lat = 0, lng = 0;
    
        while (index < len) {
          let b, shift = 0, result = 0;
          do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
          } while (b >= 0x20);
    
          let dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
          lat += dlat;
    
          shift = 0;
          result = 0;
          do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
          } while (b >= 0x20);
    
          let dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
          lng += dlng;
    
          points.push({
            latitude: lat / 1e5,
            longitude: lng / 1e5,
          });
        }
        return points;
      };
    
    return (
        <View style={styles.container}>
        <View style={styles.inputContainer}>
        <View style={styles.inlineInput}>
          <TextInput
            style={styles.input}
            placeholder="Current Location"
            keyboardType="numeric"
            
          />
         
        </View>

        <View style={styles.inlineInput}>
          <TextInput
            style={styles.input}
            placeholder="End location"
            keyboardType="numeric"
            value={endLocation.address}
          />
          
        </View>
      </View>
        {startLocation ? (
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: startLocation.latitude,
                    longitude: startLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={startLocation} title="Start Location" />
                <Marker coordinate={endLocation} title="End Location" />
                <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />

            </MapView>):(
                <Text>Loading...</Text>)
        }

        <View style={styles.bottomView}>
            <Text style={styles.text}>Drive by car with {distance} about {duration}</Text>
            <Button title='Exit' color="green" style={{borderColor:5,padding:5,marginTop:10}}
            onPress={() => Alert.alert(
              'Confirm parking', // Title of the alert
              'Did you want to park here?', // Message
              [{
                  text: 'Cancel', // Button text
                  onPress: () =>  navigation.navigate('Home'), // Action for "Cancel"
                  style: 'cancel' // Styling for the "Cancel" button
              }, {
                  text: 'OK', // Button text
                  onPress: () => {
                      showPrompt()
                  } // Action for "OK"
              }],
              { cancelable: false } // Whether the alert can be dismissed by tapping outside
          )}
            ></Button>
        </View>
        
        <View style={{marginTop:'50%'}}>
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
                                <Button title='Cancel' onPress={handleCancel} color='green' />
                                <Button title='OK' onPress={handleSubmit} color='green' />
                                
                            </View>
                        </View>
                    </View>
                </Modal>
            </View> 

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      inputContainer: {
        position: "absolute",
        top: 10,
        width: "100%",
        paddingHorizontal: 10,
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center',

      },
      inlineInput: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      },
      label: {
        fontSize: 16,
        fontWeight: "bold",
      },
      input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 5,
        width: '100%',
      },
      bottomView: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 15,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
      },
      modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
      modalContainer: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
      modalTitle: { fontSize: 18, marginBottom: 10 },
      input: { borderWidth: 1, borderColor: 'gray', width: '100%', padding: 10, marginBottom: 20, borderRadius: 5 },
      map: {
        width: '100%',
        height: '100%',
      },
    
    
})