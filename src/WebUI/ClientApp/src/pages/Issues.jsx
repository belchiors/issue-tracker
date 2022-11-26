import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DataTable from "components/DataTable";

import api from "services/api";

function Issues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      label: "Summary",
      field: "summary",
    },
    {
      label: "Reporter",
      field: "reporter",
      render: ({ reporter }) => 
        `${reporter.firstName} ${reporter.lastName}`,
    },
    {
      label: "Assignee",
      field: "assignee",
      render: ({ assignee }) =>
        assignee
          ? `${assignee?.firstName} ${assignee?.lastName}`
          : "Undefined",
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
      render: ({ createdAt }) => 
        new Date(createdAt).toDateString(),
    },
    {
      label: "Updated",
      field: "updatedAt",
      render: ({ updatedAt }) => 
        new Date(updatedAt).toDateString(),
    },
  ];

  const populateDataTable = async () => {
    const response = await api.get(`api/issues`);
    const data = response.data;
    setIssues(data);
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
        <h4 className="title">Issues</h4>
        <Link className="btn btn-primary" to="/issues/new">
          Report Issue
        </Link>
      </div>
      <div className="table-responsive">
        <DataTable
          columns={columns}
          dataSource={issues}
        />
      </div>
    </>
  );
}

export default Issues;
