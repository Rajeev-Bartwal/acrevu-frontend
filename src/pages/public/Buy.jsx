// src/pages/Buy.jsx
import { useEffect, useState } from "react";
import PropertyCard from "../../components/property/PropertyCard";
import styles from "./Buy.module.css"; // optional grid styling
import { Heart } from "lucide-react";



const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [savedIds, setSavedIds] = useState([]);

  // Dummy Data (replace with API later)
  useEffect(() => {
    const dummyProperties = [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
        price: "85,00,000",
        location: "Dwarka, Delhi",
        area: 1200,
        bhk: 3,
        dealerName: "Sharma Properties",
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
        price: "55,00,000",
        location: "Rohini, Delhi",
        area: 900,
        bhk: 2,
        dealerName: "Gupta Realtors",
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        price: "2,50,00,000",
        location: "Gurgaon",
        area: 3000,
        bhk: 4,
        dealerName: "Luxury Estates",
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        price: "35,00,000",
        location: "Noida",
        area: 550,
        bhk: 1,
        dealerName: "Home Deal",
      },
    ];

    setProperties(dummyProperties);
  }, []);

  // Save / Wishlist toggle
  const handleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className={styles.container}>
      <h2>Buy Properties</h2>

      <div className={styles.grid}>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            image={property.image}
            price={property.price}
            location={property.location}
            area={property.area}
            bhk={property.bhk}
            dealerName={property.dealerName}
            isSaved={savedIds.includes(property.id)}
            onSave={() => handleSave(property.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Buy;