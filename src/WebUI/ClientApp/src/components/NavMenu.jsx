import React from "react";
import { getCurrentUser, logout } from "services/auth";
import { Link } from "react-router-dom";

import logo from "assets/logo.png";

function NavMenu() {
  const user = getCurrentUser();

  return (
    <>
      <div className="top-row ps-3 navbar navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              className="align-middle"
              src={logo}
              width="30"
              height="30"
              alt=""
            />
            <h5 className="d-inline-block">
              IssueTracker
            </h5>
          </a>
          <button title="Navigation menu" className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
      <div className="@NavMenuCssClass">
        <nav className="flex-column">
          <div className="nav-item px-3">
            <Link className="nav-link" to="/">
              <span className="bi bi-speedometer2" aria-hidden="true"></span> Dashboard
            </Link>
          </div>
          <div className="nav-item px-3">
            <Link className="nav-link" to="/projects">
              <span className="bi bi-folder" aria-hidden="true"></span> My Projects
            </Link>
          </div>
          <div className="nav-item px-3">
            <Link className="nav-link" to="/issues">
              <span className="bi bi-exclamation-circle" aria-hidden="true"></span> Issues
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavMenu;
