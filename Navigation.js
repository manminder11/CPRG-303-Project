import { Text ,View} from 'react-native'
import NavigationMap from './NavigationMap'

export default function NavigationPage({ route,navigation }) {
   
   const { endLocation } = route.params || {};

    if (!endLocation) {
        return (
            <View>
                <Text>Error: endLocation is not provided.</Text>
            </View>
        );
    }

    return <NavigationMap endLocation={endLocation} navigation={navigation} />;
    
}
