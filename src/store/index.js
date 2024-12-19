import { configureStore } from '@reduxjs/toolkit'
import authData from './features/authData'

export default configureStore({
    reducer: {
        authData
    }
})