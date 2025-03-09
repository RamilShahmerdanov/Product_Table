import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import styles from "./components/product.module.css";
import CartTable from "./components/CartTable";
import Productcarts from "./components/Productcarts";

function App() {
  const [selectedProducts, setSelectedProducts] = useState(() => {
    const addedProd = localStorage.getItem("addedproduct");
    return addedProd ? JSON.parse(addedProd) : []});

    useEffect(() => {
      localStorage.setItem("addedproduct", JSON.stringify(selectedProducts));
    }, [selectedProducts]);

  const addToTable = (product) => {
    setSelectedProducts((prev) => {
      const existingproduct = prev.find((p) => p.id === product.id);
      if (existingproduct) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, count: p.count + 1 } : p
        );
      } else {
        return [...prev, { ...product, count: 1 }]; // Yeni məhsul əlavə et
      }
    });
  };

  // Məhsul sayını artırmaq
  const increaseCount = (productId) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, count: product.count + 1 }
          : product
      )
    );
  };

  // Məhsul sayını azaltmaq
  const decreaseCount = (productId) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.id === productId && product.count > 1
          ? { ...product, count: product.count - 1 }
          : product
      )
    );
  };

  const removeProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
    console.log("productId", productId);
  };

  function incrementFunc(pokemon) {
    setTeam(
      team.map((p) => (p.id === pokemon.id ? { ...p, count: p.count + 1 } : p))
    );
  }

  return (
    <>
      <div className={styles.mainbody}>
        <h1>Product Table</h1>
        <CartTable
          selectedProducts={selectedProducts}
          removeProduct={removeProduct}
          increaseCount={increaseCount} // Sayı artıran funksiyanı ötür
          decreaseCount={decreaseCount} // Sayı azaldan funksiyanı ötür
        />
        <h1>Product Cards</h1>

        <Productcarts
          addToTable={addToTable}
          selectedProducts={selectedProducts}
        />
      </div>
    </>
  );
}

export default App;
