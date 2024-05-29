import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const BottomTabIcon = ({ focused, color, route }) => {
    const iconColor = focused ? 'green' : color
    let iconName

    switch (route.name) {
        case 'Home':
            iconName =  'home';
            break
        case 'Profile':
            iconName = focused ? 'person' : 'person-outline'
            break
        case 'Settings':
            iconName = focused ? 'settings' : 'settings-outline'
            break
        default:
            iconName = 'help-circle-outline'
    }

    return <MaterialIcons name={iconName} size={24} color={iconColor} />
}

export default BottomTabIcon
// it is a component that renders the icons for the bottom tab navigation;
