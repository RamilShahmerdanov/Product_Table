import styles from "./product.module.css";
import React, { useEffect, useState } from "react";

import { Getproducts } from "../services/Api";
import Cart from "./cart";
import Cart from "./cart.jsx";

function Productcarts({ addToTable, selectedProducts }) {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await Getproducts();
      setProducts(data);
    } catch (error) {
      console.error("Məlumat çəkilərkən xəta baş verdi:", error);
    }
  };
  console.log("products", products);
  let sortproduct = [...products]; // Yeni array yaradılır

  if (sort !== "") {
    sortproduct.sort((a, b) => {
      if (sort === "price-hight") {
        return b.price - a.price;
      } else if (sort === "price-low") {
        return a.price - b.price;
      } else if (sort === "Raiting-low") {
        return a.rating - b.rating;
      } else if (sort === "Raiting-hight") {
        return b.rating - a.rating;
      }
      return 0;
    });
  }
  return (
    <>
      <div className={styles.container}>
        <h1>Product Cards</h1>
        <div className={styles.sortWrapper}>
          <select
            className={styles.select}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Select Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-hight">Price: High to Low</option>
            <option value="Raiting-low">Rating: Low to High</option>
            <option value="Raiting-hight">Rating: High to Low</option>
          </select>
        </div>
      </div>

      <div className={styles.cartcontainer}>
        <Cart
          products={sortproduct}
          addToTable={addToTable}
          selectedProducts={selectedProducts}
        />
      </div>
    </>
  );
}

export default Productcarts;
