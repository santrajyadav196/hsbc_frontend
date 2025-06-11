import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/services/authService";

import { fetchExpenseSummary } from "../redux/services/expenseService";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { totalMonthlyExpense, categoryBreakdown } = useSelector(
    (state) => state.expense || {}
  );

  useEffect(() => {
    dispatch(fetchExpenseSummary());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    }
  }, []);

  return (
    <div className="container mt-4">
      <h4>Total Expenses (This Month): ₹{totalMonthlyExpense || 0}</h4>

      {categoryBreakdown?.length > 0 ? (
        <PieChart width={400} height={300}>
          <Pie
            data={categoryBreakdown}
            dataKey="totalAmount"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {categoryBreakdown.map((entry, index) => (
              <Cell key={entry._id} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <p>No expense data this month.</p>
      )}
    </div>
  );
};

export default Dashboard;
