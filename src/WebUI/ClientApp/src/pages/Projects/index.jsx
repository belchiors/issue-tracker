import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectEditor from 'components/ProjectEditor';
import IconButton from 'components/IconButton';

import './styles.css';

function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [modalState, setModalState] = useState(false);

  const getIssues = async (id) => {
    navigate(`/issues?projectId=${id}`);
  }

  const handleModal = () => {
    setModalState(!modalState);
  }

  const populateTableData = async () => {
    const response = await fetch('api/projects');
    const data = await response.json();
    setProjects(data);
  }

  useEffect(() => {
    populateTableData();
  }, [])

  return (
    <div className="outlet">
      <ProjectEditor
        display={modalState}
        onClose={handleModal}
      />
      <div className="toolbar">
        <div className="">
          <input type="text" className="form-control search-input" placeholder="Search" />
        </div>
        <div className="">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleModal}>New Project</button>
        </div>
      </div>
      <table className="table table-hover lg-table nowrap">
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
          {projects.map((project, index) => 
            <tr key={index} onClick={() => getIssues(project.id)}>
              <td className="text-center">{index}</td>
              <td className="text-center">{project.name}</td>
              <td className="text-center">{project.issues}</td>
              <td className="text-center">{new Date(project.createdAt).toDateString()}</td>
              <td className="text-center">{project.description}</td>
              <td className="text-center">
                <IconButton
                  variant={"bi bi-three-dots-vertical"}
                  onClick={() => alert('Not implemented yet')}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Projects;