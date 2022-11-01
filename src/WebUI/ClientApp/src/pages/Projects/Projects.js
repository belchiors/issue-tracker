import React from 'react';

import { EditorModal } from 'components';

import './Projects.css';

export class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      loading: true,
      display: false
    };

    this.handleModal = this.handleModal.bind(this);
  }

  static renderProjectsTable(items) {
    return items.map(item =>
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.issues}</td>
        <td>{item.assignees}</td>
        <td>{item.createdAt}</td>
        <td>{item.status}</td>
        <td>{item.description}</td>
      </tr>
    );
  }

  async populateProjectsData() {
    // const response = await fetch('weatherforecast');
    // const data = await response.json();
    // this.setState({ forecasts: data, loading: false });
    const data = Array.from({ length: 100 }, (v, i) => {
      return {
        id: i,
        title: 'Cras justo odio',
        issues: 150,
        description: 'Lorem ipsum dolor sit amet',
        author: 'Admin',
        priority: 'Critical',
        assignees: 'Admin',
        createdAt: '2022-30-10',
        updatedAt: '2022-30-10',
        status: 'New'
      }
    });
    this.setState({ projects: data, loading: false });
  }

  handleModal() {
    this.setState({ display: !this.state.display });
  }

  componentDidMount() {
    this.populateProjectsData();
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Projects.renderProjectsTable(this.state.projects);
    return (
      <>
        <EditorModal title="New Project" display={this.state.display} handleClose={this.handleModal}>
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Name</label>
              <input type="text" class="form-control" id="recipient-name" />
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Description</label>
              <textarea class="form-control" id="message-text"></textarea>
            </div>
          </form>
        </EditorModal>
        <div className="top-area">
          <h1 className="title">Groups</h1>
          <p>Explore project groups</p>
          <div className="toolbar mb-3">
            <div className="">
              <input type="text" className="form-control search-input" placeholder="Search" />
            </div>
            <div className="">
              <button type="button" className="btn btn-primary" onClick={this.handleModal}>New Project</button>
            </div>
          </div>
        </div>
        <div className="content-body">
          <div className="projects-table">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Issues</th>
                  <th>Assinees</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {contents}
              </tbody>
            </table>
          </div>
          <div className="pagination justify-content-end">
            <nav aria-label="pagination">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link" href="#">Previous</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  }
}