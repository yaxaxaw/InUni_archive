import { getToken, removeToken } from "../utils/token";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request(path, options = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    const error = new Error(data?.message || response.statusText || "Request failed");

    error.response = {
      status: response.status,
      data,
    };

    throw error;
  }

  return {
    data,
    status: response.status,
    headers: response.headers,
  };
}

const api = {
  get(path, options) {
    return request(path, {
      ...options,
      method: "GET",
    });
  },

  post(path, body, options) {
    return request(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  },
};

export default api;
