import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectEditor from "components/ProjectEditor";
import IconButton from "components/IconButton";
import Spinner from "components/Spinner";
import Restricted from "utils/Restricted";

import api from "services/api";
import "./styles.css";

function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);

  const getIssues = async (id) => {
    navigate(`/issues?projectId=${id}`);
  };

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
      <div className="card">
        <table className="table lg-table nowrap">
          <thead className="table-dark">
            <tr className="text-center">
              <th>No.</th>
              <th>Name</th>
              <th>Issues</th>
              <th>Created</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index} onClick={() => getIssues(project.id)}>
                <td className="text-center">{index}</td>
                <td className="text-truncate">{project.name}</td>
                <td className="text-center">{project.issues}</td>
                <td className="text-center">
                  {new Date(project.createdAt).toDateString()}
                </td>
                <td className="text-truncate">
                  {project.description}
                </td>
                <td className="text-center">
                  <IconButton
                    variant={"bi bi-three-dots-vertical"}
                    onClick={() => alert("Not implemented yet")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  useEffect(() => {
    populateTableData();
  }, []);

  return (
    <>
      <Restricted to={"Admin"}>
        <ProjectEditor display={modalState} onClose={handleModal} />
      </Restricted>
      <div className="d-flex justify-content-between py-3">
        <h5>All Projects</h5>
        <div className="">
          <Restricted to={"Admin"}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModal}
            >
              New Project
            </button>
          </Restricted>
        </div>
      </div>
      {loading ? <Spinner /> : renderProjectsTable(projects)}
    </>
  );
}

export default Projects;
