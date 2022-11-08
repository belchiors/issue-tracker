import React from 'react';
import ModalDialog from 'components/ModalDialog';

function IssueEditor(props) {
  const onSubmit = () => {
    console.log('Submitting form');
    props.onClose();
  }

  const onClose = () => {
    console.log('Cleaning form');
    props.onClose();
  }

  return (
    <ModalDialog
      title="New Issue"
      display={props.display}
      onSubmit={onSubmit}
      onClose={onClose}
    >
      <form>
        <div className="form-group">
          <label htmlFor="recipient-name" className="col-form-label">Title</label>
          <input type="text" className="form-control" id="recipient-name" />
        </div>
        <div className="form-group">
          <label htmlFor="message-text" className="col-form-label">Description</label>
          <textarea className="form-control" rows="10"></textarea>
        </div>
        <div className="form-details">
          <div className="form-group">
            <div className="group-label">
              <label className="col-form-label">Priority</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="P01" value="0"/>
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
    </ModalDialog>
  )
}

export default IssueEditor;