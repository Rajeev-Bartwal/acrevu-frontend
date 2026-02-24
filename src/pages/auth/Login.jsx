import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import showToast from "../../services/toastService";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!formData.identifier || !formData.password) {
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
          type="text"
          name="identifier"
          placeholder="Email / Mobile-Number"
          className={styles.input}
          value={formData.identifier}
          onChange={handleChange}
        />

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
          />

          <span className={styles.eyeIcon} onClick={togglePassword}>
            <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
          </span>
        </div>

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
