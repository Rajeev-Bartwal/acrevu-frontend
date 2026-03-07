import { Routes, Route } from "react-router-dom";
import Register from "../pages/auth/register";
import VerifyOtp from "../pages/auth/VerifyOtp";
import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Buy from "../pages/public/Buy";
import AddProperty from "../pages/addProperty/AddProperty";
import ProtectedRoute from "./ProtectedRoutes";
import PropertySearch from "../pages/property/PropertySearch";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/buy" element={<Buy />} />

      <Route
        path="/add-property"
        element={
          // <ProtectedRoute>
          <AddProperty />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          // <ProtectedRoute>
            <PropertySearch />
          // </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
