import { Children, useState } from "react";

function Dropdown(props) {
  const [shouldOpen, setState] = useState(false);

  const handleDropdown = () => {
    setState(!shouldOpen);
  };

  return (
    <div className="dropdown" onClick={handleDropdown}>
      {props.children}
      {shouldOpen ? (
        <div className="dropdown-menu show">
          {props.menu.map((item) => (
            <div className="dropdown-item">{item}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Dropdown;
