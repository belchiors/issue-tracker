import React, { useState, useEffect } from 'react';
import ProjectEditor from 'components/ProjectEditor';

import './styles.css';
import DataTable from 'components/DataTable';

const cols = [
  { label: 'No.', field: 'id'},
  { label: 'Title', field: 'title'},
  { label: 'Issues', field: 'issues'},
  { label: 'Created', field: 'createdAt'},
  { label: 'Description', field: 'description'}
]

function Projects() {
  const [ projects, setProjects ] = useState([]);
  const [ modalState, setModalState ] = useState(false);

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
      <DataTable
        data={projects}
        columns={cols}
      />
    </div>
  );
}

export default Projects;