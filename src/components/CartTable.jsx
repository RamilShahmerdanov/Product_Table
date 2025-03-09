import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import styles from "./product.module.css";
import ModalDelete from "./modal";

function CartTable({
  selectedProducts,
  removeProduct,
  increaseCount,
  decreaseCount,
}) {
  const [showModal, setshowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // useEffect(() => {
  //   const savedProducts = JSON.parse(localStorage.getItem("selectedProducts"));
   
  // }, []);

  // // `selectedProducts` dəyişəndə localStorage-ı yenilə
  // useEffect(() => {
  //   localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  // }, [selectedProducts]);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setshowModal(true);
    console.log("productToDelete",productToDelete);
    console.log("product",product);
    
  };
  const confirmDelete = () => {
    if (productToDelete) {
      removeProduct(productToDelete.id);
      console.log("productToDelete.id",productToDelete.id);
    }
    setshowModal(false);
    setProductToDelete(null);
   
    
  };

  const totalSum = selectedProducts.reduce(
    (acc, product) => acc + product.price * product.count,
    0
  ).toFixed(2);
  return (
    <>
      <div className={styles.tablecontainer}>
        <Table striped bordered hover className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Quantity</th>
              <th>Rating </th>
              <th>Sum</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    className={styles.tableimg}
                    src={product.images}
                    alt=""
                  />{" "}
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td>
                  <button className={styles.btndec} onClick={() => decreaseCount(product.id)}>-</button>
                  <span>{product.count}</span>
                  <button className={styles.btninc} onClick={() => increaseCount(product.id)}>+</button>
                </td>
                <td>{product.rating}</td>
                <td>{(product.price * product.count).toFixed(2)}</td>
                <td>
                  <Button
                  className={styles.delbtn}
                    onClick={() => handleDeleteClick(product)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="8">
                <div className={styles.totalsum}>
                  <p>Total Sum: ${totalSum}</p>
                </div>
              </td>
            </tr>
          </tfoot>
        </Table>
        <ModalDelete
        productTitle={productToDelete ? productToDelete.title : ""}
          show={showModal}
          onClose={() => setshowModal(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </>
  );
}

export default CartTable;
