import common from "./Common.module.css";
import pageStyles from "../AddProperty.module.css";

const Step2LocationPrice = ({ data, update, next, prev }) => {
  const handleChange = (e) => {
    update({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Location */}
      <h3 className={pageStyles.sectionTitle}>Location Details</h3>

      <input
        name="city"
        placeholder="City"
        className={common.input}
        value={data.city}
        onChange={handleChange}
      />

      <input
        name="locality"
        placeholder="Locality / Area"
        className={common.input}
        value={data.locality}
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Full Address"
        className={common.input}
        value={data.address}
        onChange={handleChange}
      />

      <input
        name="pincode"
        placeholder="Pincode"
        className={common.input}
        value={data.pincode}
        onChange={handleChange}
      />

      {/* Floor (not for Land) */}
      {data.propertyType !== "LAND" && (
        <>
          <h3 className={pageStyles.sectionTitle}>Floor Details</h3>

          <input
            name="floor"
            placeholder="Property on Floor"
            className={common.input}
            value={data.floor}
            onChange={handleChange}
          />

          <input
            name="totalFloors"
            placeholder="Total Floors"
            className={common.input}
            value={data.totalFloors}
            onChange={handleChange}
          />
        </>
      )}

      {/* Price */}
      <h3 className={pageStyles.sectionTitle}>Price Details</h3>

      {data.listingType === "SELL" && (
        <input
          name="price"
          placeholder="Expected Price"
          className={common.input}
          value={data.price}
          onChange={handleChange}
        />
      )}

      {data.listingType === "RENT" && (
        <>
          <input
            name="rent"
            placeholder="Monthly Rent"
            className={common.input}
            value={data.rent}
            onChange={handleChange}
          />

          <input
            name="deposit"
            placeholder="Security Deposit"
            className={common.input}
            value={data.deposit}
            onChange={handleChange}
          />

          <input
            type="date"
            name="availableFrom"
            className={common.input}
            value={data.availableFrom || ""}
            onChange={handleChange}
          />
        </>
      )}

      {/* Buttons */}
      <div className={common.buttonGroup}>
        <button className={common.secondaryBtn} onClick={prev}>
          Back
        </button>
        <button className={common.primaryBtn} onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2LocationPrice;