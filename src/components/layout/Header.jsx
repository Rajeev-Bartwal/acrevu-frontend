import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, logout } from "../../services/authService";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateUser = () => setUser(getUser());
    updateUser();
    window.addEventListener("login", updateUser);
    window.addEventListener("logout", updateUser);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("login", updateUser);
      window.removeEventListener("logout", updateUser);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  const navItems = [
    { label: "Buy",          sub: ["Flats / Apartments", "Independent Houses", "Builder Floors", "Plots / Land", "New Projects"] },
    { label: "Rent",         sub: ["Flats / Apartments", "Independent Houses", "PG / Hostels", "Office Space", "Shop / Showroom"] },
    { label: "Commercial",   sub: ["Office Space", "Shop / Showroom", "Warehouse / Godown", "Industrial Land"] },
    { label: "PG",           sub: ["Boys PG", "Girls PG", "Co-living"] },
    { label: "New Projects", sub: [] },
  ];

  return (
    <>
      <header style={{
        height: 64,
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 48px",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.07)" : "none",
        transition: "box-shadow 0.3s ease",
        fontFamily: "'Segoe UI', sans-serif",
      }}>

        {/* Logo */}
        <div
          onClick={() => { navigate("/"); setMenuOpen(false); }}
          style={{ fontSize: 24, fontWeight: 800, cursor: "pointer", color: "#222", letterSpacing: "-0.5px", flexShrink: 0 }}
        >
          Acre<span style={{ color: "#6d28d9" }}>Vu</span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 4, alignItems: "center", flex: 1, marginLeft: 24 }}
          className="acrevu-desktop-nav">
          {navItems.map((item) => (
            <div key={item.label}
              onMouseEnter={() => setActiveNav(item.label)}
              onMouseLeave={() => setActiveNav(null)}
              style={{ position: "relative" }}>
              <span style={{
                padding: "20px 14px", fontSize: 14, fontWeight: 600,
                color: activeNav === item.label ? "#6d28d9" : "#374151",
                cursor: "pointer", display: "inline-block",
                borderBottom: activeNav === item.label ? "2px solid #6d28d9" : "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s", whiteSpace: "nowrap",
              }}>
                {item.label}
                {item.sub.length > 0 && <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.6 }}>▼</span>}
              </span>
              {item.sub.length > 0 && activeNav === item.label && (
                <div style={{
                  position: "absolute", top: "100%", left: 0, background: "#fff",
                  border: "1px solid #e5e7eb", borderRadius: 8,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)", minWidth: 200, zIndex: 999,
                  overflow: "hidden", animation: "fadeDown 0.15s ease",
                }}>
                  {item.sub.map((s) => (
                    <div key={s}
                      style={{ padding: "10px 18px", fontSize: 13, color: "#374151", cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f3ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}
          className="acrevu-desktop-actions">
          <button
            onClick={() => navigate("/add-property")}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "#fff",
              border: "none", padding: "9px 18px", borderRadius: 6, cursor: "pointer",
              fontWeight: 600, fontSize: 13,
              boxShadow: "0 2px 8px rgba(109,40,217,0.3)", transition: "transform 0.15s, box-shadow 0.15s",
              display: "flex", alignItems: "center", gap: 6,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(109,40,217,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(109,40,217,0.3)"; }}
          >
            ＋ Post Property
            <span style={{ background: "#fbbf24", color: "#78350f", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4 }}>FREE</span>
          </button>

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>{user.name?.split(" ")[0]}</div>
                <span onClick={handleLogout}
                  style={{ fontSize: 11, color: "#9ca3af", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#6d28d9")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>
                  Logout
                </span>
              </div>
            </div>
          ) : (
            <span onClick={() => navigate("/login")}
              style={{
                fontSize: 14, fontWeight: 600, color: "#374151", cursor: "pointer",
                padding: "8px 14px", border: "1px solid #e5e7eb", borderRadius: 6, transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6d28d9"; e.currentTarget.style.color = "#6d28d9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}>
              Login / Register
            </span>
          )}
        </div>

        {/* Hamburger Button — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="acrevu-hamburger"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", flexDirection: "column", gap: 5 }}
          aria-label="Toggle menu"
        >
          <span style={{ width: 22, height: 2, background: menuOpen ? "#6d28d9" : "#374151", display: "block", transition: "all 0.3s",
            transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: 22, height: 2, background: menuOpen ? "#6d28d9" : "#374151", display: "block", transition: "all 0.3s",
            opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 22, height: 2, background: menuOpen ? "#6d28d9" : "#374151", display: "block", transition: "all 0.3s",
            transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className="acrevu-mobile-menu"
        style={{
          position: "fixed", top: 64, left: 0, right: 0,
          background: "#fff", borderBottom: "1px solid #e5e7eb",
          zIndex: 999, boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          display: "none", animation: "fadeDown 0.2s ease",
          fontFamily: "'Segoe UI', sans-serif",
          maxHeight: "calc(100vh - 64px)", overflowY: "auto",
        }}
      >
        {menuOpen && (
          <>
            {navItems.map((item) => (
              <div key={item.label}
                style={{ padding: "15px 24px", fontSize: 15, fontWeight: 600, color: "#374151",
                  borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6d28d9")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}>
                {item.label}
              </div>
            ))}
            <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                onClick={() => { navigate("/add-property"); setMenuOpen(false); }}
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "#fff",
                  border: "none", padding: 13, borderRadius: 6, cursor: "pointer",
                  fontWeight: 600, fontSize: 14, width: "100%",
                }}>
                ＋ Post Property FREE
              </button>
              {user ? (
                <button onClick={handleLogout}
                  style={{ background: "#f3f4f6", color: "#374151", border: "none", padding: 13,
                    borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: 14, width: "100%" }}>
                  Logout ({user.name?.split(" ")[0]})
                </button>
              ) : (
                <button onClick={() => { navigate("/login"); setMenuOpen(false); }}
                  style={{ background: "#f3f4f6", color: "#374151", border: "none", padding: 13,
                    borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: 14, width: "100%" }}>
                  Login / Register
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          header { padding: 0 20px !important; }
          .acrevu-desktop-nav  { display: none !important; }
          .acrevu-desktop-actions { display: none !important; }
          .acrevu-hamburger    { display: flex !important; }
          .acrevu-mobile-menu  { display: block !important; }
        }
      `}</style>
    </>
  );
}

export default Header;