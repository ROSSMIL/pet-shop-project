import { useEffect, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import BreadcrumbsComponent from "../../components/Breadcrumbs/Breadcrumbs";
import Filter from "../../components/Filter/Filter";
import styles from "./ProductsPage.module.css";

const ProductsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { list } = useSelector((state) => state.categories);

  const [allProducts, setAllProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [filters, setFilters] = useState({
    min: 0,
    max: Infinity,
    discounted: false,
    sort: "default",
  });

  const isSalesPage = location.pathname === "/sales";

  useEffect(() => {
    let url = "http://localhost:3333/products/all";
    if (id) {
      url = `http://localhost:3333/categories/${id}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const items = data.data ? data.data : Array.isArray(data) ? data : [];
        setAllProducts(items);

        if (data.category && data.category.title) {
          setCategoryTitle(data.category.title);
        } else {
          const found = list.find((cat) => cat.id == id);
          setCategoryTitle(found ? found.title : "");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setAllProducts([]);
      });
  }, [id, list]);

  const displayedProducts = useMemo(() => {
    let result = [...allProducts];

    if (isSalesPage) {
      result = result.filter((item) => item.discont_price > 0);
    }
    if (filters.discounted && !isSalesPage) {
      result = result.filter((item) => item.discont_price > 0);
    }

    result = result.filter((item) => {
      const price = item.discont_price > 0 ? item.discont_price : item.price;
      return price >= filters.min && price <= (filters.max || Infinity);
    });

    if (filters.sort === "price-low") {
      result.sort(
        (a, b) => (a.discont_price || a.price) - (b.discont_price || b.price),
      );
    } else if (filters.sort === "price-high") {
      result.sort(
        (a, b) => (b.discont_price || b.price) - (a.discont_price || a.price),
      );
    }

    return result;
  }, [filters, allProducts, isSalesPage]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className={styles.container}>
      <BreadcrumbsComponent categoryName={categoryTitle} />

      <h1>{id ? categoryTitle : isSalesPage ? "All sales" : "All products"}</h1>

      <Filter onFilterChange={handleFilterChange} isSalesPage={isSalesPage} />

      <div className={styles.grid}>
        {displayedProducts.length > 0 ? (
          displayedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
