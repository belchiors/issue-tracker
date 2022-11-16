import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "services/auth";

import "./styles.css";

function SidePanel() {
  const [showDropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!showDropdown);
  };

  const onLogOut = () => {
    // Set token to null and reload page
    logout();
    window.location.reload(true);
  };

  return (
    <aside className="side-panel">
      <div className="side-panel-header ps-3">
        <div className="container-fluid">
          <h1 className="panel-title">Issue Tracker</h1>
        </div>
      </div>
      <div className="flex-column">
        <div className="">
          <div className="panel-item">
            <Link className="nav-link" to="/">
              <i className="bi bi-kanban"></i> Home
            </Link>
          </div>
          <div className="panel-item">
            <Link className="nav-link" to="/projects">
              <i className="bi bi-hdd-stack"></i> Projects
            </Link>
          </div>
          <div className="panel-item">
            <Link className="nav-link" to="/issues">
              <i className="bi bi-bug"></i> Issues
            </Link>
          </div>
        </div>
        <div className="sidebar-footer">
          
        </div>
      </div>
    </aside>
  );
}

export default SidePanel;
