import React, { useEffect, useState } from "react";
import styles from "./product.module.css";

function Cart({ products,addToTable ,selectedProducts}) {

 // Məhsulun artıq cədvəldə olub olmadığını yoxlamaq
 const isProductInTable = (productId) => {
  return selectedProducts.some(product => product.id === productId);
};

  return (
    <>
      <div className={styles.cart}>
        {products.map((product) => (
          <div className={styles.cartin} key={product.id}>
            <h3>{product.title}</h3>
            <img
              className={styles.imges}
              src={product.images[0]}
              alt={product.title}
            />
            <p>Price: {product.price}$</p>
            <p>Rating: {product.rating}</p>
            <p>Brand:{product.brand}</p>
            <button onClick={() => addToTable(product)}
            disabled={isProductInTable(product.id)}
              
              >{isProductInTable(product.id) ? "Already Added" : "Add to Table"}</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cart;
