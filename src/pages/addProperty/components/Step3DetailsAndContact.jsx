import common from "./Common.module.css";
import pageStyles from "../AddProperty.module.css";
import showToast from "../../../services/toastService";
import { addProperty } from "../../../services/propertyService";
import { Navigate, useNavigate } from "react-router-dom";
import { AMENITIES } from "../../../utils/AppConstents";

const Step3DetailsContact = ({ data, update, prev }) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    update({ [e.target.name]: e.target.value });
  };

  const toggleAmenity = (item) => {
    const updated = data.amenities.includes(item)
      ? data.amenities.filter((a) => a !== item)
      : [...data.amenities, item];

    update({ amenities: updated });
  };

  const handleSubmit = async () => {
    console.log("Final Property Data:", data);

    try {
      const payload = {
        ...data,
        amenities: Array.isArray(data.amenities)
          ? data.amenities.join(",")
          : data.amenities,
      };

      console.log("Sending:", payload);

      const res = await addProperty(payload);

      // 🔹 Print full axios response
      console.log("Full Response:", res);

      // 🔹 Print only backend data
      console.log("Response Data:", res.data);

      showToast.success("Property posted");

      navigate("/buy");
    } catch (err) {
      console.log("Full Error:", err);
      console.log("Error Response:", err.response);
      console.log("Error Data:", err.response?.data);

      showToast.error(err.response?.data?.message || "Property Error");
    }
  };

  return (
    <div>
      {/* Residential Configuration */}
      {data.propertyType === "RESIDENTIAL" && (
        <>
          <h3 className={pageStyles.sectionTitle}>Property Configuration</h3>

          <input
            name="bedrooms"
            placeholder="Bedrooms"
            className={common.input}
            value={data.bedrooms}
            onChange={handleChange}
          />

          <input
            name="bathrooms"
            placeholder="Bathrooms"
            className={common.input}
            value={data.bathrooms}
            onChange={handleChange}
          />

          <input
            name="balconies"
            placeholder="Balconies"
            className={common.input}
            value={data.balconies}
            onChange={handleChange}
          />

          <select
            name="furnishing"
            className={common.select}
            value={data.furnishing}
            onChange={handleChange}
          >
            <option value="">Furnishing</option>
            <option>Unfurnished</option>
            <option>Semi-Furnished</option>
            <option>Fully Furnished</option>
          </select>
        </>
      )}

      {/* Amenities */}
      <h3 className={pageStyles.sectionTitle}>Amenities</h3>

      <div className={common.checkboxGroup}>
        {AMENITIES.map((item) => (
          <label key={item} className={common.checkboxItem}>
            <input
              type="checkbox"
              checked={data.amenities.includes(item)}
              onChange={() => toggleAmenity(item)}
            />
            {item}
          </label>
        ))}
      </div>

      {/* Description */}
      <h3 className={pageStyles.sectionTitle}>Description</h3>

      <textarea
        name="description"
        placeholder="Property Description"
        className={common.textarea}
        value={data.description}
        onChange={handleChange}
      />

      {/* Contact */}
      <h3 className={pageStyles.sectionTitle}>Contact Details</h3>

      <input
        name="contactName"
        placeholder="Contact Name"
        className={common.input}
        value={data.contactName}
        onChange={handleChange}
      />

      <input
        name="mobile"
        placeholder="Mobile Number"
        className={common.input}
        value={data.mobile}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        className={common.input}
        value={data.email}
        onChange={handleChange}
      />

      {/* Buttons */}
      <div className={common.buttonGroup}>
        <button className={common.secondaryBtn} onClick={prev}>
          Back
        </button>
        <button className={common.primaryBtn} onClick={handleSubmit}>
          Submit Property
        </button>
      </div>
    </div>
  );
};

export default Step3DetailsContact;
