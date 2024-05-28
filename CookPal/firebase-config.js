import { initializeApp } from 'firebase/app'
import {
    getAuth,
    initializeAuth,
    getReactNativePersistence
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} from '@env'

const firebaseConfig = {
    apiKey:API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and Firestore
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})
const db = getFirestore(app)

export { auth, db }
