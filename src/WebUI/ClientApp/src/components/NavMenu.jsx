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
      <div className="container-fluid">
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
        <ul className="navbar-nav float-end">
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
    </nav>
  );
}

export default NavMenu;
