import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Counter from "../../components/Counter/Counter";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  const isInCart = cartItems.some((item) => Number(item.id) === Number(id));

  useEffect(() => {
    fetch(`http://localhost:3333/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(Array.isArray(data) ? data[0] : data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, count }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
        />
      </div>

      <div className={styles.info}>
        <h1>{product.title}</h1>

        <div className={styles.priceContainer}>
          <span className={styles.price}>
            ${product.discont_price || product.price}
          </span>
          {product.discont_price && (
            <span className={styles.oldPrice}>${product.price}</span>
          )}
        </div>

        <div className={styles.actions}>
          <Counter
            count={count}
            onIncrement={() => setCount((prev) => prev + 1)}
            onDecrement={() => setCount((prev) => (prev > 1 ? prev - 1 : 1))}
            disabled={isInCart}
          />

          <button
            className={styles.addToCartBtn}
            onClick={handleAddToCart}
            disabled={isInCart}
            style={{ backgroundColor: isInCart ? "#ccc" : "#0d50ff" }}
          >
            {isInCart ? "Added to cart" : "Add to cart"}
          </button>
        </div>

        <div className={styles.description}>
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
