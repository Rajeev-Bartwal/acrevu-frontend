import { useEffect, useState } from "react";
import PropertyCard from "../../components/property/PropertyCard";
import styles from "./Buy.module.css";
import { getAllProperties } from "../../services/propertyService";

const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await getAllProperties();
      console.log("Fetched Properties:", res.data.data);
      setProperties(res.data.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className={styles.container}>
      <h2>Buy Properties</h2>

      {loading && <p>Fetching properties...</p>}

      {!loading && properties.length === 0 && <h4>No properties available.</h4>}

      {!loading && properties.length > 0 && (
        <div className={styles.grid}>
          {properties.map((property) => (
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
              bhk={property.bhk ? `${property.bhk} BHK` : property.category}
              dealerName={property.contactName}
              isSaved={savedIds.includes(property.id)}
              onSave={() => handleSave(property.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Buy;
