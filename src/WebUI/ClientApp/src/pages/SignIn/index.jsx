import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "services/api";
import { login } from "services/auth";

import logo from 'assets/logo.png';
import "./styles.css";

function SignIn() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
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
      .post("api/account/signin", formData)
      .then((response) => {
        const jwt = response.data;
        login(jwt);
        navigate("/");
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
        <h4 className="mt-4 text-center">Log in to your account</h4>
        <h6>Welcome back! Please enter your details.</h6>
        {errors.length > 0 && (
          <div className="alert alert-danger mt-3 px-4" role="alert">
            <ul className="list-group">
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="form-group mt-3">
            <label className="col-form-label">Email</label>
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
            <label className="col-form-label">Password</label>
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
            <button className="btn btn-primary w-100 btn-block" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <span className="mt-4 d-flex justify-content-center">
          Don't have an account?&nbsp;
          <a className="d-inline-block" href="/account/signup">Sign Up</a>
        </span>
      </div>
    </div>
  );
}

export default SignIn;
