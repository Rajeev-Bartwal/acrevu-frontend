import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div>
          <h4>Company</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Contact</p>
        </div>

        <div>
          <h4>Explore</h4>
          <p>Buy Property</p>
          <p>Rent Property</p>
          <p>Post Property</p>
        </div>

        <div>
          <h4>Legal</h4>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
        </div>

        <div>
          <h4>AcreVu</h4>
          <p>Your trusted real estate platform.</p>
        </div>

      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} AcreVu. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
