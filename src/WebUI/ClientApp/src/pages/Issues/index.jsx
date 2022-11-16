import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import IssueEditor from "components/IssueEditor";
import IconButton from "components/IconButton";
import Spinner from "components/Spinner";

import "./styles.css";
import api from "services/api";

function Issues(props) {
  const query = new URLSearchParams(useLocation().search);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);

  const handleModal = () => {
    setModalState(!modalState);
  };

  const populateTableData = async (qs) => {
    const response = await api.get(`api/issues${qs && "?" + qs}`);
    const data = response.data;
    setIssues(data);
    setLoading(false);
  };

  const renderIssuesTable = (issues) => {
    return (
      <div className="card">
        <table className="table lg-table nowrap">
          <thead className="table-dark">
            <tr className="text-center">
              <th>No.</th>
              <th>Title</th>
              <th>Reporter</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, index) => (
              <tr key={index} onClick={() => alert(issue.id)}>
                <td className="text-center">{index}</td>
                <td className="text-truncate">{issue.title}</td>
                <td className="text-center">{issue.reporter}</td>
                <td className="text-center">{issue.status}</td>
                <td className="text-center">{issue.priority}</td>
                <td className="text-center">
                  {new Date(issue.createdAt).toDateString()}
                </td>
                <td className="text-center">
                  {new Date(issue.updatedAt).toDateString()}
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
    const qs = query.toString();
    populateTableData(qs);
  }, []);

  return (
    <>
      <IssueEditor display={modalState} onClose={handleModal} />
      <div className="d-flex justify-content-between align-items-center py-3">
        <h5>Issues</h5>
        <div className="">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleModal}
          >
            Submit Issue
          </button>
        </div>
      </div>
      {loading ? <Spinner /> : renderIssuesTable(issues)}
    </>
  );
}

export default Issues;
