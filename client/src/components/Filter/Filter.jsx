import styles from "./Filter.module.css";

const Filter = ({ onFilterChange, isSalesPage }) => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <span>Price</span>
        <input
          className={styles.inputField}
          type="number"
          placeholder="from"
          onChange={(e) => onFilterChange("min", Number(e.target.value))}
        />
        <input
          className={styles.inputField}
          type="number"
          placeholder="to"
          onChange={(e) => onFilterChange("max", Number(e.target.value))}
        />
      </div>

      {!isSalesPage && (
        <div className={styles.filterGroup}>
          <span>Discounted items</span>
          <input
            className={styles.checkbox}
            type="checkbox"
            onChange={(e) => onFilterChange("discounted", e.target.checked)}
          />
        </div>
      )}

      <div className={styles.filterGroup}>
        <span>Sorted</span>
        <select
          className={styles.selectField}
          onChange={(e) => onFilterChange("sort", e.target.value)}
        >
          <option value="default">by default</option>
          <option value="price-low">Price: Low to high</option>
          <option value="price-high">Price: High to low</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
