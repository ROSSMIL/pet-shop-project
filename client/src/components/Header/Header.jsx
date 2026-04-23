import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import cartIcon from "../../assets/cart.svg";

const Header = () => {
  const { items } = useSelector((state) => state.cart);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" />
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Main Page
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Categories
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          All products
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          All sales
        </NavLink>
      </nav>

      <Link to="/cart" className={styles.cart}>
        <img src={cartIcon} alt="Cart" />
        {items.length > 0 && (
          <span className={styles.cartCount}>{items.length}</span>
        )}
      </Link>
    </header>
  );
};

export default Header;
