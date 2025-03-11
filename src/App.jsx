import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import styles from "./components/product.module.css";
import CartTable from "./components/CartTable";
import Productcarts from "./components/Productcarts";

function App() {
  const [sort, setSort] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ⬅️ İlk yüklənmə üçün loading

  useEffect(() => {
    // İlk dəfə səhifə açılarkən localStorage-dən məlumatı oxuyur
    const addedProd = localStorage.getItem("addedproduct");
    if (addedProd) {
      setSelectedProducts(JSON.parse(addedProd));
    }
    setTimeout(() => setLoading(false), 1000); // ⬅️ Loading-i 1 saniyə saxla
  }, []);

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

  const increaseCount = (productId) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, count: product.count + 1 }
          : product
      )
    );
  };

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
  };

  if (loading) {
    return <h2 className={styles.loading}>Loading...</h2>; // ⬅️ İlk açılışda loading göstər
  }

  return (
    <>
      <div className={styles.mainbody}>
        <h1>Product Table</h1>
        <CartTable
          selectedProducts={selectedProducts}
          removeProduct={removeProduct}
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
        />
        <h1>Product Cards</h1>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Select Sorting</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-hight">Price: High to Low</option>
          <option value="Raiting-low">Rating: Low to High</option>
          <option value="Raiting-hight">Rating: High to Low</option>
        </select>

        <Productcarts
          addToTable={addToTable}
          selectedProducts={selectedProducts}
        />
      </div>
    </>
  );
}

export default App;
