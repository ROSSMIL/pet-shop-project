import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../store/categoriesSlice";
import BreadcrumbsComponent from "../../components/Breadcrumbs/Breadcrumbs";
import styles from "./CategoriesPage.module.css";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <BreadcrumbsComponent />
      <h1 className={styles.pageTitle}>Categories</h1>
      <div className={styles.grid}>
        {list.map((category) => (
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
    </div>
  );
};

export default CategoriesPage;
