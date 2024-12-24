import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/client';
import { toast } from 'react-toastify';

export const authDataSlice = createSlice({
  name: "authData",
  initialState: {
    isLoading: false,
    homeData: null,
    timeSeries: 'TIME_SERIES_DAILY',
    symbol: 'AAPL',
    fundamentalFunctions: 'OVERVIEW',
    stockData: [],
    fundamentalData: {}
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setHomeData: (state, action) => {
      state.homeData = action.payload;
    },
    setTimeSeries: (state, action) => {
      state.timeSeries = action.payload;
    },
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    setFundamentalFunctions: (state, action) => {
      state.fundamentalFunctions = action.payload;
    },
    setHomeData: (state, action) => {
      state.homeData = action.payload;
    },
    setStockData: (state, action) => {
      // Ensure the action payload is the correct data structure
      state.stockData = action.payload;
    },
    setFundamentalData: (state, action) => {
      // Ensure the action payload is the correct data structure
      state.fundamentalData = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setHomeData,
  setStockData,
  setTimeSeries,
  setSymbol,
  setFundamentalFunctions,
  setFundamentalData
}
  = authDataSlice.actions;

export default authDataSlice.reducer;

// Signup Action
export const signUp = (query, navigate) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const result = await request.post("/signup", query, { includeAuthorization: false });
    dispatch(setIsLoading(false));
    console.log(result, "try");
    if (result.data.statusCode === 200) {
      toast.success(result.data.message);
      navigate('/otp', { state: { email: query.email, password: query.password, type: 'signup' } });
    } else if (result.data.statusCode === 409) {
      toast.error(result.data.message);
    }
  } catch (error) {
    console.log(error, "catch");
    dispatch(setIsLoading(false));
    toast.error("Something went wrong! Please try again.");
  }
};

// Login Action
export const login = (query, navigate) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const result = await request.post("/login", query, { includeAuthorization: false });
  dispatch(setIsLoading(false));
  console.log(result, "try");
  if (result.data.statusCode === 200) {
    toast.success(result.data.message);
    navigate('/otp', { state: { email: query.email, password: query.password, type: 'login' } });
    dispatch(setIsLoading(false));
  } else if (result.data.statusCode === 409) {
    console.log("hi");
    toast.error(result.data.message);
  }
};

// OTP Verification Action
export const Otp = (query, navigate) => async (dispatch) => {
  dispatch(setIsLoading(true));
  console.log(query, 'body query');
  try {
    const result = await request.post("/verify-otp", query, { includeAuthorization: false });
    dispatch(setIsLoading(false));
    if (result.data.statusCode === 200) {
      toast.success(result.data.message);
      if (query.type === 'signup') {
        navigate('/login');
      }
      else if (query.type === 'login') {
        localStorage.setItem("token", result.data.token); // Store token
        localStorage.setItem("refreshToken", result.data.refreshToken); // Store refresh token
        navigate('/home');
      }
    } else if (result.data.statusCode === 409) { toast.error(result.data.message); }
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
  const result = await request.post("/logout", { "refreshToken": query });
  dispatch(setIsLoading(false));
  if (result.statusCode === 200) {
    // Clear session data (JWT tokens)
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    toast.success(result.data.message);
    navigate('/login');
    dispatch(setIsLoading(false));
  }
};

// forgot password Action
export const forgotPassword = (query, navigate) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const result = await request.post("/forgot-password", query, { includeAuthorization: false });
  dispatch(setIsLoading(false));
  if (result.data.statusCode === 200) {
    toast.success(result.data.message);
    dispatch(setIsLoading(false));
  } else if (result.data.statusCode === 409) {
    toast.error(result.data.message);
  }
};

// reset password Action
export const resetPassword = (query, navigate) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const result = await request.post("/reset-password", query, { includeAuthorization: false });
  dispatch(setIsLoading(false));
  if (result.data.statusCode === 200) {
    toast.success(result.data.message);
    navigate('/login');
    dispatch(setIsLoading(false));
  } else if (result.data.statusCode === 409) {
    toast.error(result.data.message);
  }
};

export const fetchStockData = () => async (dispatch, getState) => {
  const timeSeries = getState().authData.timeSeries;
  const symbol = getState().authData.symbol;
  dispatch(setIsLoading(true));
  const result = await request.get(`/stockData/${timeSeries}/${symbol}`);
  console.log(result); // Log the API response to check its structure
  dispatch(setIsLoading(false));
  dispatch(setStockData(result.data.allData));
};

export const fetchFinancialData = () => async (dispatch, getState) => {
  const fundamentalFunctions = getState().authData.fundamentalFunctions;
  const symbol = getState().authData.symbol;
  dispatch(setIsLoading(true));
  const result = await request.get(`/fundamentalData/${fundamentalFunctions}/${symbol}`);
  console.log(result.data.allData[0]['data']); // Log the API response to check its structure
  dispatch(setIsLoading(false));
  dispatch(setFundamentalData(result.data.allData[0]['data']));
};