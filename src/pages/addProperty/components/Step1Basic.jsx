import common from "./Common.module.css";
import pageStyles from "../AddProperty.module.css";

const Step1Basic = ({ data, update, next }) => {
  const handleChange = (e) => {
    update({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* User Type */}
      <h3 className={pageStyles.sectionTitle}>You are</h3>

      <div className={common.radioGroup}>
        <label>
          <input
            type="radio"
            name="userType"
            value="OWNER"
            checked={data.userType === "OWNER"}
            onChange={handleChange}
          />
          Owner
        </label>

        <label>
          <input
            type="radio"
            name="userType"
            value="DEALER"
            checked={data.userType === "DEALER"}
            onChange={handleChange}
          />
          Dealer / Broker
        </label>

        <label>
          <input
            type="radio"
            name="userType"
            value="BUILDER"
            checked={data.userType === "BUILDER"}
            onChange={handleChange}
          />
          Builder
        </label>
      </div>

      {/* Sell / Rent */}
      <h3 className={pageStyles.sectionTitle}>I want to</h3>

      <div className={common.radioGroup}>
        <label>
          <input
            type="radio"
            name="listingType"
            value="SELL"
            checked={data.listingType === "SELL"}
            onChange={handleChange}
          />
          Sell
        </label>

        <label>
          <input
            type="radio"
            name="listingType"
            value="RENT"
            checked={data.listingType === "RENT"}
            onChange={handleChange}
          />
          Rent / Lease
        </label>
      </div>

      {/* Property Type */}
      <h3 className={pageStyles.sectionTitle}>Property Type</h3>

      <div className={common.radioGroup}>
        <label>
          <input
            type="radio"
            name="propertyType"
            value="RESIDENTIAL"
            checked={data.propertyType === "RESIDENTIAL"}
            onChange={handleChange}
          />
          Residential
        </label>

        <label>
          <input
            type="radio"
            name="propertyType"
            value="COMMERCIAL"
            checked={data.propertyType === "COMMERCIAL"}
            onChange={handleChange}
          />
          Commercial
        </label>

        <label>
          <input
            type="radio"
            name="propertyType"
            value="LAND"
            checked={data.propertyType === "LAND"}
            onChange={handleChange}
          />
          Land / Plot
        </label>
      </div>

      {/* Category based on property type */}
      {data.propertyType === "RESIDENTIAL" && (
        <>
          <h3 className={pageStyles.sectionTitle}>
            Residential Category
          </h3>

          <select
            name="category"
            className={common.select}
            value={data.category}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Flat / Apartment</option>
            <option>House / Villa</option>
            <option>Builder Floor</option>
            <option>Studio Apartment</option>
          </select>

          <input
            name="bhk"
            placeholder="BHK"
            className={common.input}
            value={data.bhk}
            onChange={handleChange}
          />

          <input
            name="area"
            placeholder="Area (sqft)"
            className={common.input}
            value={data.area}
            onChange={handleChange}
          />
        </>
      )}

      {data.propertyType === "COMMERCIAL" && (
        <>
          <h3 className={pageStyles.sectionTitle}>
            Commercial Category
          </h3>

          <select
            name="category"
            className={common.select}
            value={data.category}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Office Space</option>
            <option>Shop / Showroom</option>
            <option>Warehouse</option>
          </select>

          <input
            name="area"
            placeholder="Area (sqft)"
            className={common.input}
            value={data.area}
            onChange={handleChange}
          />
        </>
      )}

      {/* LAND */}
      {data.propertyType === "LAND" && (
        <input
          name="area"
          placeholder="Plot Area (sqft)"
          className={common.input}
          value={data.area}
          onChange={handleChange}
        />
      )}

      <div className={common.buttonGroup}>
        <button className={common.primaryBtn} onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Basic;