import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const links = {
    Company: ["About Us", "Careers", "Contact Us", "Blog", "Media Coverage"],
    Explore: ["Buy Property", "Rent Property", "Post Property", "New Projects", "Commercial"],
    "Property Types": ["Flats / Apartments", "Independent Houses", "Plots / Land", "PG / Hostels", "Office Space"],
    Legal: ["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Sitemap"],
  };

  const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Noida"];

  return (
    <>
      <footer style={{
        background: "#0f172a",
        color: "#e2e8f0",
        fontFamily: "'Segoe UI', sans-serif",
        /* ✅ FIX: footer gap — ensure no margin/padding leaks below */
        marginBottom: 0,
        paddingBottom: 0,
      }}>

        {/* Top Grid */}
        <div className="footer-grid" style={{
          maxWidth: 1200, margin: "0 auto", padding: "52px 48px 40px",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr",
          gap: 36,
        }}>

          {/* Brand */}
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 14, letterSpacing: "-0.5px" }}>
              Acre<span style={{ color: "#a78bfa" }}>Vu</span>
            </div>
            <p style={{ fontSize: 13.5, color: "#94a3b8", lineHeight: 1.75, marginBottom: 20, maxWidth: 230 }}>
              India's trusted platform to buy, sell, and rent properties. Find your dream home with AcreVu.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["𝕏", "in", "f", "▶"].map((icon, i) => (
                <div key={i}
                  style={{
                    width: 34, height: 34, borderRadius: 8, background: "#1e293b",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, cursor: "pointer", color: "#94a3b8", border: "1px solid #334155", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#6d28d9"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#6d28d9"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "#334155"; }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 style={{
                fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase",
                letterSpacing: "0.9px", marginBottom: 16,
                borderBottom: "1px solid #1e293b", paddingBottom: 10,
              }}>
                {heading}
              </h4>
              {items.map((item) => (
                <div key={item}
                  style={{ fontSize: 13, color: "#94a3b8", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Cities */}
        <div style={{ borderTop: "1px solid #1e293b", borderBottom: "1px solid #1e293b" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 48px" }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.8px", marginRight: 14 }}>
              Popular Cities:
            </span>
            {cities.map((city, i) => (
              <span key={city}>
                <span style={{ fontSize: 12.5, color: "#94a3b8", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}>
                  {city}
                </span>
                {i < cities.length - 1 && <span style={{ color: "#334155", margin: "0 8px" }}>|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 48px" }}
          className="footer-bottom">
          <span style={{ fontSize: 12.5, color: "#475569" }}>
            © {new Date().getFullYear()} AcreVu Technologies Pvt. Ltd. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Use", "Feedback"].map((item) => (
              <span key={item}
                style={{ fontSize: 12, color: "#475569", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* ===== RESPONSIVE FOOTER ===== */

        /* Tablet */
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
            padding: 40px 32px 32px !important;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            padding: 32px 20px 24px !important;
            gap: 28px !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
            padding: 16px 20px !important;
          }
          footer > div:nth-child(2) {
            padding: 14px 20px !important;
          }
        }

        /* Very small */
        @media (max-width: 380px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default Footer;