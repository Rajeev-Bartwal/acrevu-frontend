import { useEffect, useState } from "react";
import styles from "./Buy.module.css";
import { getAllProperties } from "../../services/propertyService";
import PropertyListGrid from "../../components/property/PropertyListGrid";

// Default fallback properties
const defaultProperties = [
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

const Buy = () => {
  const [properties, setProperties] = useState(defaultProperties);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 9;

  // page change hone pe re-fetch
  useEffect(() => {
    fetchProperties();
  }, [page]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await getAllProperties(page, PAGE_SIZE);

      // Agar backend paginated response deta hai (Spring Page<T>)
      console.log(res.data.data.totalPages)
      if (res.data?.data?.content) {
        const data = res.data.data.content;
        if (data.length > 0) {
          setProperties(data);
          setTotalPages(res.data?.data?.totalPages);
        }
      } else {
        const data = res.data?.data?.content || [];
        if (data.length > 0) {
          setProperties(data);
        }
      }
    } catch (error) {
      console.error("Error fetching properties", error);
      // fallback to defaultProperties
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
    <div className={styles.pageContainer}>
      <div className={styles.propertySection}>
        <div className={styles.sectionHeader}>
          <h2>Buy Properties</h2>
          {!loading && properties.length > 0 && (
            <span className={styles.resultCount}>
              {totalPages > 0
                ? `Page ${page + 1} of ${totalPages}`
                : `${properties.length} Properties`}
            </span>
          )}
        </div>

        <PropertyListGrid
          properties={properties}
          loading={loading}
          pagination={
            totalPages > 1
              ? { page, totalPages, onPageChange: (p) => setPage(p) }
              : null
          }
          emptyMessage="No properties found."
          savedIds={savedIds}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default Buy;
