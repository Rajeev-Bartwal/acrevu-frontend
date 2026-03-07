import api from "./api";

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const verifyOtp = (data) => {
  return api.post("/auth/verify-otp", data);
};

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);

  const { accessToken, refreshToken, user } = response.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  window.dispatchEvent(new Event("login"));

  return response.data;
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (e) {
    console.error("Invalid user data in localStorage");
    localStorage.removeItem("user");
    return null;
  }
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("accessToken");
};

// Logout
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  // Notify app about login
  window.dispatchEvent(new Event("logout"));
};
