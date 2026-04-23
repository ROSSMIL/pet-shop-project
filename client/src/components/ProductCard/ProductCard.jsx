import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const isAdded = items.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const price = Number(product.price);
  const discont = Number(product.discont_price);
  const hasDiscount = discont > 0;
  const discountPercent = hasDiscount
    ? Math.round(((price - discont) / price) * 100)
    : 0;

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
        />

        {hasDiscount && (
          <span className={styles.discountBadge}>-{discountPercent}%</span>
        )}

        <button
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {isAdded ? "Added" : "Add to cart"}
        </button>
      </div>

      <div className={styles.productInfo}>
        <p className={styles.name}>{product.title}</p>

        <div className={styles.priceWrapper}>
          <span className={styles.price}>${hasDiscount ? discont : price}</span>

          {hasDiscount && <span className={styles.oldPrice}>${price}</span>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
