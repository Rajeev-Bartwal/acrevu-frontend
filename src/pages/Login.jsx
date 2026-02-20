import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import api from "../services/api";
import showToast from "../services/toastService";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      showToast.error("Email and password are required");
      return;
    }

    try {
      await loginUser(formData);
      showToast.success("Login successful");
      navigate("/");
    } catch (err) {
      showToast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login</h2>

        <input
          type="username"
          name="username"
          placeholder="Email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className={styles.loginBtn}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className={styles.footer}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
