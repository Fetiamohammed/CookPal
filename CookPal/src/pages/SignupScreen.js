import React, { useState } from 'react'
import {
    View,
    TextInput,
    Text,
    Image,
    StyleSheet,
    Alert,
    TouchableOpacity
} from 'react-native'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-config'
export default function SignUpScreen({ navigation }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async () => {
        try {
            await setDoc(doc(db, 'users', email), { name, email, password })
            Alert.alert('Success', 'Account created successfully!')
            navigation.navigate('LoginScreen')
        } catch (error) {
            Alert.alert('Error', 'An error occurred during signup.')
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/image/Turkish-Baklava.jpg')}
                style={styles.image}
            />
            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '40%'
    },
    box: {
        backgroundColor: 'white',
        borderTopRightRadius: 50,
        padding: 20,
        height: '70%',
        position: 'absolute',
        top: '30%',
        left: 0,
        right: 0
    },
    input: {
        height: 40,
        marginTop: 30,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        padding: 10,
        backgroundColor: 'rgb(16 185 129)',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
})
//on this page, the user can sign up for an account by entering their name, email, and password.
// When the user clicks the "Sign Up" button, the handleSignUp function is called.
//This function creates a new document in the users collection in Firestore with the user's name, email, and password.
// If the signup is successful, an alert is shown to the user, and they are navigated to the LoginScreen.
