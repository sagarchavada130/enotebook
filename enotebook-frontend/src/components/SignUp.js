import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/Alert/AlertContext";

const SignUp = () => {
  const alertContextApi = useContext(AlertContext);
  const { showAlert } = alertContextApi;
  const [signUpDetails, setSignUpDetailsState] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let navigate = useNavigate();

  let onChange = (e) => {
    setSignUpDetailsState({
      ...signUpDetails,
      [e.target.name]: e.target.value,
    });
  };

  const submitSignUp = async (e) => {
    e.preventDefault();
    let { name, email, password } = signUpDetails;
    let url = `http://localhost:5000/api/v1/enotebook/user/createUser`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    let result = await response.json();
    if (result.success) {
      showAlert(result.message, result.success);
      navigate("/");
    } else {
      showAlert(result.message);
    }
  };
  return (
    <div className="container mt-2">
      <h2>SignUp to use eNotebook</h2>
      <form onSubmit={submitSignUp}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={signUpDetails.name}
          />
        </div>
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
            value={signUpDetails.email}
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
            value={signUpDetails.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            value={signUpDetails.cpassword}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
