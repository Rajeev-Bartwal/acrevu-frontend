import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, logout, isLoggedIn } from "../../services/authService";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      setUser(getUser());
    }
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        Acre<span>Vu</span>
      </div>

      <nav className={styles.nav}>
        <span>Buy</span>
        <span>Rent</span>
        <span>Commercial</span>
        <span>PG</span>
      </nav>

      <div className={styles.actions}>
        <button className={styles.postBtn}>Post Property</button>

        {user ? (
          <div className={styles.profileSection}>
            <div className={styles.profileIcon}>
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <span className={styles.logout} onClick={handleLogout}>
              Logout
            </span>
          </div>
        ) : (
          <span
            className={styles.login}
            onClick={() => navigate("/login")}
          >
            Login / Register
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
