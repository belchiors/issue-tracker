import './styles.css';

function IconButton(props) {
  const onClick = (event) => {
    event.stopPropagation();
    props.onClick();
  }
  return (
    <div className="icon-button dropdown px-3">
      <button className="btn-icon" onClick={onClick}>
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