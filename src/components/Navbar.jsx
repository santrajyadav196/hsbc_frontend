import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">
        HSBC Life
      </Link>

      {isAuthenticated && (
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/expense">
                Expense
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="d-flex align-items-center ms-auto">
        {isAuthenticated ? (
          <>
            <span className="mx-2">{user.name}</span>
            <div
              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-2"
              style={{ width: "32px", height: "32px", fontSize: "14px" }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-primary btn-sm mx-1" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary btn-sm mx-1" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
