import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from 'components/NavMenu';

function Layout() {
  return (
    <div className="page">
      <div className="sidebar">
          <NavMenu />
      </div>
      <main>
        <div className="top-row px-4">
          
        </div>
        <article className="content px-4">
          <Outlet />
        </article>
      </main>
    </div>
  );
}

export default Layout;
