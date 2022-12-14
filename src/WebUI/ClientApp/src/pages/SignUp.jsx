import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "services/api";

import logo from 'assets/logo.png';

function SignUp() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await api
      .post("api/account/signup", formData)
      .then((response) => {
        // Redirect user to home page
        navigate("/account/signin");
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          // Set errors for response errors, usually reponse errors are unique and
          // does not occur at the same time as validation errors, so there is no reason
          // to append here.
          setErrors([error.response.data]);

          // Validation errors are stored in an errors object that is null when
          // no validation errors are returned from the server. A validation errors
          // can occur for one or more fields each with possible more than one error.
          const validationErrors = error.response.data.errors;
          if (validationErrors != null) {
            const fieldErrors = [];
            for (let field in validationErrors) {
              validationErrors[field].map((err) => fieldErrors.push(err));
            }
            setErrors(fieldErrors);
          }
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="card max-w-sm form-container">
        <a href="/">
          <img
            src={logo}
            width="96"
            height="96"
            alt=""
          />
        </a>
        <h4 className="mt-4 text-center">
          Create a new account
        </h4>
        <h6>Welcome! Please enter your details.</h6>
        {errors.length > 0 && (
          <div className="alert alert-danger mt-3 px-4">
            <ul className="list-group">
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="row mt-3 mb-3">
            <div className="col-md-6 mb-1">
              <label className="col-form-label">
                First Name
              </label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="col-form-label">
                Last Name
              </label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-form-label">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label className="col-form-label">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mt-4">
            <button 
              className="btn btn-primary w-100"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <span className="mt-4 d-flex justify-content-center">
          Already have an account?&nbsp;
          <a className="d-inline-block" href="/account/signin">
            Sign In
          </a>
        </span>
      </div>
    </div>
  );
}

export default SignUp;
