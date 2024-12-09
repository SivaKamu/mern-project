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
