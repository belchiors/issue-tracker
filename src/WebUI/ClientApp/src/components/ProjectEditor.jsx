import React, { useState } from "react";

import api from "services/api";

function ProjectEditor(props) {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await api
      .post("/api/projects/", formData)
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
    props.onClose();
  };

  return (
    <div className={props.display ? "modal modal-lg show" : "modal"}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Project</h5>
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
                <label className="col-form-label">Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">URL</label>
                <input
                  className="form-control"
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
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
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={onSubmit}>
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

export default ProjectEditor;
