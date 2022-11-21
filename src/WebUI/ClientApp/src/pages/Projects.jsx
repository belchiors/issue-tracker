import React, { useState, useEffect } from "react";

import DataTable from "components/DataTable";
import Restricted from "utils/Restricted";
import ProjectEditor from "components/ProjectEditor";

import api from "services/api";

const columns = [
  {
    label: "Name",
    field: "name"
  },
  {
    label: "Created",
    field: "createdAt",
    render: (date) => new Date(date).toDateString(),
  },
  {
    label: "Description",
    field: "description"
  },
];

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

  useEffect(() => {
    populateTableData();
  }, []);

  return loading ? <div className="d-flex justify-content-center">
      <div className="loader spinner-grow" role="status"></div>
    </div> : (
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
      <DataTable
        columns={columns}
        dataSource={projects}
      />
    </>
  );
}

export default Projects;
