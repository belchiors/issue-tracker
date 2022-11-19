import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from 'components/NavMenu';
import SidePanel from "components/SidePanel";

function Layout() {

  return (
    <>
      <NavMenu />
      <main className="page">
        <SidePanel />
        <section className="content">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default Layout;
