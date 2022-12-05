import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import DataTable from "components/DataTable";
import Restricted from "utils/Restricted";

import api from "services/api";

function Issues() {
  const [searchParams] = useSearchParams();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      label: "Summary",
      field: "summary",
      render: ({ id, summary }) => (
        <Link to={`/issues/${id}`}>{`${summary}`}</Link>
      ),
    },
    {
      label: "Reporter",
      field: "reporter",
      render: ({ reporter }) => `${reporter.firstName} ${reporter.lastName}`,
    },
    {
      label: "Assignee",
      field: "assignee",
      render: ({ assignee }) =>
        assignee
          ? `${assignee?.firstName} ${assignee?.lastName}`
          : "Unassigned",
    },
    {
      label: "Status",
      field: "status",
    },
    {
      label: "Priority",
      field: "priority",
    },
    {
      label: "Created",
      field: "createdAt",
      render: ({ createdAt }) => new Date(createdAt).toDateString(),
    },
    {
      label: "Updated",
      field: "updatedAt",
      render: ({ updatedAt }) => new Date(updatedAt).toDateString(),
    },
    {
      label: "Project",
      render: ({ project }) => `${project.name}`,
    },
    {
      label: "Action",
      render: ({ id }) => (
        <Restricted to={"Admin"}>
          <Link className="action" to={`/issues/edit/${id}`}>
            <i className="bi bi-pencil-square"></i>
          </Link>
        </Restricted>
      ),
    },
  ];

  const populateDataTable = async () => {
    const response = await api.get(`api/issues?${searchParams.toString()}`);
    const data = response.data;
    setIssues(data);
    setLoading(false);
  };

  useEffect(() => {
    populateDataTable();
  }, []);

  return loading ? (
    <div className="loading-spinner">
      <div className="spinner-border text-primary"></div>
    </div>
  ) : (
    <>
      <div className="page-header">
        <h4 className="title">Issues</h4>
        <Link className="btn btn-primary" to="/issues/edit">
          Report Issue
        </Link>
      </div>
      <div className="table-responsive">
        <DataTable columns={columns} dataSource={issues} />
      </div>
    </>
  );
}

export default Issues;
