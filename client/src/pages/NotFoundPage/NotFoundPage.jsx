import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import notFoundImage from "../../assets/not-found.png";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img src={notFoundImage} alt="Page Not Found" />
      <h2>Page Not Found</h2>
      <p>
        We’re sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <Link to="/" className={styles.homeBtn}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
