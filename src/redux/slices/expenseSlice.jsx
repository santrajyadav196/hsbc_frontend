import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice"; // Make sure this path is correct
import {
  createExpense,
  updateExpense,
  fetchExpenses,
  deleteExpense,
  fetchExpenseSummary,
} from "../services/expenseService";

const initialState = {
  expenses: [],
  totalExpenses: 0,
  loading: false,
  fetchOnChanges: false,
  error: null,
  totalMonthlyExpense: null,
  categoryBreakdown: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    // Add non-async reducers here if needed
    onExpenseChanges: (state) => {
      state.fetchOnChanges = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // Handle logout
      .addCase(logout, () => initialState)

      // fetch expense
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.data?.expenses;
        state.totalExpenses = action.payload.data?.totalExpenses;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createExpense
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateExpense
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        // state.expense = action.payload;
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteExpense
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        // state.expense = action.payload;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch expense summary
      .addCase(fetchExpenseSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenseSummary.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.totalMonthlyExpense = action.payload.data?.totalMonthlyExpense;
        state.categoryBreakdown = action.payload.data?.categoryBreakdown;
      })
      .addCase(fetchExpenseSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default expenseSlice.reducer;
