import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        logoutUser();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          { refreshToken }
        );

        // Save new access token
        localStorage.setItem("accessToken", res.data.accessToken);

        // If backend returns refreshToken again, keep this:
        if (res.data.refreshToken) {
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }

        // Retry original request
        originalRequest.headers.Authorization =
          "Bearer " + res.data.accessToken;

        return api(originalRequest);
      } catch (refreshError) {
        logoutUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

function logoutUser() {
  localStorage.clear();
  window.location.href = "/login";
}

export default api;