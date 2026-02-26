import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../../components/property/PropertyCard";
import styles from "./Home.module.css";
import { getAllProperties } from "../../services/propertyService";

function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const res = await getAllProperties();
      console.log("Home Properties:", res.data);

      // Show only first 3 properties as featured
      const properties = res.data || [];
      setFeaturedProjects(properties.slice(0, 3));
    } catch (error) {
      console.error("Error fetching home properties", error);
      setFeaturedProjects([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1>Find Your Dream Property</h1>
        <p>Buy, Rent & Sell properties across India</p>

        <div className={styles.searchBox}>
          <input type="text" placeholder="Search by city, locality..." />
          <button>Search</button>
        </div>

        <Link to="/buy" className={styles.buyBtn}>
          Browse Properties
        </Link>
      </div>

      {/* Featured Section */}
      <h2 className={styles.sectionTitle}>Featured Properties</h2>

      {/* Loading */}
      {loading && <p>Fetching properties...</p>}

      {/* Empty State */}
      {!loading && featuredProjects.length === 0 && (
        <p>No properties available.</p>
      )}

      {/* Properties Grid */}
      {!loading && featuredProjects.length > 0 && (
        <div className={styles.featuredGrid}>
          {featuredProjects.map((property) => (
            <PropertyCard
              key={property.id}
              image="https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
              price={
                property.listingType === "RENT"
                  ? `₹${property.rent}/month`
                  : `₹${property.price}`
              }
              location={`${property.locality}, ${property.city}`}
              area={property.area}
              bhk={
                property.bhk
                  ? `${property.bhk} BHK`
                  : property.category
              }
              dealerName={property.contactName}
              isSaved={false}
              onSave={() => console.log("Saved", property.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;