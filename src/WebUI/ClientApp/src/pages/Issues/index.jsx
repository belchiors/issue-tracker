import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import IssueEditor from "components/IssueEditor";
import Spinner from "components/Spinner";

import "./styles.css";
import api from "services/api";
import IssueDetail from "components/IssueDetail";

function Issues() {
  const query = new URLSearchParams(useLocation().search);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state modifiers
  const [modalState, setModalState] = useState(false);
  const [modalDetailState, setDetailModalState] = useState(false);
  const [ detailData, setDetailModalData ] = useState(null);

  const handleModal = () => {
    setModalState(!modalState);
  };

  const handleDetailModal = () => {
    setDetailModalState(!modalDetailState);
  }

  const populateTableData = async (qs) => {
    const response = await api.get(`api/issues${qs && "?" + qs}`);
    const data = response.data;
    setIssues(data);
    setLoading(false);
  };

  const renderIssuesTable = (issues) => {
    return (
      <table className="table table-hover table-bordered">
        <thead className="table-light">
          <tr className="">
            <th className="text-center">#</th>
            <th className="text-center">Title</th>
            <th className="text-center">Reporter</th>
            <th className="text-center">Status</th>
            <th className="text-center">Priority</th>
            <th className="text-center">Created</th>
            <th className="text-center">Updated</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, index) => (
            <tr key={index} onClick={() => {
              setDetailModalData(issue);
              handleDetailModal();
            }}>
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
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    const qs = query.toString();
    populateTableData(qs);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <IssueDetail
        issue={detailData}
        display={modalDetailState}
        onClose={handleDetailModal}
      />
      <IssueEditor display={modalState} onClose={handleModal} />
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
      <div className="data-table">
        <div className="data-table-header"></div>
        <div className="data-table-body table-responsive">
          {renderIssuesTable(issues)}
        </div>
        <div className="data-table-footer">
          <div>Showing 1 to 50 of {issues.length} entries</div>
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

export default Issues;
