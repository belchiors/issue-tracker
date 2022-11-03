import { ProjectEditor } from 'components/ProjectEditor';
import React from 'react';

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

  static renderProjectsTable(projects) {
    return (
      <table className="table table-sm nowrap">
        <thead className="table-dark">
          <tr className="text-center">
            <th>No.</th>
            <th>Title</th>
            <th>Issues</th>
            <th>Created At</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p =>
            <tr key={p.id}>
              <td className="text-center">{p.id}</td>
              <td className="text-center">
                <a href={"/projects?id="+p.id}>{p.title}</a>
              </td>
              <td className="text-center">{p.issues}</td>
              <td className="text-center">{p.createdAt}</td>
              <td className="text-center">{p.description}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  handleModal() {
    this.setState({display: !this.state.display});
  }

  componentDidMount() {
    this.populateTableData();
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Projects.renderProjectsTable(this.state.projects);

    return (
      <div className="">
        <ProjectEditor
          display={this.state.display}
          onClose={this.handleModal}
        />
        <div className="top-area">
          <h1 className="title">Groups</h1>
          <p>Explore project groups</p>
          <div className="toolbar mb-3">
            <div className="">
              <input type="text" className="form-control search-input" placeholder="Search" />
            </div>
            <div className="">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleModal}>New Project</button>
            </div>
          </div>
        </div>
        {contents}
      </div>
    );
  }

  async populateTableData() {
    // const response = await fetch('projects/getAll');
    // const data = await response.json();
    const data = Array.from({ length: 100}, (_, index) => ({
      id: index,
      title: `Project No. ${index}`,
      description: 'Lorem Ipsum dolor sit amet',
      createdAt: new Date().toLocaleDateString(),
      issues: Math.floor(Math.random() * 150)
    }));
    this.setState({ projects: data, loading: false });
  }
}
