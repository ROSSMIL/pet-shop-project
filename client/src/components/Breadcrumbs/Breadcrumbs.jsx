import { useLocation, Link as RouterLink, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import styles from "./Breadcrumbs.module.css";

const BreadcrumbsComponent = ({ customLinks, categoryName }) => {
  const location = useLocation();
  const { id } = useParams();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const labelsMap = {
    products: "All products",
    sales: "All sales",
    cart: "Shopping cart",
    categories: "Categories",
  };

  if (customLinks) {
    return (
      <div className={styles.wrapper}>
        <Breadcrumbs separator="—" aria-label="breadcrumb">
          <RouterLink to="/" className={styles.crumb}>
            Main page
          </RouterLink>
          {customLinks.map((link, index) => {
            const isLast = index === customLinks.length - 1;
            return isLast ? (
              <span key={index} className={`${styles.crumb} ${styles.active}`}>
                {link.label}
              </span>
            ) : (
              <RouterLink key={index} to={link.to} className={styles.crumb}>
                {link.label}
              </RouterLink>
            );
          })}
        </Breadcrumbs>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs separator="—" aria-label="breadcrumb">
        <RouterLink to="/" className={styles.crumb}>
          Main page
        </RouterLink>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const label =
            value === id && categoryName
              ? categoryName
              : labelsMap[value] || value.replace(/-/g, " ");

          return last ? (
            <span key={to} className={`${styles.crumb} ${styles.active}`}>
              {label}
            </span>
          ) : (
            <RouterLink key={to} to={to} className={styles.crumb}>
              {label}
            </RouterLink>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;
