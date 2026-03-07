import common from "./Common.module.css";
import pageStyles from "../AddProperty.module.css";

const Step1Basic = ({ data, update, next }) => {
  const handleChange = (e) => {
    update({ [e.target.name]: e.target.value });
  };

  const areaUnitSelector = (
    <div className={common.areaRow}>
      <input
        name="area"
        placeholder="Area"
        className={common.input}
        value={data.area}
        onChange={handleChange}
      />
      <select
        name="areaUnit"
        className={common.select}
        value={data.areaUnit || "sqft"}
        onChange={handleChange}
      >
        <option value="sqft">Sq. Feet</option>
        <option value="sqyard">Sq. Yard</option>
        <option value="sqmeter">Sq. Meter</option>
      </select>
    </div>
  );

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
      </div>

      {/* Listing Type */}
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
            value="INDUSTRIAL"
            checked={data.propertyType === "INDUSTRIAL"}
            onChange={handleChange}
          />
          Industrial
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

      {/* RESIDENTIAL */}
      {data.propertyType === "RESIDENTIAL" && (
        <>
          <h3 className={pageStyles.sectionTitle}>Residential Category</h3>
          <select
            name="category"
            className={common.select}
            value={data.category}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Flat / Apartment</option>
            <option>House / Villa</option>
            <option>Serviced Apartment</option>
            <option>Farm House</option>
            <option>Builder Floor</option>
            <option>1RK / Studio Apartment</option>
            <option>Plot / Land</option>
          </select>
          <input
            name="bhk"
            placeholder="BHK"
            className={common.input}
            value={data.bhk}
            onChange={handleChange}
          />
          {areaUnitSelector}
        </>
      )}

      {/* COMMERCIAL */}
      {data.propertyType === "COMMERCIAL" && (
        <>
          <h3 className={pageStyles.sectionTitle}>Commercial Category</h3>
          <select
            name="category"
            className={common.select}
            value={data.category}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Ready to Move Offices</option>
            <option>Bare Shell Offices</option>
            <option>Warehouse</option>
            <option>Plot / Land</option>
            <option>Shops & Retail</option>
            <option>Cold Storage</option>
            <option>Pre-leased Spaces</option>
            <option>Restaurants</option>
            <option>SCO Plots</option>
            <option>Food Court</option>
            <option>Multiplex</option>
            <option>Co-working</option>
          </select>
          {areaUnitSelector}
        </>
      )}

      {/* INDUSTRIAL */}
      {data.propertyType === "INDUSTRIAL" && (
        <>
          <h3 className={pageStyles.sectionTitle}>Industrial Category</h3>
          <select
            name="category"
            className={common.select}
            value={data.category}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Warehouse</option>
            <option>Factory</option>
            <option>Hotel / Resorts</option>
            <option>Manufacturing</option>
            <option>Guest-Houses / Banquette-Halls</option>
            <option>Pre-leased Spaces</option>
            <option>Restaurants</option>
            <option>SCO Plots</option>
            <option>Food Court</option>
            <option>Multiplex</option>
            <option>Co-working</option>
            <option>Others</option>
          </select>
          {areaUnitSelector}
        </>
      )}

      {/* LAND */}
      {data.propertyType === "LAND" && (
        <>
          <h3 className={pageStyles.sectionTitle}>Land Category</h3>
          <select
            name="category"
            className={common.select}
            value={data.category}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Agricultural</option>
            <option>Abadi</option>
            <option>Commercial</option>
            <option>School / Hospital</option>
            <option>IT / ITES / Institutional</option>
            <option>Factory</option>
          </select>
          {areaUnitSelector}
        </>
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
