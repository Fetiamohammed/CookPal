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
import { useDispatch } from 'react-redux'
import {
    loginStart,
    loginSuccess,
    loginFailure
} from '../store/slice/authSlice'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-config'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async () => {
        dispatch(loginStart())
        try {
            const userDocRef = doc(db, 'users', email)
            const userDocSnap = await getDoc(userDocRef)

            if (userDocSnap.exists()) {
                const userDocData = userDocSnap.data()
                if ((password, userDocData.password)) {
                    dispatch(loginSuccess(userDocData))
                    Alert.alert('Success', 'Login successful')
                    navigation.navigate('Home')
                } else {
                    throw new Error('Invalid password')
                }
            } else {
                throw new Error('User not found')
            }
        } catch (error) {
            dispatch(loginFailure(error.message))
            Alert.alert('Error', error.message)
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/image/Avocado-toast.png')}
                className="w-full h-72"
            />
            <View style={styles.box}>
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
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text
                    style={styles.signupText}
                    onPress={() => navigation.navigate('SignUpScreen')}
                >
                    Don't have an account? Sign Up
                </Text>
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
        height: '60%',
        resizeMode: 'cover'
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
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        padding: 10,
        backgroundColor: 'rgb(16 185 129)',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 12,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    signupText: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 20,
        alignSelf: 'center'
    }
})
// it is a component that renders the login screen;
// it works fine
