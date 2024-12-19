import axios from "axios";
import config from "../config.js";

const { apiBaseUrl } = config || {};

export async function client(url, {
  body,
  method,
  contentType = "application/json",
  accessToken = localStorage.getItem("token"),
  includeAuthorization = true,
  ...customConfig } = {}) {

  const tokenExpiry = localStorage.getItem("tokenExpiry");

  // Check if token is about to expire (e.g., within the next 5 minutes)
  if (tokenExpiry && Date.now() > tokenExpiry - 5 * 60 * 1000) {
    const refreshedToken = await refreshToken();
    if (refreshedToken) {
      localStorage.setItem("token", refreshedToken);
      // Get the new token's expiry time and store it
      const decoded = decodeJwt(refreshedToken);
      localStorage.setItem("tokenExpiry", decoded.exp * 1000);
    }
  }

  const headers = {
    ...(includeAuthorization && { Authorization: accessToken }),
  };

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = contentType;
  }

  const config = {
    url,
    method,
    baseURL: apiBaseUrl,
    headers,
    data: method === "GET" ? null : body,
  };

  let data;

  try {
    const response = await axios(config);
    data = await response.data;
    const { status, ...restData } = data || {};
    if (response.status === 200) {
      if (data?.statusMessage === "Success")
        return {
          status: true,
          data: restData,
        };
    }
    return {
      status: false,
      data: restData,
      message: data?.status,
    };
  } catch (err) {
    return {
      status: false,
      data: err.response?.data || null,
      message: err?.message,
      error: err,
    };
  }
}


client.get = function (url, customConfig = {}) {
  return client(url, { ...customConfig, method: "GET" });
};

client.post = function (url, body, customConfig = {}) {
  return client(url, { ...customConfig, method: "POST", body });
};

client.put = function (url, body, customConfig = {}) {
  return client(url, { ...customConfig, method: "PUT", body });
};

client.delete = function (url, body, customConfig = {}) {
  return client(url, { ...customConfig, method: "DELETE", body });
};


async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    // No refresh token available, user needs to log in again
    return null;
  }

  try {
    const response = await axios.post(`${apiBaseUrl}/refresh-token`, { refreshToken });
    if (response.status === 200) {
      return response.data.newToken; // Assuming the server returns a new token
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}
