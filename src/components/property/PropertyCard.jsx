import styles from "./PropertyCard.module.css";
import { Heart } from "lucide-react";

const PropertyCard = ({
  image,
  price,
  location,
  area,
  bhk,
  dealerName,
  isSaved,
  onSave,
}) => {
  return (
    <div className={styles.card}>
      {/* Image Section */}
      <div className={styles.imageContainer}>
        <img src={image} alt="property" />

        <button
          onClick={(e) => {
            e.stopPropagation(); // future card click ke liye safe
            onSave();
          }}
          className={styles.saveBtn}
        >
          <Heart
            size={18}
            className={isSaved ? styles.saved : styles.notSaved}
          />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.price}>₹ {price}</div>

        <div className={styles.location}>{location}</div>

        <div className={styles.infoRow}>
          <span>{area} sq.ft</span>
          <span>{bhk} BHK</span>
        </div>

        <div className={styles.dealer}>Dealer: {dealerName}</div>
      </div>
    </div>
  );
};

export default PropertyCard;
