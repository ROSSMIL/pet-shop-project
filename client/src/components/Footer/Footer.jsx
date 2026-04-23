import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contact</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.label}>Phone</p>
            <p className={styles.value}>+49 30 915-88492</p>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Socials</p>
            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <img src="/icons/instagram.svg" alt="Instagram" />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
                <img src="/icons/whatsapp.svg" alt="WhatsApp" />
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Address</p>
            <p className={styles.value}>
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Working Hours</p>
            <p className={styles.value}>24 hours a day</p>
          </div>
        </div>

        <div className={styles.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.2318071251425!2d13.401903677073935!3d52.51114387205884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e27db4748a5%3A0x1d538c01013c2c7!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin!5e0!3m2!1suk!2sde!4v1776725816629!5m2!1suk!2sde"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
