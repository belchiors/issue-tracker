import React, { useState, useEffect } from "react";

import DataTable from "components/DataTable";
import Restricted from "utils/Restricted";
import ProjectEditor from "pages/ProjectEditor";

import api from "services/api";
import { Link } from "react-router-dom";

const columns = [
  {
    label: "Name",
    field: "name"
  },
  {
    label: "URL",
    field: "url",
    render: ({url}) => <a href={url}>{url}</a>
  },
  {
    label: "Created",
    field: "createdAt",
    render: ({createdAt}) => 
      new Date(createdAt).toDateString(),
  },
  {
    label: "Issues",
    field: "issues"
  },
  {
    label: "Description",
    field: "description"
  },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);


  const populateDataTable = async () => {
    const response = await api.get("api/projects");
    const data = response.data;
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    populateDataTable();
  }, []);

  return loading ? (
    <div className="loading-spinner">
      <div class="spinner-border text-primary"></div>
    </div>
  ) : (
    <>
      <div className="page-header">
        <h4 className="title">
          Projects
        </h4>
        <Restricted to={"Admin"}>
          <Link
            className="btn btn-primary"
            to="/projects/new"
          >
            Create Project
          </Link>
        </Restricted>
      </div>
      <div className="table-responsive">
        <DataTable
          columns={columns}
          dataSource={projects}
        />
      </div>
    </>
  );
}

export default Projects;
