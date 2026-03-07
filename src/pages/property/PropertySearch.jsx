import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyListGrid from "../../components/property/PropertyListGrid";
import styles from "./PropertySearch.module.css";
import { getAllPropertiesByFilters } from "../../services/propertyService";

// ✅ Fixed — match exactly what backend/Step1Basic saves
const PROPERTY_TYPES = ["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "LAND"];

// Category options per propertyType — same as Step1Basic
const CATEGORY_OPTIONS = {
  RESIDENTIAL: [
    "Flat / Apartment",
    "House / Villa",
    "Serviced Apartment",
    "Farm House",
    "Builder Floor",
    "1RK / Studio Apartment",
    "Plot / Land",
  ],
  COMMERCIAL: [
    "Ready to Move Offices",
    "Bare Shell Offices",
    "Warehouse",
    "Plot / Land",
    "Shops & Retail",
    "Cold Storage",
    "Pre-leased Spaces",
    "Restaurants",
    "SCO Plots",
    "Co-working",
  ],
  INDUSTRIAL: [
    "Warehouse",
    "Factory",
    "Hotel / Resorts",
    "Manufacturing",
    "Guest-Houses / Banquette-Halls",
    "Pre-leased Spaces",
    "Others",
  ],
  LAND: [
    "Agricultural",
    "Abadi",
    "Commercial",
    "School / Hospital",
    "IT / ITES / Institutional",
    "Factory",
  ],
};

const BHK_OPTIONS      = ["1", "2", "3", "4", "5"];
const FURNISHING_OPTIONS = ["Furnished", "Semi-Furnished", "Unfurnished"];
const CITIES = ["Delhi", "Noida", "Gurgaon", "Ghaziabad", "Mumbai", "Bangalore", "Pune", "Hyderabad"];

// ✅ Fixed — match backend enum values
const LISTING_TYPES = ["RENT", "SELL", "PG"];

const PAGE_SIZE = 9;

function formatPrice(val) {
  if (!val) return "";
  const n = parseInt(val);
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(0)} L`;
  return `₹${n.toLocaleString()}`;
}

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.filterSection}>
      <div className={styles.filterSectionHeader} onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span>{open ? "▲" : "▼"}</span>
      </div>
      {open && <div className={styles.filterSectionBody}>{children}</div>}
    </div>
  );
}

function ChipGroup({ options, selected, onToggle }) {
  return (
    <div className={styles.chipGroup}>
      {options.map((opt) => (
        <div
          key={opt}
          className={`${styles.chip} ${selected === opt ? styles.chipActive : ""}`}
          onClick={() => onToggle(opt)}
        >
          {opt}
        </div>
      ))}
    </div>
  );
}

function PropertySearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    city:         searchParams.get("city")         || "",
    listingType:  searchParams.get("listingType")  || "",
    propertyType: searchParams.get("propertyType") || "",
    category:     searchParams.get("category")     || "", // ✅ added
    bhk:          searchParams.get("bhk")          || "",
    minPrice:     searchParams.get("minPrice")      || "",
    maxPrice:     searchParams.get("maxPrice")      || "",
    minArea:      searchParams.get("minArea")       || "",
    maxArea:      searchParams.get("maxArea")       || "",
    furnishing:   searchParams.get("furnishing")    || "",
    bedrooms:     searchParams.get("bedrooms")      || "",
    bathrooms:    searchParams.get("bathrooms")     || "",
  });

  const [properties,     setProperties]     = useState([]);
  const [loading,        setLoading]        = useState(false);
  const [page,           setPage]           = useState(0);
  const [totalPages,     setTotalPages]     = useState(0);
  const [totalElements,  setTotalElements]  = useState(0);
  const [savedIds,       setSavedIds]       = useState([]);

  const fetchProperties = useCallback(async (f, pg) => {
    setLoading(true);
    try {
      const res  = await getAllPropertiesByFilters(f, pg, PAGE_SIZE);
      const data = res.data;
      setProperties(data.content       || []);
      setTotalPages(data.totalPages    || 0);
      setTotalElements(data.totalElements || 0);
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProperties(filters, page); }, [filters, page]);

  useEffect(() => {
    const params = {};
    Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v; });
    setSearchParams(params);
  }, [filters]);

  const setFilter = (key, val) => {
    setPage(0);
    // ✅ When propertyType changes, reset category
    if (key === "propertyType") {
      setFilters((f) => ({ ...f, propertyType: f.propertyType === val ? "" : val, category: "" }));
      return;
    }
    setFilters((f) => ({ ...f, [key]: f[key] === val ? "" : val }));
  };

  const setField = (key, val) => {
    setPage(0);
    setFilters((f) => ({ ...f, [key]: val }));
  };

  const resetFilters = () => {
    setPage(0);
    setFilters({
      city: "", listingType: "", propertyType: "", category: "",
      bhk: "", minPrice: "", maxPrice: "", minArea: "", maxArea: "",
      furnishing: "", bedrooms: "", bathrooms: "",
    });
  };

  const handleSave = (id) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className={styles.page}>
      <div className={styles.layout}>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarTitle}>
              Filters
              {activeCount > 0 && <span className={styles.badge}>{activeCount}</span>}
            </span>
            {activeCount > 0 && (
              <span className={styles.clearAll} onClick={resetFilters}>Clear All</span>
            )}
          </div>

          <FilterSection title="CITY">
            <select value={filters.city} onChange={(e) => setField("city", e.target.value)} className={styles.select}>
              <option value="">All Cities</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FilterSection>

          <FilterSection title="LOOKING FOR">
            <ChipGroup
              options={LISTING_TYPES}
              selected={filters.listingType}
              onToggle={(val) => setFilter("listingType", val)}
            />
          </FilterSection>

          <FilterSection title="PROPERTY TYPE">
            <ChipGroup
              options={PROPERTY_TYPES}
              selected={filters.propertyType}
              onToggle={(val) => setFilter("propertyType", val)}
            />
          </FilterSection>

          {/* ✅ Category — only show when propertyType is selected */}
          {filters.propertyType && CATEGORY_OPTIONS[filters.propertyType] && (
            <FilterSection title="CATEGORY">
              <select
                value={filters.category}
                onChange={(e) => setField("category", e.target.value)}
                className={styles.select}
              >
                <option value="">All Categories</option>
                {CATEGORY_OPTIONS[filters.propertyType].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </FilterSection>
          )}

          <FilterSection title="BHK">
            <ChipGroup
              options={BHK_OPTIONS}
              selected={filters.bhk}
              onToggle={(val) => setFilter("bhk", val)}
            />
          </FilterSection>

          <FilterSection title="PRICE RANGE">
            <div className={styles.rangeRow}>
              <input type="number" placeholder="Min (₹)" value={filters.minPrice}
                onChange={(e) => setField("minPrice", e.target.value)} className={styles.rangeInput} />
              <span className={styles.rangeSep}>–</span>
              <input type="number" placeholder="Max (₹)" value={filters.maxPrice}
                onChange={(e) => setField("maxPrice", e.target.value)} className={styles.rangeInput} />
            </div>
            {(filters.minPrice || filters.maxPrice) && (
              <div className={styles.priceLabel}>
                {filters.minPrice ? formatPrice(filters.minPrice) : "Any"} —{" "}
                {filters.maxPrice ? formatPrice(filters.maxPrice) : "Any"}
              </div>
            )}
          </FilterSection>

          <FilterSection title="AREA (sqft)">
            <div className={styles.rangeRow}>
              <input type="number" placeholder="Min" value={filters.minArea}
                onChange={(e) => setField("minArea", e.target.value)} className={styles.rangeInput} />
              <span className={styles.rangeSep}>–</span>
              <input type="number" placeholder="Max" value={filters.maxArea}
                onChange={(e) => setField("maxArea", e.target.value)} className={styles.rangeInput} />
            </div>
          </FilterSection>

          <FilterSection title="FURNISHING">
            <ChipGroup
              options={FURNISHING_OPTIONS}
              selected={filters.furnishing}
              onToggle={(val) => setFilter("furnishing", val)}
            />
          </FilterSection>

          <FilterSection title="BEDROOMS" defaultOpen={false}>
            <ChipGroup options={["1","2","3","4","5"]} selected={filters.bedrooms}
              onToggle={(val) => setFilter("bedrooms", val)} />
          </FilterSection>

          <FilterSection title="BATHROOMS" defaultOpen={false}>
            <ChipGroup options={["1","2","3","4"]} selected={filters.bathrooms}
              onToggle={(val) => setFilter("bathrooms", val)} />
          </FilterSection>
        </aside>

        {/* ── Results ── */}
        <main className={styles.results}>
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              {loading ? "Loading..." : `${totalElements} Properties Found`}
              {filters.city && !loading && (
                <span className={styles.cityHighlight}> in {filters.city}</span>
              )}
            </span>
          </div>

          {activeCount > 0 && (
            <div className={styles.activeTags}>
              {Object.entries(filters).map(([key, val]) =>
                val ? (
                  <span key={key} className={styles.tag}>
                    {val}
                    <span className={styles.tagRemove} onClick={() => setField(key, "")}>×</span>
                  </span>
                ) : null
              )}
            </div>
          )}

          <PropertyListGrid
            properties={properties}
            loading={loading}
            pagination={
              totalPages > 1
                ? { page, totalPages, onPageChange: (p) => setPage(p) }
                : null
            }
            emptyMessage="No properties found. Try adjusting your filters."
            savedIds={savedIds}
            onSave={handleSave}
          />
        </main>
      </div>
    </div>
  );
}

export default PropertySearch;