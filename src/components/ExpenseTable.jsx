import React from "react";

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th style={{ maxWidth: 60 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No expenses found
              </td>
            </tr>
          ) : (
            expenses.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.amount}</td>
                <td>{item.category}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.description}</td>
                <td style={{ maxWidth: 60 }}>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
