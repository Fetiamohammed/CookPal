import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore } from 'redux-persist'
import recipeApi from './api/recipeApi'
import configSlice from './slice/configSlice'
import authSlice from './slice/authSlice'
import { usersApi } from './api/UsersApi'

const middlewares = [recipeApi.middleware, usersApi.middleware]

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['config']
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        [recipeApi.reducerPath]: recipeApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        auth: authSlice,
        config: configSlice
    })
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PURGE'
                ]
            }
        }).concat(...middlewares)
})

export const persistor = persistStore(store, null, () => {
    const state = store.getState()
})

setupListeners(store.dispatch)
