import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/client';
import { toast } from 'react-toastify';

export const authDataSlice = createSlice({
  name: "authData",
  initialState: {
    isLoading: false,
    homeData: null,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setHomeData: (state, action) => {
        state.homeData = action.payload;
    },
  },
});

export const { setIsLoading, setHomeData } = authDataSlice.actions;

export default authDataSlice.reducer;

// Signup Action
export const signUp = (query, navigate) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const result = await request.post("/signup", query, { includeAuthorization: false });
    dispatch(setIsLoading(false));
    if (result.status) {
      toast.success("Signed up successfully!");
      navigate('/otp', { state: { email: query.email, password: query.password, type: 'signup' } });
    }
  } catch (error) {
    dispatch(setIsLoading(false));
    toast.error("Something went wrong! Please try again.");
  }
};

// Login Action
export const login = (query, navigate) => async (dispatch) => {
  dispatch(setIsLoading(true));
    const result = await request.post("/login", query, { includeAuthorization: false });
    dispatch(setIsLoading(false));
    if (result.statusCode === 200) {
      toast.success(result.data.message);
      navigate('/otp', { state: { email: query.email, password: query.password } });
    dispatch(setIsLoading(false));
    // if(result.s) toast.error("Something went wrong! Please try again.");
}};

// OTP Verification Action
export const Otp = (query, navigate) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const result = await request.post("/verify-otp", query, { includeAuthorization: false });
    dispatch(setIsLoading(false));
    if (result.status) {
      toast.success(result.data.message);
      if (query.type === 'signup') {
        navigate('/login');
      }
      else if (query.type === 'login') {
        localStorage.setItem("token", result.data.token); // Store token
        localStorage.setItem("refreshToken", result.data.refreshToken); // Store refresh token
        navigate('/home');
      }
    }
  } catch (error) {
    dispatch(setIsLoading(false));
    toast.error("Something went wrong! Please try again.");
  }
};

// Home API Action (requires token)
export const fetchHomeData = () => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const result = await request.get("/profile");
      dispatch(setIsLoading(false));
      if (result.status) {
        dispatch(setHomeData(result.data)); // Store the API response in Redux
      }
    } catch (error) {
      dispatch(setIsLoading(false));
      toast.error("Failed to fetch home data.");
    }
  };

  // Logout Action
    export const logout = (query, navigate) => async (dispatch) => {
        dispatch(setIsLoading(true));
        const result = await request.post("/logout", { "refreshToken": query});
        dispatch(setIsLoading(false));
        if (result.statusCode === 200) {
            // Clear session data (JWT tokens)
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            toast.success(result.data.message);
            navigate('/login');
        dispatch(setIsLoading(false));
    }};
