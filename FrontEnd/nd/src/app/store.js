import {configureStore} from '@reduxjs/toolkit'
import formReducer from '../features/form/formSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
    reducer:{
        form: formReducer,
        user:userReducer
    }
})

export default store