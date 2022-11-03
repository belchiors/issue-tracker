import React from 'react';
import { EditorModal } from 'components/EditorModal';

export class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onSubmit() {
    console.log('Submitting form');
    this.props.onClose();
  }

  onClose() {
    console.log('Cleaning form');
    this.props.onClose();
  }
  
  render() {
    return (
      <EditorModal
        title="New Project"
        display={this.props.display}
        onSubmit={this.onSubmit}
        onClose={this.onClose}
      >
        <form>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Name</label>
            <input type="text" className="form-control" id="recipient-name" />
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Description</label>
            <textarea className="form-control" id="message-text"></textarea>
          </div>
        </form>
      </EditorModal>
    );
  }
}