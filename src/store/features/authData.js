import { createSlice } from '@reduxjs/toolkit';
import { client } from '../../utils/client';
import { toast } from 'react-toastify';

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

export const signUp = (query, navigate) => async (dispatch, getState) => {
    console.log(query);
    dispatch(setIsLoading(true));
    let endPoint = "/signup";
    let body =  query;
    try {
        const result = await client.post(endPoint, body);
        dispatch(setIsLoading(false));
        toast.success("Signed up successfully!"); 
        navigate('/otp', { state: { email: query.email, password: query.password, type: 'signup' } });
    } catch (error) {
        dispatch(setIsLoading(false));
        toast.error("Something went wrong! Please try again."); 
    }
}

export const Otp = (query) => async (dispatch, getState) => {
    console.log(query);
    dispatch(setIsLoading(true));
    let endPoint = "/verify-signup-otp";
    let body =  query;
    try {
        const result = await client.post(endPoint, body);
        dispatch(setIsLoading(false));
        toast.success("OTP verified successfully!"); 
    } catch (error) {
        dispatch(setIsLoading(false));
        toast.error("Something went wrong! Please try again."); 
    }
}