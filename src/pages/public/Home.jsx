import { Link } from "react-router-dom";
import PropertyCard from "../../components/property/PropertyCard";
import styles from "./Home.module.css";

function Home() {
  const featuredProjects = [
    {
      id: 1,
      name: "Godrej Woods",
      location: "Sector 43, Noida",
      price: "₹1.2 Cr - ₹2.5 Cr",
      dealer: "Godrej Properties",
      area: "1250",
      bhk: "3",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: 2,
      name: "DLF The Camellias",
      location: "Gurgaon Sector 42",
      price: "₹8 Cr onwards",
      dealer: "DLF Ltd",
      area: "3500",
      bhk: "4",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    },
    {
      id: 3,
      name: "Prestige City",
      location: "Indirapuram, Ghaziabad",
      price: "₹75 Lac - ₹1.5 Cr",
      dealer: "Prestige Group",
      area: "1100",
      bhk: "2",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
  ];

  return (
    <div className={styles.homeContainer}>
      {/* Hero */}
      <div className={styles.hero}>
        <h1>Find Your Dream Property</h1>
        <p>Buy, Rent & Sell properties across India</p>

        <div className={styles.searchBox}>
          <input type="text" placeholder="Search by city, locality..." />
          <button>Search</button>
        </div>

        {/* Buy Navigation */}
        <Link to="/buy" className={styles.buyBtn}>
          Browse Properties
        </Link>
      </div>

      {/* Featured Projects */}
      <div className={styles.featuredGrid}>
        {featuredProjects.map((project) => (
          <PropertyCard
            key={project.id}
            image={project.image}
            name={project.name}
            location={project.location}
            price={project.price}
            area={project.area}
            bhk={project.bhk}
            dealer={project.dealer}
            isSaved={false}
            onSave={() => console.log("Saved", project.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
