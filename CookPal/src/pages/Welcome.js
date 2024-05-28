import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import tw from 'tailwind-react-native-classnames'

export default function Welcome() {
    const navigation = useNavigation()

    const handleGetStarted = () => {
        navigation.navigate('LoginScreen')
    }

    return (
        <View style={tw`flex-1`}>
            <View style={tw`bg-green-500  h-72 rounded rounded-b-full`} />
            <View style={tw`flex-1 justify-center items-center`}>
                <Image
                    source={require('../../assets/image/welcome_imge.jpg')}
                    style={tw`w-40 h-40 mb-8 rounded-full`}
                    resizeMode="contain"
                />

                <Text style={tw`text-2xl font-bold mb-4 text-gray-900`}>
                    Welcome to CookPal
                </Text>
                <Text style={tw`text-lg text-center mb-8 text-green-500`}>
                    Your ultimate cooking companion
                </Text>
                <TouchableOpacity
                    style={tw`bg-green-500 px-6 py-3 rounded-lg`}
                    onPress={handleGetStarted}
                >
                    <Text style={tw`text-white font-bold text-lg`}>
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
