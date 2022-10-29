import React, { Component } from 'react';
import { NavMenu } from 'components/NavMenu/NavMenu.js'

import './Home.css';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [] };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }

  render() {
    // let contents = this.state.loading
    //   ? <p><em>Loading...</em></p>
    //   : FetchData.renderForecastsTable(this.state.forecasts);
    return (
      <>
        <div className="page">
          <aside className="sidebar">
            <NavMenu />
          </aside>
          <main>
            <article className="content px-4">
              Content body
            </article>
          </main>
        </div>
      </>
    );
  }
}
