import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./register.module.css"; // same theme
import api from "../services/api";
import showToast from "../services/toastService";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      await api.post("/auth/verify-otp", { email, otp });
      showToast.success("OTP verified Successfully")
      navigate("/login");
    } catch (error) {
      alert(error.response?.data || "Invalid OTP");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <h2 className={styles.title}>Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className={styles.input}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className={styles.signupBtn} onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;
