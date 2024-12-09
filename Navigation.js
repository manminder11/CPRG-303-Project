import { Text ,View} from 'react-native'
import NavigationScreen from './NavigationMap'

export default function NavigationPage({ route,navigation }) {
   
   const { endLocation } = route.params || {};

    if (!endLocation) {
        return (
            <View>
                <Text>Error: endLocation is not provided.</Text>
            </View>
        );
    }

    return <NavigationScreen endLocation={endLocation} navigation={navigation} />;
    
}
