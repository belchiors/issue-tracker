import React from 'react';
import { NavMenu } from 'components';

export class Layout extends React.Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="page">
        <aside className="sidebar">
          <NavMenu />
        </aside>
        <main className="content px-4">
          <div className="content-body">
            { this.props.children }
          </div>
        </main>
      </div>
    );
  }
}
