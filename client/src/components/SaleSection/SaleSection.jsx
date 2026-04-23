import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../store/productsSlice";
import { getSaleProducts } from "../../utils/productUtils";
import styles from "./SaleSection.module.css";
import ProductCard from "../ProductCard/ProductCard";

const SaleSection = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const saleProducts = useMemo(() => {
    return getSaleProducts(list);
  }, [list]);

  return (
    <section className={styles.sale}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sale</h2>
        <div className={styles.line}></div>
        <Link to="/sales" className={styles.allBtn}>
          All sales
        </Link>
      </div>

      <div className={styles.grid}>
        {saleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default SaleSection;
