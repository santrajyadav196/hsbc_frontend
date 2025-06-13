import React from "react";

const SelectCategory = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      <option value="All">All</option>
      <option value="Food">Food</option>
      <option value="Travel">Travel</option>
      <option value="Shopping">Shopping</option>
      <option value="Bills">Bills</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Other">Other</option>
    </select>
  );
};

export default SelectCategory;
