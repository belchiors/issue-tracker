import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import SidePanel from 'components/SidePanel';
import IconButton from 'components/IconButton';

function Layout(props) {

  const usePathName = () => {
    const location = useLocation();
    const pathName = location.pathname.toUpperCase();
    return pathName.substring(1);
  }

  return (
    <div className="page">
      <SidePanel />
      <main>
        <div className="top-row navbar sticky-top px-4 navbar-light">
          <Link className="navbar-brand" to="/">{usePathName()}</Link>
          <div className="nav-menu">
            <div className="nav-item">
              <IconButton
                variant="bi bi-bell"
                onClick={() => alert('Not implemented yet')}
              />
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
