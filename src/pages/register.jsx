import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import api from "../services/api";
import showToast from "../services/toastService";


function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "USER",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      await api.post("/auth/register", formData);
      showToast.success("Otp Sent to youre Email..")
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      showToast.error(err.response?.data || "Registration failed")
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <h2 className={styles.title}>Create Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          className={styles.input}
          onChange={handleChange}
        />
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.accountType === "DEALER"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  accountType: e.target.checked ? "DEALER" : "USER",
                })
              }
            />
            Are you a dealer?
          </label>
        </div>

        <button className={styles.signupBtn} onClick={handleSignup}>
          Sign Up
        </button>

        <div className={styles.footer}>
                  Already have an Account?{" "}
                  <span onClick={() => navigate("/login")}>
                    Login
                  </span>
                </div>
      </div>
    </div>
  );
}

export default Register;
