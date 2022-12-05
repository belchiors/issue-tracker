import React from "react";
import { Outlet } from "react-router-dom";

import NavMenu from "components/NavMenu";

import { isAuthenticated, logout } from "services/auth";

function Layout() {
  const handleLogout = () => {
    logout();
    window.location.reload(true);
  };

  return (
    <div className="page">
      <div className="sidebar">
        <NavMenu />
      </div>
      <main>
        <div className="top-row px-4">
          {isAuthenticated ? (
            <div className="">
              <button
                className="btn btn-link"
                type="button"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          ) : null}
        </div>
        <article className="content px-4">
          <Outlet />
        </article>
      </main>
    </div>
  );
}

export default Layout;
