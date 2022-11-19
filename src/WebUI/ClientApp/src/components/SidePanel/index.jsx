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
      <div className="flex-column">
        <div className="panel-menu">
          <div className="panel-item">
            <Link className="nav-link" to="/">
              <i className="bi bi-kanban-fill"></i>
              <span>Home</span>
            </Link>
          </div>
          <div className="panel-item">
            <Link className="nav-link" to="/projects">
              <i className="bi bi-hdd-stack-fill"></i>
              <span>Projects</span>
            </Link>
          </div>
          <div className="panel-item">
            <Link className="nav-link" to="/issues">
              <i className="bi bi-bug-fill"></i>
              <span>Issues</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SidePanel;
