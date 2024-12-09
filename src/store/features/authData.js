import { createSlice } from '@reduxjs/toolkit';
import { client } from '../../utils/client';

export const authDataSlice = createSlice({
    name: "authData",
    initialState: {
        isLoading: false,
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },  
 },
});

export const {
    setIsLoading,
} = authDataSlice.actions;

export default authDataSlice.reducer;


