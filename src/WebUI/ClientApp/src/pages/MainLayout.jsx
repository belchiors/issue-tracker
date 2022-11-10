import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import SidePanel from 'components/SidePanel';
import IconButton from 'components/IconButton';

function MainLayout(props) {

  const usePathName = () => {
    const location = useLocation();
    const pathName = location.pathname.toUpperCase();
    return pathName.substring(1);
  }

  return (
    <div className="page">
      <SidePanel />
      <main>
        <div className="top-row px-4 navbar navbar-light">
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

export default MainLayout;
