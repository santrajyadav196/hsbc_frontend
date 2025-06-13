import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../components/Axios/axiosClient";
import api from "../../components/Axios/api";

// fetch expense
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post(api.FETCH_EXPENSES.url, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// create expense
export const createExpense = createAsyncThunk(
  "expenses/createExpense",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post(api.CREATE_EXPENSE.url, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// update Expense
export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosClient.put(api.UPDATE_EXPENSE.url, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// delete Expense
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post(api.DELETE_EXPENSE.url, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// fetch expense summary
export const fetchExpenseSummary = createAsyncThunk(
  "expenses/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(api.EXPENSE_SUMMARY.url);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchFilterExpenses = createAsyncThunk(
  "expense/filter",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("/api/filter/expenses", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(err?.response?.data.message || err.message);
    }
  }
);
