import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import api from 'services/api';
import { login } from 'services/auth';

import './styles.css';

function SignIn() {
  const navigate = useNavigate();
  const [ errors, setErrors ] = useState([]);
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    await api.post('api/account/signin', data)
      .then(response => {
        const token = response.data;
        // Set token and redirect to home page
        login(token)
        navigate('/');
      })
      .catch(error => {
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
              validationErrors[field].map(err => fieldErrors.push(err));
            }
            setErrors(fieldErrors)
          }
        } else {
          alert(error.message);
        }
      });
  }

  const signInAsAdmin = () => {
    alert('Not implemented yet');
  }

  const signInAsMember = () => {
    alert('Note implemented yet');
  }

  return (
    <div className="container-fluid">
      <div className="outlet max-w-sm form-container">
        <a href="/">
          <img className="" src="" alt="" />
        </a>
        <h1 className="text-center">Sign In</h1>
        <h6 className="text-center">Log in to your account</h6>
        {errors.length > 0 && (
          <div className="alert alert-danger mt-3 px-4" role="alert">
            <ul className="list-group">
              {errors.map(error => <li>{error}</li>)}
            </ul>
          </div>
        )}
        <form onSubmit={onSubmit} >
          <div className="form-group mt-3">
            <label className="col-form-label">Email</label>
            <input
              className="form-control"
              type="email" placeholder="Enter your email"
              ref={emailRef} 
              required />
          </div>
          <div className="form-group mt-3">
            <label className="col-form-label">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter your password"
              ref={passwordRef} 
              required />
          </div>
          <div className="mt-3">
            <button className="btn btn-primary w-100 btn-block" type="submit">Sign In</button>
          </div>
        </form>
        <div className="mt-4 d-flex justify-content-between">
          <button className="btn btn-info" onClick={signInAsMember}>Enter as Member</button>
          <button className="btn btn-info" onClick={signInAsAdmin}>Enter as Admin</button>
        </div>
        <span className="mt-4 d-flex justify-content-center">Don't have an account?&nbsp;
          <a className="" href="/account/signup">
            <span>Sign Up</span>
          </a>
        </span>
      </div>
    </div>
  );
}

export default SignIn;