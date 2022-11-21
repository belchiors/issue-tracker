import React, { useState, useEffect } from "react";

import DataTable from "components/DataTable";
import Spinner from "components/Spinner";
import Dropdown from "components/Dropdown";

import IssueEditor from "components/IssueEditor";

import api from "services/api";

function Issues() {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);

  const columns = [
    {
      label: "Summary",
      field: "summary",
    },
    {
      label: "Reporter",
      field: "reporter",
      render: ({ reporter }) => `${reporter.firstName} ${reporter.lastName}`,
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
      label: "Action",
      render: (issue) => (
        <div className="d-flex flex-row">
          <span onClick={() => handleModal(issue)}>
            <i className="bi bi-btn bi-eye"></i>
          </span>
          <span  onClick={() => handleModal(issue)}>
            <i className="bi bi-btn bi-pencil-square"></i>
          </span>
          <span onClick={() => deleteIssue(issue.id)}>
            <i className="bi bi-btn bi-trash3"></i>
          </span>
        </div>
      ),
    },
  ];

  const handleModal = (issue) => {
    setSelectedIssue(issue);
    setModalState(!modalState);
  };

  const deleteIssue = async (issueId) => {
    if (window.confirm("Delete issue? This action cannot be undone."))
      await api.delete("api/issues", issueId);
  };

  const populateTableData = async () => {
    const response = await api.get(`api/issues`);
    const data = response.data;
    setIssues(data);
    setLoading(false);
  };

  useEffect(() => {
    populateTableData();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <IssueEditor
        issue={selectedIssue}
        display={modalState}
        onClose={handleModal}
      />
      <div className="toolbar">
        <h4 className="title">Issues</h4>
        <div className="">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleModal}
          >
            Create Issue
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        dataSource={issues}
      />
    </>
  );
}

export default Issues;
