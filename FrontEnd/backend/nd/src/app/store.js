import {combineReducers, configureStore} from '@reduxjs/toolkit'
import formReducer from '../features/form/formSlice'
import userReducer from '../features/user/userSlice'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const persistConfig ={
    key:'n&d',
    storage
}

const persistedReducer =persistReducer (persistConfig, userReducer)



export const store = configureStore({
    reducer:{
        form: formReducer,
        user:persistedReducer
    },
    middleware:[thunk]
})

export const persistor =persistStore(store)


