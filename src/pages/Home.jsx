import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.hero}>
        <h1>Find Your Dream Property</h1>
        <p>Buy, Rent & Sell properties across India</p>

        <div className={styles.searchBox}>
          <input type="text" placeholder="Search by city, locality..." />
          <button>Search</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
