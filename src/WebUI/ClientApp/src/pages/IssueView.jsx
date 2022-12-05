import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "services/api";

function IssueView() {
  const { issueId } = useParams();
  const [loading, setLoading] = useState(true);
  const [issue, setIssue] = useState(null);

  const fetchIssue = async (issueId) => {
    const response = await api.get(`api/issues/${issueId}`);
    const data = response.data;
    setIssue(data);
  };

  useEffect(() => {
    fetchIssue(issueId);
    setLoading(false);
  }, []);

  return loading ? (
    <div className="loading-spinner">
      <div className="spinner-border text-primary"></div>
    </div>
  ) : (
    <>
      <div className="detail-page-header">
        <span className="badge bg-primary m-1">{issue?.status}</span>
        <span className="badge bg-primary m-1">{issue?.priority}</span>
        <span className="">Created </span>
        <span className="">{new Date(issue?.createdAt).toDateString()}</span>
        <span className="">
          {" "}
          by {`${issue?.reporter.firstName} ${issue?.reporter.lastName}`}
        </span>
      </div>
      <div className="page-header">
        <h4 className="title">{issue?.summary}</h4>
      </div>
      <div className="">{issue?.description}</div>
    </>
  );
}

export default IssueView;
