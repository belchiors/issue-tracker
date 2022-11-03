import React from 'react';

export class EditorModal extends React.Component {
  render() {
    return (
      <div className={this.props.display ? 'modal modal-lg show' : 'modal'}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.title}</h5>
              <button type="button" className="btn-close" onClick={this.props.onClose}></button>
            </div>
            <div className="modal-body">
              { this.props.children }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.props.onSubmit}>Submit</button>
              <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}