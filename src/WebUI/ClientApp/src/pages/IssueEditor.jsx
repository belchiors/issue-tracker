import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Restricted from "utils/Restricted";

import api from "services/api";

function IssueEditor() {
  const navigate = useNavigate();
  const { issueId } = useParams();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    summary: null,
    description: null,
    priority: null,
    status: null,
    projectId: null,
    assigneeId: null,
  });

  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = formData.id
      ? api.put("/api/issues", formData)
      : api.post("/api/issues", formData);

    response
      .then((response) => {
        navigate("/issues");
      })
      .catch((error) => {
        if (error.response) {
          setErrors([error.response.data]);
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

  const handleDelete = async (issueId) => {
    if (window.confirm("Delete issue? This action cannot be undone.")) {
      const response = await api.delete(`api/issues/${issueId}`);
      window.location.reload(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const fetchProjects = async () => {
    const response = await api.get("api/projects");
    const data = response.data;
    setProjects(data);
  };

  const fetchMembers = async () => {
    const response = await api.get("api/users");
    const data = response.data;
    setMembers(data);
  };

  const fetchIssue = async (issueId) => {
    const response = await api.get(`api/issues/${issueId}`);
    const data = response.data;
    setFormData(data);
  };

  useEffect(() => {
    fetchProjects();
    fetchMembers();

    // Fetch and populate formData for editor mode
    if (issueId != null) fetchIssue(issueId);
  }, []);

  return (
    <div className="container">
      <h4>Create a new issue</h4>
      {errors.length > 0 && (
        <div className="alert alert-danger m-3 px-4">
          <ul className="list-group">
            {errors.map((error) => (
              <li>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={onSubmit}>
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
                value={formData.assigneeId}
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
            {formData.id ? (
              <div className="form-group">
                <div className="group-label">
                  <label className="col-form-label">Status</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    value="0"
                    checked={formData.status === "0"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Open</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    value="1"
                    checked={formData.status === "1"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Fixed</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    value="2"
                    checked={formData.status === "2"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Closed</label>
                </div>
              </div>
            ) : null}
          </Restricted>
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
        </div>
        <div className="mt-3">
          <button className="btn btn-primary" type="submit">
            {formData.id ? "Apply changes" : "Create Issue"}
          </button>
          {formData.id ? (
            <Restricted to={"Admin"}>
              <button
                className="btn btn-secondary m-2"
                type="button"
                onClick={() => handleDelete(issueId)}
              >
                Delete
              </button>
            </Restricted>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default IssueEditor;
