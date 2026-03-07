// components/property/PropertyListGrid.jsx
// Generic reusable component - pass list + optional pagination meta

import PropertyCard from "./PropertyCard";
import styles from "./PropertyListGrid.module.css";

/**
 * PROPS:
 * - properties: []          → array of property objects (required)
 * - loading: bool           → show loading state
 * - pagination: object|null → { page, totalPages, onPageChange }
 *                             agar null/undefined → pagination nahi dikhega
 * - emptyMessage: string    → custom empty state message (optional)
 * - savedIds: []            → array of saved property ids (optional)
 * - onSave: fn(id)          → save toggle handler (optional)
 */

const PropertyListGrid = ({
  properties = [],
  loading = false,
  pagination = null,
  emptyMessage = "No properties found.",
  savedIds = [],
  onSave = () => {},
}) => {
  return (
    <div className={styles.wrapper}>
      {/* Loading State */}
      {loading && (
        <div className={styles.loadingGrid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && properties.length === 0 && (
        <div className={styles.emptyState}>
          <span>🏠</span>
          <p>{emptyMessage}</p>
        </div>
      )}

      {/* Property Grid */}
      {!loading && properties.length > 0 && (
        <div className={styles.grid}>
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              image="https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
              price={
                property.listingType === "RENT"
                  ? `${property.rent}/month`
                  : `${property.price}`
              }
              location={`${property.locality}, ${property.city}`}
              area={property.area}
              bhk={property.bhk ? `${property.bhk} BHK` : property.category}
              accType={property?.userType === "DEALER" ? "DEALER" : "OWNER"}
              dealerName={property.contactName}
              isSaved={savedIds.includes(property.id)}
              onSave={() => onSave(property.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination — sirf tab dikhega jab pagination prop pass hua ho */}
      {!loading && pagination && pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={pagination.page === 0}
            onClick={() => pagination.onPageChange(pagination.page - 1)}
          >
            ← Prev
          </button>

          <div className={styles.pageNumbers}>
            {[...Array(pagination.totalPages)].map((_, i) => (
              <button
                key={i}
                className={`${styles.pageNum} ${
                  pagination.page === i ? styles.active : ""
                }`}
                onClick={() => pagination.onPageChange(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            className={styles.pageBtn}
            disabled={pagination.page >= pagination.totalPages - 1}
            onClick={() => pagination.onPageChange(pagination.page + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyListGrid;