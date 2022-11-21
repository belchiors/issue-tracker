import React from "react";
import Dropdown from "./Dropdown";
import { getCurrentUser, logout } from "services/auth";

import logo from "assets/logo.png";

function NavMenu() {
  const user = getCurrentUser();

  return (
    <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark">
      <div className="container-fluid px-5">
        <a className="navbar-brand" href="/">
          <img
            className="d-inline-block align-middle"
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
              <a className="nav-link" href="/">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/projects">
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/issues">
                Issues
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Dropdown
                menu={[
                  <a className="dropdown-item" href="/" onClick={logout}>
                    Sign Out
                  </a>,
                ]}
              >
                <a
                  className="nav-link dropdown-toggle"
                  type="button"
                >
                  {`${user?.firstName} ${user?.lastName}`}
                </a>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
