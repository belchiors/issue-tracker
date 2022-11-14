import React from 'react';

function IssueEditor(props) {
  const onSubmit = () => {
    alert('Submitting form');
    props.onClose();
  }

  const onClose = () => {
    console.log('Cleaning form');
    props.onClose();
  }

  return (
    <div className={props.display ? 'modal modal-lg show' : 'modal'}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Issue</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label className="col-form-label">Title</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="col-form-label">Description</label>
                <textarea className="form-control" rows="10" required></textarea>
              </div>
              <div className="form-details">
                <div className="form-group">
                  <div className="group-label">
                    <label className="col-form-label">Priority</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="P01" value="0" />
                    <label className="form-check-label">P01</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="P01" value="1" />
                    <label className="form-check-label">P01</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="P01" value="2" />
                    <label className="form-check-label">P01</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="P01" value="3" />
                    <label className="form-check-label">P01</label>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-form-label">Project</label>
                  <select className="form-select">
                    <option value='0' defaultValue={0}>None</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="col-form-label">Assignees</label>
                  <select className="form-select">
                    <option value="0" defaultValue={0}>None</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" type="submit">Submit</button>
            <button className="btn btn-secondary" type="button" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueEditor;