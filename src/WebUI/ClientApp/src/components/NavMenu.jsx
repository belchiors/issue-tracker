import React from 'react';

import './NavMenu.css';

export class NavMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.navMenuCssClass = this.navMenuCssClass.bind(this);
    
    this.state = {
      collapseNavMenu: true
    };
  }

  navMenuCssClass() {
    return this.state.collapseNavMenu ? "collapse" : null;
  }

  toggleNavbar() {
    this.setState({
      collapseNavMenu: !this.state.collapseNavMenu
    });
  }

  render() {
    return (
      <>
        <div className="top-row ps-3 navbar navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">IssueTracker</a>
            <button title="Navigation menu" className="navbar-toggler" onClick={this.toggleNavbar}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        <div className={this.navMenuCssClass()}>
          <nav className="flex-column">
            <div className="nav-item px-3">
              <a className="nav-link" href="/">
                <span className="oi oi-home" aria-hidden="true"></span> Home
              </a>
            </div>
            <div className="nav-item px-3">
              <a className="nav-link" href="/projects">
                <span className="oi oi-list-rich" aria-hidden="true"></span> Projects
              </a>
            </div>
            <div className="nav-item px-3">
              <a className="nav-link" href="/issues">
                <span className="oi oi-list-rich" aria-hidden="true"></span> Issues
              </a>
            </div>
          </nav>
        </div>
      </>
    );
  }
}
