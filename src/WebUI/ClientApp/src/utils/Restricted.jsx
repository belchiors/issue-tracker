import React, { useContext } from "react";
import PermissionContext from "./PermissionContext";

// This component is meant to be used everywhere a restriction based user is needed
const Restricted = ({ to, children }) => {
  // Connect to the provider using the context and get th curren context value
  const { hasRole } = useContext(PermissionContext);

  // If the user has the given permission, render the children, otherwise, do not render anything
  return hasRole(to) ? <>{children}</> : null;
};

export default Restricted;
