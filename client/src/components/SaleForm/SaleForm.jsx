import { useState } from "react";
import axiosClient from "../../api/axiosClient";
import styles from "./SaleForm.module.css";
import petsImage from "../../assets/images/pets.svg";

const SaleForm = () => {
  const [values, setValues] = useState({ name: "", phone: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = ({ target: { value, name } }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post("/sale/send", values);
      setIsSubmitted(true);
      setValues({ name: "", phone: "", email: "" });
    } catch {
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <section className={styles.sale}>
      <h2 className={styles.title}>5% off on the first order</h2>

      <div className={styles.mainContent}>
        <div className={styles.imageContainer}>
          <img src={petsImage} alt="Pets" className={styles.petsImage} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone number"
            value={values.phone}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className={`${styles.submitBtn} ${isSubmitted ? styles.submitted : ""}`}
            disabled={isSubmitted}
          >
            {isSubmitted ? "Request Submitted" : "Get a discount"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SaleForm;
