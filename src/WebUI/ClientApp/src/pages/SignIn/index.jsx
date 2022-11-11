import './styles.css';

function SignIn() {
  const onSubmit = () => {
    console.log('Loggin...');
  }

  const signInAsAdmin = () => {
    console.log('Log in as admin...');
  }

  const signInAsMember = () => {
    console.log('Log in as member...');
  }

  return (
    <div className="container-fluid">
      <div className="outlet max-w-sm form-container">
        <a href="/">
          <img className="" src="" />
        </a>
        <h1 className="text-center">Sign In</h1>
        <h6 className="text-center">Log in to your account</h6>
        <form onSubmit={onSubmit} >
          <div className="form-group mt-3">
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