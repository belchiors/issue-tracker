import React, { useEffect, useState } from "react";
import Restricted from "utils/Restricted";

import api from "services/api";

function IssueEditor({ issue, display, onClose }) {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    summary: "",
    description: "",
    priority: "",
    status: "",
    projectId: "",
    assignee: "",
  });

  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await api
      .put("/api/issues", formData)
      .then((response) => {
        onClose();
        window.location.reload(true);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          // Set errors for response errors, usually reponse errors are unique and
          // does not occur at the same time as validation errors, so there is no reason
          // to append here.
          setErrors([error.response.data]);

          // Validation errors are stored in an errors object that is null when
          // no validation errors are returned from the server. A validation errors
          // can occur for one or more fields each with possible more than one error.
          const validationErrors = error.response.data.errors;
          if (validationErrors != null) {
            const fieldErrors = [];
            for (let field in validationErrors) {
              validationErrors[field].map((err) => fieldErrors.push(err));
            }
            setErrors(fieldErrors);
          }
        } else {
          alert(error.message);
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const populateProjectsList = async () => {
    const response = await api.get("api/projects");
    const data = response.data;
    setProjects(data);
  };

  const populateMembers = async () => {
    const response = await api.get("api/users");
    const data = response.data;
    setMembers(data);
  };

  useEffect(() => {
    populateProjectsList();
    populateMembers();
  }, []);

  return (
    <div className={display ? "modal modal-lg show" : "modal"}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create a new issue</h5>
          </div>
          {errors.length > 0 && (
            <div className="alert alert-danger m-3 px-4" role="alert">
              <ul className="list-group">
                {errors.map((error) => (
                  <li>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label className="col-form-label">Sumary</label>
                <input
                  type="text"
                  className="form-control"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="10"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-details">
                <Restricted to={"Admin"}>
                  <div className="form-group">
                    <div className="group-label">
                      <label className="col-form-label">Priority</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        value="0"
                        checked={formData.priority === "0"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">None</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        value="1"
                        checked={formData.priority === "1"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Normal</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        value="2"
                        checked={formData.priority === "2"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Critical</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        value="3"
                        checked={formData.priority === "3"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Major</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Assign Member</label>
                    <select
                      className="form-select"
                      value={formData.assignee}
                      onChange={handleChange}
                    >
                      <option value="">-- Assign Member --</option>
                      {members.map((member) => (
                        <option value={member?.id}>
                          {`${member?.firstName} ${member?.lastName}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </Restricted>
                {issue?.id !== null ? (
                  <div className="form-group">
                    <label className="col-form-label">Project</label>
                    <select
                      className="form-select"
                      name="projectId"
                      value={formData.projectId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Project --</option>
                      {projects.map((project) => (
                        <option value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>
                ) : null}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              type="button"
              onClick={onSubmit}
            >
              Submit
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueEditor;
