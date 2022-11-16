import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SidePanel from "components/SidePanel";

import { logout } from "services/auth";

function Layout() {
  const [showDropdown, setDropdown] = useState(false);
  const [showAppSearch, setAppSearch] = useState(false);

  const toggleAppSearch = () => {
    setAppSearch(!showAppSearch);
  };

  const toggleDropdown = () => {
    setDropdown(!showDropdown);
  };

  const usePathName = () => {
    const location = useLocation();
    const pathName = location.pathname.toUpperCase();
    return pathName.substring(1);
  };

  return (
    <div className="page">
      <SidePanel />
      <main>
        <div className="navbar container-fluid sticky-top px-4 navbar-light">
          <ul className="navbar-nav float-start me-auto">
            <li className="nav-item">
              <a className="nav-link" onClick={toggleAppSearch}>
                <div className="d-flex align-items-center">
                  <i className="bi bi-search"></i>
                  <div className="ms-1 d-none d-sm-block">
                    <span>Search</span>
                  </div>
                </div>
              </a>
              {showAppSearch ? (
                <form className="search-box position-absolute show">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search &amp; enter"
                  />
                  <a className="srh-btn">
                    <i class="bi bi-x" onClick={toggleAppSearch}></i>
                  </a>
                </form>
              ) : null}
            </li>
          </ul>
          <ul className="navbar-nav float-end">
            <li className="nav-item">
              <div className="dropdown dropstart">
                <a
                  className="nav-link text-muted"
                  type="button"
                  onClick={toggleDropdown}
                >
                  User
                </a>
                {showDropdown ? (
                  <div className="dropdown-menu position-absolute show">
                    <a className="dropdown-item" href="#" onClick={logout}>
                      Sign Out
                    </a>
                  </div>
                ) : null}
              </div>
            </li>
          </ul>
        </div>
        <div className="container-fluid">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
