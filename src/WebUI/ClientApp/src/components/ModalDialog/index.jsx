import './styles.css';

function ModalDialog(props) {
  return (
    <div className={props.display ? 'modal modal-lg show' : 'modal'}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={props.onSubmit}>Submit</button>
            <button type="button" className="btn btn-secondary" onClick={props.onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDialog;