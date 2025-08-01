import React, { useState, useEffect } from "react";
import CreateExpense from "../components/CreateExpense";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  deleteExpense,
  fetchFilterExpenses,
} from "../redux/services/expenseService";
import ExpenseTable from "../components/ExpenseTable";
import EditExpense from "../components/EditExpense";
import DeleteExpense from "../components/DeleteExpense";
import Pagination from "../components/Pagination";
import SelectCategory from "../components/SelectCategory";

const Expense = () => {
  const dispatch = useDispatch();
  const { expenses, totalExpenses, filterExpenses, loading } = useSelector(
    (state) => state.expense
  );

  const [showModal, setShowModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [category, setCategory] = useState("All");

  const [page, setPage] = useState(1);
  const limit = 2;
  const totalPages = Math.ceil(totalExpenses / limit);

  useEffect(() => {
    dispatch(fetchExpenses({ page, limit }));
  }, [page, isRefresh]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditModal(true);
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setConfirmDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const obj = {
        _id: itemToDelete._id,
      };
      await dispatch(deleteExpense(obj)).unwrap();
      setConfirmDeleteModal(false);
      setIsRefresh((prev) => !prev);
      setItemToDelete(null);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const selectCategoryHandler = async (value) => {
    const data = value.target.value;
    setCategory(data);
  };

  useEffect(() => {
    const obj = {
      category: category,
    };
    dispatch(fetchFilterExpenses(obj));
  }, [category]);

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <SelectCategory onChange={selectCategoryHandler} />
        </div>
        <div style={{ fontSize: 24, fontWeight: 500 }}>Expenses</div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + New Expense
        </button>
      </div>

      {loading ? (
        <div
          className="my-5"
          style={{ color: "red", fontSize: 20, fontWeight: 600 }}
        >
          Loading...
        </div>
      ) : (
        ""
      )}

      {/* Table */}
      <ExpenseTable
        expenses={filterExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}

      {/* <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}

      {/* Modals */}
      <CreateExpense
        show={showModal}
        hide={() => setShowModal(false)}
        setIsRefresh={setIsRefresh}
      />
      <EditExpense
        show={editModal}
        hide={() => setEditModal(false)}
        item={selectedItem}
        setIsRefresh={setIsRefresh}
      />

      <DeleteExpense
        show={confirmDeleteModal}
        hide={() => setConfirmDeleteModal(false)}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default Expense;
