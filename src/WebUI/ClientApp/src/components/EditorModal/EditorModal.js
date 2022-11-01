import React from 'react';

import './EditorModal.css';

export class EditorModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let show = this.props.display ? 'modal modal-lg show' : 'modal';
    return (
      <div className={show}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.title}</h5>
              <button type="button" className="btn-close" onClick={this.props.handleClose}></button>
            </div>
            <div className="modal-body">
              { this.props.children }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Submit</button>
              <button type="button" className="btn btn-secondary" onClick={this.props.handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}