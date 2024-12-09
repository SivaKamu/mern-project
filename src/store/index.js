import { configureStore } from '@reduxjs/toolkit'
import authData from './features/authData'
import actionItems from './features/actionItems'

export default configureStore({
    reducer: {
        authData
    }
})