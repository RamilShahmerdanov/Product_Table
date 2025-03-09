import Cart from "./cart";
import styles from "./product.module.css";
import React, { useEffect, useState } from "react";

import { Getproducts } from "../services/Api";

function Productcarts({addToTable,selectedProducts}) {
  const [products, setProducts] = useState([]);

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
  return (
    <div className={styles.cartcontainer}>
      <Cart products={products} addToTable={addToTable} selectedProducts={selectedProducts} />
      
    </div>
  );
}

export default Productcarts;
