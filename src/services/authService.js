import api from "./api";

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const verifyOtp = (data) => {
  return api.post("/auth/verify-otp", data);
};

export const login = (data) => {
  return api.post("/auth/login" , data);
};

// Login + store session
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);

  const { token, user } = response.data;

  // Save in localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Check login
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
