import { Link } from "react-router-dom";
import styles from "./PromoSection.module.css";

const PromoSection = () => {
  return (
    <section className={styles.promo}>
      <div className={styles.container}>
        <h1 className={styles.title}>Amazing Discounts on Pets Products!</h1>
        <Link to="/sales" className={styles.button}>
          Check out
        </Link>
      </div>
    </section>
  );
};

export default PromoSection;
