import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDelete({ show, onClose, onConfirm,productTitle }) {
  return (
    <>
     

      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want do delete <strong>{productTitle}</strong>?</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            NO
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
