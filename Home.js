import { useState } from 'react';
import { Button, Text, View } from 'react-native'

export default function HomePage({navigation}) {
    const [endLocation, setEndLocation] = useState({
        latitude: 0,
        longitude: 0,
        address: '',
    });
    
    const handleNavigation = (location) => {
        setEndLocation(location);
        navigation.navigate('Navi', { endLocation: location });
    };
    

    return (
        <View>
            
            <Button
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                title="Go to 99 Heritage Gate SE, Calgary, AB T2H 3A7"
                onPress={() => handleNavigation({
                    latitude: 50.9784,
                    longitude: -114.0708,
                    address: "99 Heritage Gate SE, Calgary, AB T2H 3A7"
                })}
            />
            <Button
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                title="Go to 12450 149 Street NW, Edmonton, AB T5V 1G9"
                onPress={() => handleNavigation({
                    latitude: 53.588132,
                    longitude: -113.624996,
                    address: "12450 149 Street NW, Edmonton, AB T5V 1G9"
                })}
            />
        </View>
    )
}
