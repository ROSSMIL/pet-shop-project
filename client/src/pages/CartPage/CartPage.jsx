import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  incrementCount,
  decrementCount,
  removeItem,
  clearCart,
} from "../../store/cartSlice";
import Counter from "../../components/Counter/Counter";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      items: items.map((item) => ({ id: item.id, count: item.count })),
    };

    try {
      const response = await fetch("http://localhost:3333/order/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        dispatch(clearCart());
        setIsModalOpen(true);
      } else {
        alert("Something went wrong");
      }
    } catch {
      alert("Error occurred while sending order");
    }
  };

  const getDisplayPrice = (item) =>
    Number(item.discont_price) > 0
      ? Number(item.discont_price)
      : Number(item.price);

  const totalPrice = items.reduce(
    (sum, item) => sum + getDisplayPrice(item) * item.count,
    0,
  );

  const totalItemsCount = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeIcon}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2>Congratulations!</h2>
            <div className={styles.modalText}>
              <p>Your order has been successfully placed on the website.</p>
              <p>A manager will contact you shortly to confirm your order.</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.header}>
        <h2 className={styles.title}>Shopping cart</h2>
        <div className={styles.line}></div>
        <Link to="/products" className={styles.allBtn}>
          Back to the store
        </Link>
      </div>

      {items.length > 0 ? (
        <div className={styles.cartContent}>
          <div className={styles.cartList}>
            {items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={`http://localhost:3333${item.image}`}
                  alt={item.title}
                />
                <div className={styles.itemInfo}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <div className={styles.controlsPriceWrapper}>
                    <Counter
                      count={item.count}
                      onIncrement={() => dispatch(incrementCount(item.id))}
                      onDecrement={() => dispatch(decrementCount(item.id))}
                    />
                    <div className={styles.priceContainer}>
                      <p className={styles.currentPrice}>
                        ${(getDisplayPrice(item) * item.count).toFixed(0)}
                      </p>
                      {item.discont_price > 0 && (
                        <p className={styles.oldPrice}>
                          ${(Number(item.price) * item.count).toFixed(0)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <form className={styles.orderSummary} onSubmit={handleOrder}>
            <h2>Order details</h2>
            <p className={styles.itemsCount}>
              {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
            </p>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalPrice}>
                ${totalPrice.toFixed(0)}
              </span>
            </div>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className={styles.orderBtn}>
              Order
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <p>Looks like you have no items in your basket currently.</p>
          <Link
            to="/products"
            className={styles.orderBtn}
            style={{ width: "250px" }}
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
