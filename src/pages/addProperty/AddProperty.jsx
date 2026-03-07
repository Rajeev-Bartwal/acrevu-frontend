import React, { useState } from "react";
import styles from "./AddProperty.module.css";
import Step1Basic from "./components/Step1Basic";
import Step2LocationPrice from "./components/Step2LocationPrice";
import Step3DetailsContact from "./components/Step3DetailsAndContact";

const AddProperty = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    userType: "",
    listingType: "",
    propertyType: "",
    category: "",
    bhk: "",
    area: "",
    areaUnit: "sqft",
    floor: "",
    totalFloors: "",
    availability: "",
    propertyAge: "",

    city: "",
    locality: "",
    address: "",
    landmark: "",
    pincode: "",
    price: "",
    rent: "",
    deposit: "",
    availableFrom: "",

    bedrooms: "",
    bathrooms: "",
    balconies: "",
    furnishing: "",
    parking: "",
    amenities: [],
    description: "",
    contactName: "",
    mobile: "",
    email: "",
  });

  const updateData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.formContainer}>
        <div className={styles.stepHeader}>
          <h2>Add Property</h2>
          <div className={styles.subtitle}>
            Post your property and reach thousands of buyers & tenants
          </div>
          <div className={styles.stepIndicator}>Step {step} of 3</div>
        </div>

        {step === 1 && (
          <Step1Basic data={formData} update={updateData} next={next} />
        )}
        {step === 2 && (
          <Step2LocationPrice data={formData} update={updateData} next={next} prev={prev} />
        )}
        {step === 3 && (
          <Step3DetailsContact data={formData} update={updateData} prev={prev} />
        )}
      </div>
    </div>
  );
};

export default AddProperty;