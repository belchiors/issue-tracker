import './styles.css';

function IconButton(props) {
  return (
    <div className="dropdown px-3">
      <button className="icon-button" onClick={props.onClick}>
        <i className={props.variant}></i>
      </button>
      <div className="dropdown-menu">
        <a className="dropdown-item" href="/">Action</a>
        <a className="dropdown-item" href="/">Another action</a>
        <a className="dropdown-item" href="/">Something else here</a>
      </div>
    </div>
  );
}

export default IconButton;