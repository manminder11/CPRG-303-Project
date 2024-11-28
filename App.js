import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home';
import SearchScreen from './search';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const parkingLocations = [
    { name: "Downtown Parking Lot", address: "123 4th Ave SW, Calgary, AB", capacity: 150 },
    { name: "East Village Parking", address: "567 Riverfront Ave SE, Calgary, AB", capacity: 200 },
    { name: "Chinook Centre Parking", address: "6455 Macleod Trail SW, Calgary, AB", capacity: 500 },
    { name: "University District Parking", address: "2500 University Dr NW, Calgary, AB", capacity: 300 },
    { name: "Stampede Parkade", address: "1410 Olympic Way SE, Calgary, AB", capacity: 400 }
];

const Stack = createStackNavigator();

const ParkingScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={parkingLocations}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>{item.address}</Text>
                        <Text>Capacity: {item.capacity}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    item: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Parking" component={ParkingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
