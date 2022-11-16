import React from "react";
import AppRoutes from "AppRoutes";
import PermissionProvider from "utils/PermissionProvider";
import { getCurrentUser } from "services/auth";

function App() {
  return (
    <PermissionProvider role={getCurrentUser()}>
      <AppRoutes />
    </PermissionProvider>
  );
}

export default App;
