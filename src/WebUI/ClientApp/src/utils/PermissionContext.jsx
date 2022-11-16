import React from "react";

const defaultBehavior = {
  hasRole: () => false,
};

// Creates a permission context object. When React renders a component
// that subscribes to this context it will read the current context value
// from the closed matching provider above in the tree.
const PermissionContext = React.createContext(defaultBehavior);

export default PermissionContext;