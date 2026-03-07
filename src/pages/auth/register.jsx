import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import api from "../../services/api";
import showToast from "../../services/toastService";

const DEALER_PREFERENCES = [
  { category: "RESIDENTIAL", label: "Residential", types: ["RENT", "SALE" , "PURCHASE"] },
  { category: "COMMERCIAL",  label: "Commercial",  types: ["LEASE", "SALE"] },
  { category: "INDUSTRIAL",  label: "Industrial",  types: ["LEASE", "SALE"] },
];

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "USER",
    mobileNumber: "",
    companyName: "",
  });

  const [preferences, setPreferences] = useState({
    RESIDENTIAL: [],
    COMMERCIAL: [],
    INDUSTRIAL: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleAccountTypeToggle = (e) => {
    const isDealer = e.target.checked;
    setFormData({ ...formData, accountType: isDealer ? "DEALER" : "USER", companyName: "" });
    setPreferences({ RESIDENTIAL: [], COMMERCIAL: [], INDUSTRIAL: [] });
    setErrors({});
  };

  const handlePreferenceTypeToggle = (category, type) => {
    setPreferences((prev) => {
      const current = prev[category];
      const updated = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      return { ...prev, [category]: updated };
    });
    if (errors.preferences) setErrors({ ...errors, preferences: "" });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    }

    if (formData.accountType === "DEALER") {
      if (!formData.companyName.trim())
        newErrors.companyName = "Company name is required";

      const hasAtLeastOne = Object.values(preferences).some((t) => t.length > 0);
      if (!hasAtLeastOne)
        newErrors.preferences = "Please select at least one property type preference";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    const payload = { ...formData };

    if (formData.accountType === "DEALER") {
      payload.preferences = Object.entries(preferences)
        .filter(([, types]) => types.length > 0)
        .map(([category, types]) => ({ category, types }));
    } else {
      delete payload.companyName;
    }

    return payload;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await api.post("/auth/register", buildPayload());
      showToast.success("OTP sent to your email");
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      showToast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const isDealer = formData.accountType === "DEALER";

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <h2 className={styles.title}>Create Account</h2>

        {/* Full Name */}
        <input
          name="name"
          placeholder="Full Name"
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className={styles.errorText}>{errors.name}</p>}

        {/* Email */}
        <input
          name="email"
          placeholder="Email"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}

        {/* Password */}
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            value={formData.password}
            onChange={handleChange}
          />
          <span className={styles.eyeIcon} onClick={togglePassword}>
            <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
          </span>
        </div>
        {errors.password && <p className={styles.errorText}>{errors.password}</p>}

        {/* Mobile */}
        <input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          className={`${styles.input} ${errors.mobileNumber ? styles.inputError : ""}`}
          value={formData.mobileNumber}
          onChange={handleChange}
        />
        {errors.mobileNumber && <p className={styles.errorText}>{errors.mobileNumber}</p>}

        {/* Dealer Toggle */}
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isDealer}
              onChange={handleAccountTypeToggle}
            />
            Are you a dealer?
          </label>
        </div>

        {/* Dealer Only Fields — shown only when dealer is checked */}
        {isDealer && (
          <>
            {/* Company Name */}
            <input
              name="companyName"
              placeholder="Company Name"
              className={`${styles.input} ${errors.companyName ? styles.inputError : ""}`}
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && <p className={styles.errorText}>{errors.companyName}</p>}

            {/* Preferences */}
            <div className={styles.preferencesSection}>
              <p className={styles.preferencesTitle}>Select Your Property Preferences</p>

              {DEALER_PREFERENCES.map(({ category, label, types }) => (
                <div key={category} className={styles.preferenceCategory}>
                  <p className={styles.categoryLabel}>{label}</p>
                  <div className={styles.typeCheckboxes}>
                    {types.map((type) => (
                      <label key={type} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={preferences[category].includes(type)}
                          onChange={() => handlePreferenceTypeToggle(category, type)}
                        />
                        {type.charAt(0) + type.slice(1).toLowerCase()}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {errors.preferences && (
                <p className={styles.errorText}>{errors.preferences}</p>
              )}
            </div>
          </>
        )}

        <button
          className={styles.signupBtn}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Sign Up"}
        </button>

        <div className={styles.footer}>
          Already have an Account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
  );
}

export default Register;