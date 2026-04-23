import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import BreadcrumbsComponent from "../../components/Breadcrumbs/Breadcrumbs";
import Counter from "../../components/Counter/Counter";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.categories.list || []);
  const cartItems = useSelector((state) => state.cart.items || []);

  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);

  const isAdded = cartItems.some((item) => Number(item.id) === Number(id));

  useEffect(() => {
    fetch(`http://localhost:3333/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(Array.isArray(data) ? data[0] : data));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, count }));
    }
  };

  if (!product) return <p>Loading...</p>;

  const categoryId = product.categoryId || product.category?.id;
  const currentCategory = allCategories.find(
    (c) => c.id === Number(categoryId),
  );

  const breadcrumbLinks = [
    { label: "Categories", to: "/categories" },
    {
      label: currentCategory ? currentCategory.title : "Category",
      to: currentCategory ? `/categories/${currentCategory.id}` : "/categories",
    },
    { label: product.title, to: null },
  ];

  const discountPercent = product.discont_price
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100,
      )
    : 0;

  return (
    <div className={styles.container}>
      <BreadcrumbsComponent customLinks={breadcrumbLinks} />

      <div className={styles.productWrapper}>
        <div className={styles.imageBox}>
          <img
            src={`http://localhost:3333${product.image}`}
            alt={product.title}
          />
        </div>

        <div className={styles.infoBox}>
          <h1>{product.title}</h1>

          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>
              ${product.discont_price || product.price}
            </span>
            {product.discont_price && (
              <>
                <span className={styles.oldPrice}>${product.price}</span>
                <span className={styles.discountBadge}>
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          <div className={styles.actions}>
            <Counter
              count={count}
              onIncrement={() => setCount((prev) => prev + 1)}
              onDecrement={() => setCount((prev) => (prev > 1 ? prev - 1 : 1))}
              disabled={isAdded}
            />

            <button
              className={styles.addToCartBtn}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? "Added to cart" : "Add to cart"}
            </button>
          </div>

          <div className={styles.descriptionSection}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
