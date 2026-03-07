// Home.jsx - updated to use PropertyListGrid
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import PropertyListGrid from "../../components/property/PropertyListGrid";
import { getAllProperties } from "../../services/propertyService";
import showToast from "../../services/toastService";

const defaultFeaturedProperties = [
  {
    id: 101,
    listingType: "SELL",
    price: "8500000",
    rent: null,
    locality: "Dwarka Sector 10",
    city: "Delhi",
    area: "1200",
    bhk: "3",
    category: "Flat / Apartment",
    userType: "DEALER",
    contactName: "Sharma Properties",
  },
  {
    id: 102,
    listingType: "SELL",
    price: "5500000",
    rent: null,
    locality: "Rohini Sector 5",
    city: "Delhi",
    area: "900",
    bhk: "2",
    userType: "DEALER",
    category: "Flat / Apartment",
    contactName: "Gupta Realtors",
  },
  {
    id: 103,
    listingType: "RENT",
    price: "",
    rent: "25000",
    locality: "Sector 43",
    city: "Gurgaon",
    area: "1100",
    bhk: "2",
    userType: "OWNER",
    category: "Flat / Apartment",
    contactName: "Home Deal",
  },
];

function Home() {
  const [featuredProjects, setFeaturedProjects] = useState(
    defaultFeaturedProperties,
  );
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?city=${searchQuery}`);
    }
  };

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const handleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const res = await getAllProperties();
      const properties = res.data?.data?.content || [];
      if (properties.length > 0) {
        setFeaturedProjects(properties.slice(0, 3));
      }
    } catch (error) {
      showToast.error("Error fetching home properties");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Find Your <span className={styles.highlight}>Dream Property</span>
          </h1>
          <p>Buy, Rent & Sell properties across India</p>

          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search by city, locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className={styles.heroBtns}>
            <Link to="/buy" className={styles.buyBtn}>
              Buy
            </Link>
            <Link to="/rent" className={styles.rentBtn}>
              Rent
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className={styles.featuredSection}>
        <div className={styles.featuredHeader}>
          <h2>Featured Properties</h2>
          <Link to="/buy" className={styles.viewAll}>
            View All →
          </Link>
        </div>

        {/* PropertyListGrid — pagination=null so no pagination on home */}
        <PropertyListGrid
          properties={featuredProjects}
          loading={loading}
          pagination={null}
          emptyMessage="No featured properties available."
          savedIds={savedIds}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

export default Home;
