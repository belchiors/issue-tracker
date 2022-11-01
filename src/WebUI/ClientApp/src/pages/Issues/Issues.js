import React from 'react';

import { EditorModal } from 'components';

import './Issues.css';

export class Issues extends React.Component {
  static displayName = Issues.name;

  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      display: false,
      loading: true,
    };

    this.handleModal = this.handleModal.bind(this);
  }

  componentDidMount() {
    this.populateIssuesData();
  }

  static renderIssuesTable(items) {
    return items.map(item =>
      <tr>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.author}</td>
        <td>{item.priority}</td>
        <td>{item.assignees}</td>
        <td>
          <time datetime="2017-02-14">{item.createdAt}</time>
        </td>
        <td>
          <time datetime="2017-02-14">{item.updatedAt}</time>
        </td>
        <td>{item.status}</td>
      </tr>
    );
  }

  async populateIssuesData() {
    // const response = await fetch('weatherforecast');
    // const data = await response.json();
    // this.setState({ forecasts: data, loading: false });
    const data = Array.from({ length: 100 }, (v, i) => {
      return {
        id: i,
        title: 'Cras justo odio',
        author: 'Admin',
        priority: 'Critical',
        assignees: null,
        createdAt: '2022-30-10',
        updatedAt: '2022-30-10',
        status: 'New'
      }
    });
    this.setState({ issues: data, loading: false })
  }

  handleModal() {
    this.setState({ display: !this.state.display });
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Issues.renderIssuesTable(this.state.issues);
    return (
      <>
        <EditorModal title="New Issue" display={this.state.display} handleClose={this.handleModal}>
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Title</label>
              <input type="text" class="form-control" id="recipient-name" />
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Description</label>
              <textarea class="form-control" id="message-text"></textarea>
            </div>
            <div className="form-details">
              <div className="form-group">
                <div className="group-label">
                  <label class="col-form-label">Priority</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="P01" value="option1" />
                  <label class="form-check-label">P01</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="P01" value="option1" />
                  <label class="form-check-label">P01</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="P01" value="option1" />
                  <label class="form-check-label">P01</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="P01" value="option1" />
                  <label class="form-check-label">P01</label>
                </div>
              </div>
              <div className="form-group">
                <label class="col-form-label">Project</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>None</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="form-group">
                <label class="col-form-label">Assignees</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>None</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

          </form>
        </EditorModal>
        <div className="top-area">
          <h1 className="title">Issues</h1>
          <div className="toolbar mb-3">
            <div className="">
              <input type="text" className="form-control search-input" placeholder="Search" />
            </div>
            <div className="">
              <button type="button" className="btn btn-primary" onClick={this.handleModal}>New Issue</button>
            </div>
          </div>
        </div>
        <div className="content-body">
          <div className="issues-table">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Creator</th>
                  <th>Priority</th>
                  <th>Assinees</th>
                  <th>Created At</th>
                  <th>Last Update</th>
                  <th>Status</th>
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
                  <a className="page-link" href="">Previous</a>
                </li>
                <li className="page-item"><a className="page-link" href="">1</a></li>
                <li className="page-item"><a className="page-link" href="">2</a></li>
                <li className="page-item"><a className="page-link" href="">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  }
}
