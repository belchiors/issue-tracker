import React from 'react';
import ModalDialog from 'components/ModalDialog';

function ProjectEditor(props) {
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
      title="New Project"
      display={props.display}
      onSubmit={onSubmit}
      onClose={onClose}
    >
      <form className="">
        <div className="form-group">
          <label className="col-form-label">Name</label>
          <input className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label className="col-form-label">URL</label>
          <input className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label className="col-form-label">Description</label>
          <textarea className="form-control" rows="10"></textarea>
        </div>
        <div className="form-group">
          <label className="col-form-label">Members</label>
          <select className="form-select" multiple>
            <option value="0">None</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Fix</option>
            <option value="6">Six</option>
            <option value="7">Seven</option>
            <option value="8">Eight</option>
            <option value="9">Nine</option>
          </select>
        </div>
      </form>
    </ModalDialog>
  );
}

export default ProjectEditor;