import React, { useState, useEffect } from "react";
import ProjectEditor from "components/ProjectEditor";
import Spinner from "components/Spinner";
import Restricted from "utils/Restricted";

import api from "services/api";
import "./styles.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);

  const handleModal = () => {
    setModalState(!modalState);
  };

  const populateTableData = async () => {
    const response = await api.get("api/projects");
    const data = response.data;
    setProjects(data);
    setLoading(false);
  };

  const renderProjectsTable = (projects) => {
    return (
      <table className="table table-hover table-bordered">
        <thead className="table-light">
          <tr className="text-center">
            <th className="text-center">#</th>
            <th className="text-center">Name</th>
            <th className="text-center">Issues</th>
            <th className="text-center">Created</th>
            <th className="text-center">Description</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td className="text-center">{index}</td>
              <td className="text-truncate">
                <a href={`/issues?projectId=${project.id}`}>
                  {project.name}
                </a>
              </td>
              <td className="text-center">{project.issues}</td>
              <td className="text-center">
                {new Date(project.createdAt).toDateString()}
              </td>
              <td className="text-truncate">{project.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    populateTableData();
  }, []);

  return loading ? <Spinner /> : (
    <>
      <Restricted to={"Admin"}>
        <ProjectEditor display={modalState} onClose={handleModal} />
      </Restricted>
      <div className="toolbar">
        <h4 className="title">Projects</h4>
        <Restricted to={"Admin"}>
          <div className="">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModal}
            >
              Create Project
            </button>
          </div>
        </Restricted>
      </div>
      <div className="data-table">
        <div className="data-table-header"></div>
        <div className="data-table-body">
          {loading ? <Spinner /> : renderProjectsTable(projects)}
        </div>
        <div className="data-table-footer">
          <div>Showing 1 to 50 of {projects.length} entries</div>
          <div className="paginator-container">
            <ul className="pagination pagination-sm justify-content-end">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabindex="-1">Previous</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects;
