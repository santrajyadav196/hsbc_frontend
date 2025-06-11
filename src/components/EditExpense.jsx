import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Modal from "./Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import showToast from "./utilis/CustomToast";
import { updateExpense } from "../redux/services/expenseService";

const EditExpense = ({ show, hide, item, setIsRefresh }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.expense);

  useEffect(() => {
    reset({
      amount: item?.amount,
      category: item?.category,
      description: item?.description,
      date: item?.date ? item.date.slice(0, 10) : "",
    });
  }, [show]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const obj = {
        _id: item._id,
        amount: data.amount,
        description: data.description,
        date: new Date(data.date),
        category: data.category,
      };
      const result = await dispatch(updateExpense(obj)).unwrap();
      setIsRefresh((prev) => !prev);
      showToast(`${result.message}!`, "success");
      reset();
      hide();
    } catch (error) {
      showToast(`${error}!` || "Something went wrong!", "error");
    }
  };
  return (
    <Modal show={show} hide={hide}>
      <div className="d-flex justify-content-between align-items-center border-bottom p-3">
        <h5 className="m-0">Edit Expense</h5>
        <button type="button" className="btn-close" onClick={hide}></button>
      </div>

      <div className="p-3">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Amount */}
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className={`form-control ${errors.amount ? "is-invalid" : ""}`}
              {...register("amount", {
                required: "Amount is required",
                min: { value: 0.01, message: "Amount must be greater than 0" },
                valueAsNumber: true, // ✅ Converts input value to a real number
              })}
            />
            <ErrorMessage
              errors={errors}
              name="amount"
              render={({ message }) => (
                <div className="invalid-feedback">{message}</div>
              )}
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              className={`form-select ${errors.category ? "is-invalid" : ""}`}
              {...register("category", {
                required: "Category is required",
              })}
            >
              <option value="">-- Select Category --</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
            <ErrorMessage
              errors={errors}
              name="category"
              render={({ message }) => (
                <div className="invalid-feedback">{message}</div>
              )}
            />
          </div>

          {/* Date */}
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              id="date"
              className={`form-control ${errors.date ? "is-invalid" : ""}`}
              {...register("date", {
                required: "Date is required",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="date"
              render={({ message }) => (
                <div className="invalid-feedback">{message}</div>
              )}
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 300,
                  message: "Max 300 characters allowed",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="description"
              render={({ message }) => (
                <div className="invalid-feedback">{message}</div>
              )}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Saving..." : "Update Expense"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditExpense;
