import React from "react";
import Modal from "./Modal/Modal";
const DeleteExpense = ({ show, hide, confirmDelete }) => {
  return (
    <Modal show={show} hide={hide}>
      <div className="d-flex justify-content-between align-items-center border-bottom p-3">
        <h5 className="m-0">Confirm Deletion</h5>
        <button type="button" className="btn-close" onClick={hide}></button>
      </div>
      <div className="p-3">
        <p>Are you sure you want to delete this expense?</p>
        <div className="modal-footer">
          <button className="btn btn-secondary me-3" onClick={hide}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={confirmDelete}>
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteExpense;
