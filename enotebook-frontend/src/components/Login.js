import React, { useState, useContext } from "react";
import AlertContext from "../context/Alert/AlertContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [creds, setCredsState] = useState({ email: "", password: "" });

  let context = useContext(AlertContext);

  let { showAlert } = context;

  let navigate = useNavigate();

  let onChange = (e) => {
    setCredsState({ ...creds, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    let url = `http://localhost:5000/api/v1/enotebook/user/userLogin`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });

    let result = await response.json();
    if (result.success) {
      localStorage.setItem("token", result.data);
      navigate("/");
      showAlert(result.message, result.success);
    } else {
      showAlert(result.message, result.success);
    }
  };
  return (
    <div className="container mt-2">
      <h2>Login to eNotebook</h2>
      <form onSubmit={submitLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={creds.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={onChange}
            value={creds.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
