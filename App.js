import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import HomePage from './home'
import MinePage from './Mine'
import NavigationPage from './Navigation'
import search from './search'

export default function App() {
    const Tab = createBottomTabNavigator()

    return (
        <NavigationContainer >
            <Tab.Navigator>
                <Tab.Screen name='Search' component={search} />
                <Tab.Screen name='Home' component={HomePage} />
                <Tab.Screen name='Navi' component={NavigationPage} />
                <Tab.Screen name='Mine' component={MinePage} />
                
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
