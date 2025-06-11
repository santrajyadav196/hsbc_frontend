import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-4 text-primary fw-bold">
        Track Your Expenses Effortlessly
      </h1>
      <p className="lead text-muted mt-3 mb-4">
        Manage your personal finances, track your expenses, and stay in control
        of your budget — all in one place.
      </p>

      <div className="d-flex gap-3">
        <Link to="/signup" className="btn btn-primary btn-lg px-4">
          Get Started
        </Link>
        <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">
          Login
        </Link>
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/2910/2910766.png"
        alt="Expense Tracker"
        className="mt-5"
        width="150"
        height="150"
      />
    </div>
  );
};

export default Home;
