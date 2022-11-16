import React from "react";
import PermissionContext from "./PermissionContext";

const PermissionProvider = ({ role, children }) => {

  // This methods return wheter the user has the permission passed as parameter
  const hasRole = (value) => value === role;

  // This component will render its children wrapped around a PermissionContext
  // provider whose value is set to the method defined above.
  return (
    <PermissionContext.Provider value={{hasRole}}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;