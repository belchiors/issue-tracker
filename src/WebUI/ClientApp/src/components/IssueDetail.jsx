import React, { useEffect, useState } from "react";
import api from "services/api";
import Restricted from "utils/Restricted";
import IconButton from "components/IconButton";

function IssueDetail(props) {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    title: props.issue?.title,
    description: props.issue?.description,
    priority: props.issue?.priority,
    status: props.issue?.status,
    assignees: [props.issue?.assignees],
  });

  const [members, setMembers] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    await api
      .post("/api/issues", formData)
      .then((response) => {
        props.onClose();
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

  const onClose = () => {
    console.log("Cleaning form");
    props.onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const populateMembers = async () => {
    const response = await api.get("api/projects");
    const data = response.data;
    setMembers(data);
  };

  useEffect(() => {}, []);

  return (
    <div className={props.display ? "modal modal-lg show" : "modal"}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detail</h5>
            <IconButton
              variant="bi bi-trash3"
              onClick={() => alert("Delete?")}
            />
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
            <div className="title mb-3">
              <h4 className="title">{props.issue?.title}</h4>
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="10"
                name="description"
                value={props.issue?.description}
                readOnly={true}
              ></textarea>
            </div>
            <div className="form-details">
              <Restricted to={"Admin"}>
                <form>
                  <div className="form-group">
                    <label className="col-form-label">Assign Member</label>
                    <select
                      className="form-select"
                      value={formData.assignees}
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
                </form>
              </Restricted>
            </div>
          </div>
          <div className="modal-footer">
            <Restricted to={"Admin"}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={onSubmit}
              >
                Save changes
              </button>
            </Restricted>
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

export default IssueDetail;
