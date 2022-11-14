import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'services/api';

import './styles.css';

function SignUp() {
  const navigate = useNavigate()
  const [ errors, setErrors ] = useState([]);
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    await api.post('api/account/signup', data)
      .then(response => {
        // Redirect user to home page
        navigate('/account/signin');
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

  return (
    <div className="container-fluid">
      <div className="outlet max-w-sm form-container">
        <a href="/">
          <img className="" src="" alt="" />
        </a>
        <h1 className="text-center">Sign Up</h1>
        <h6 className="text-center">Create a new account</h6>
        {errors.length > 0 && (
          <div className="alert alert-danger mt-3 px-4" role="alert">
            <ul className="list-group">
              {errors.map(error => <li>{error}</li>)}
            </ul>
          </div>
        )}
        <form onSubmit={onSubmit} >
          <div className="row mt-3 mb-3">
            <div className="col-md-6 mb-1">
              <label className="col-form-label">First Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter your first name"
                ref={firstNameRef}
                required />
            </div>
            <div className="col-md-6">
              <label className="col-form-label">Last Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter your last name"
                ref={lastNameRef} 
                required />
            </div>
          </div>
          <div className="form-group">
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
            <button className="btn btn-primary w-100 btn-block" type="submit">Sign Up</button>
          </div>
        </form>
        <span className="mt-4 d-flex justify-content-center">Already have an account?&nbsp;
          <a className="" href="/account/signin">
            <span>Sign In</span>
          </a>
        </span>
      </div>
    </div>
  );
}

export default SignUp;