import React, { useState } from "react";
import { getCurrentUser, logout } from "services/auth";

import logo from 'assets/logo.png';

function NavMenu() {
  const user = getCurrentUser();
  const [showDropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!showDropdown);
  };

  return (
    <nav className="navbar navbar-expand sticky-top px-4 navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            className="d-inline-block align-middle"
            style={{"margin-right": "1rem"}}
            src={logo}
            width="30"
            height="30"
            alt=""
          />
          <h5 className="d-inline-block">IssueTracker</h5>
        </a>
        <div className="d-flex collapse navbar-collapse justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/projects">Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/issues">Issues</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  type="button"
                  onClick={toggleDropdown}
                >
                  {`${user?.firstName} ${user?.lastName}`}
                </a>
                {showDropdown ? (
                  <div className="dropdown-menu position-absolute show">
                    <a className="dropdown-item" href="/" onClick={logout}>
                      Sign Out
                    </a>
                  </div>
                ) : null}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
