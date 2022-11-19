import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from 'components/NavMenu';

function Layout() {

  return (
    <>
      <NavMenu />
      <main className="page">
        <div className="container my-3">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
