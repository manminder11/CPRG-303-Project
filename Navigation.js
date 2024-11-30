import { Text } from 'react-native'
import NavigationMap from './NavigationMap'

export default function NavigationPage({ route,navigation }) {
    const { endLocation } = route.params;
    return <NavigationMap endLocation={endLocation} navigation={navigation}/>
}
