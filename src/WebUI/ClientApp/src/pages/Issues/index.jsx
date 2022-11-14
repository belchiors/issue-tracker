import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import IssueEditor from 'components/IssueEditor';
import IconButton from 'components/IconButton';

import './styles.css';

function Issues(props) {
  const query = new URLSearchParams(useLocation().search);
  const [issues, setIssues] = useState([]);
  const [modalState, setModalState] = useState(false);

  const handleModal = () => {
    setModalState(!modalState);
  }

  const populateTableData = async (qs) => {
    const response = await fetch(`api/issues${qs && '?' + qs}`);
    const data = await response.json();
    setIssues(data);
  }

  useEffect(() => {
    const qs = query.toString();
    populateTableData(qs);
  }, [])

  return (
    <div className="outlet">
      <IssueEditor
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
            onClick={handleModal}>New Issue</button>
        </div>
      </div>
      <table className="table table-hover lg-table nowrap">
        <thead className="table-dark">
          <tr className="text-center">
            <th>No.</th>
            <th>Title</th>
            <th>Issues</th>
            <th>Created</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, index) => 
            <tr key={index} onClick={() => alert(issue.id)}>
              <td className="text-center">{index}</td>
              <td className="text-center">{issue.name}</td>
              <td className="text-center">{issue.issues}</td>
              <td className="text-center">{new Date(issue.createdAt).toDateString()}</td>
              <td className="text-center">{issue.description}</td>
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

export default Issues;