import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  const userLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      {token ? (
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              eNotebook
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                {/* <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li> */}
              </ul>
              {!token ? (
                <form className="d-flex">
                  <Link
                    className="btn btn-secondary mx-2"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-secondary mx-2"
                    to="/signup"
                    role="button"
                  >
                    Sign Up
                  </Link>
                </form>
              ) : (
                <Button
                  className="btn btn-secondary mx-2"
                  onClick={userLogout}
                  role="button"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
