import axios from "axios";
import config from "../config";

const apiUrl = config.apiBaseUrl;

const client = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh the token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  try {
    const response = await axios.post(`${apiUrl}/refresh-token`, {
      refreshToken,
    });
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", response.data.token); // Update the access token in storage
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token", error);
    throw new Error("Failed to refresh token.");
  }
};

// Add a request interceptor to include the token
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token && config.includeAuthorization !== false) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      // toast.error("Session expired. Please log in again.");
      // localStorage.removeItem("token"); // Clear invalid token
      // window.location.href = "/login"; // Redirect to login page


      try {
        const newAccessToken = await refreshAccessToken();
        // Retry the original request with the new access token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config); // Retry the request with the new access token
      } catch (err) {
        console.error("Token refresh failed", err);
        // Optionally log out the user or redirect to login screen
        window.location.href = "/login"; // Redirect to login page (if necessary)
      }


    }
    return Promise.reject(error);
  }
);

export async function request(url, { body, method, ...customConfig } = {}) {
  const config = {
    url,
    method,
    headers: customConfig.headers || {},
    data: method === "GET" ? null : body,
    ...customConfig,
  };

  try {
    const response = await client(config);
    return {
      status: true,
      data: response.data,
    };
  } catch (err) {
    return {
      status: false,
      data: err.response?.data || null,
      message: err.message,
      error: err,
    };
  }
}

// Helper methods
request.get = function (url, customConfig = {}) {
  return request(url, { ...customConfig, method: "GET" });
};

request.post = function (url, body, customConfig = {}) {
  return request(url, { ...customConfig, method: "POST", body });
};

request.put = function (url, body, customConfig = {}) {
  return request(url, { ...customConfig, method: "PUT", body });
};

request.delete = function (url, body, customConfig = {}) {
  return request(url, { ...customConfig, method: "DELETE", body });
};

export default request;
