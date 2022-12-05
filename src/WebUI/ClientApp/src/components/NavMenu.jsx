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
            <h5 className="d-inline-block">IssueTracker</h5>
          </a>
          <button title="Navigation menu" className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
      <div className="@NavMenuCssClass">
        <ul className="flex-column px-2">
          <li className="nav-item">
            <Link className="nav-link" to="/" reloadDocument>
              <span className="bi bi-speedometer2" aria-hidden="true"></span>{" "}
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/projects" reloadDocument>
              <span className="bi bi-folder" aria-hidden="true"></span> Projects
            </Link>
          </li>
          <li className="nav-item has-submenu">
            <Link className="nav-link" to="/issues" reloadDocument>
              <span
                className="bi bi-exclamation-circle"
                aria-hidden="true"
              ></span>{" "}
              Issues
            </Link>
            <ul className="">
              <li className="">
                <Link
                  className="nav-link"
                  to={`/issues?assignedTo=${user?.id}`}
                  reloadDocument
                >
                  Assigned to me
                </Link>
              </li>
              <li className="">
                <Link
                  className="nav-link"
                  to={`/issues?reportedBy=${user?.id}`}
                  reloadDocument
                >
                  Reported by me
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavMenu;
