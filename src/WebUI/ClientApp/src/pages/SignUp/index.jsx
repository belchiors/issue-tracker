import './styles.css';

function SignUp() {
  const onSubmit = () => {
    console.log('Signing up...')
  }

  return (
    <div className="container-fluid">
      <div className="outlet max-w-sm form-container">
        <a href="/">
          <img className="" src="" />
        </a>
        <h1 className="text-center">Sign Up</h1>
        <h6 className="text-center">Create a new account</h6>
        <form onSubmit={onSubmit} >
          <div className="row mt-3 mb-3">
            <div className="col-md-6 mb-1">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" className="form-control" type="text" placeholder="Enter your first name" />
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" className="form-control" type="text" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" className="form-control" type="email" placeholder="Enter your email" />
            <small id="email" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input id="password" className="form-control" type="password" placeholder="Enter your password" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Confirm Password</label>
            <input id="password" className="form-control" type="password" placeholder="Enter your password" />
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