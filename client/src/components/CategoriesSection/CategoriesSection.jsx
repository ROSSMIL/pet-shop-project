import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../store/categoriesSlice";
import { getShuffledList } from "../../utils/listUtils";
import styles from "./CategoriesSection.module.css";

const CategoriesSection = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const displayCategories = useMemo(() => {
    return getShuffledList(list, 4);
  }, [list]);

  return (
    <section className={styles.categories}>
      <div className={styles.header}>
        <h2 className={styles.title}>Categories</h2>
        <div className={styles.line}></div>
        <Link to="/categories" className={styles.allBtn}>
          All categories
        </Link>
      </div>

      <div className={styles.grid}>
        {displayCategories.map((category) => (
          <Link
            to={`/categories/${category.id}`}
            key={category.id}
            className={styles.card}
          >
            <img
              src={`http://localhost:3333${category.image}`}
              alt={category.title}
            />
            <p className={styles.name}>{category.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
