import { Routes, Route } from "react-router-dom";
import Register from "../pages/register";
import VerifyOtp from "../pages/VerifyOtp";
import Home from "../pages/Home";
import Login from "../pages/Login";

const AppRoutes = () => {
 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
};

export default AppRoutes;
