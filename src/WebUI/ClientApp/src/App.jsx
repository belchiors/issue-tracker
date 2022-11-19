import React from "react";
import AppRoutes from "AppRoutes";
import PermissionProvider from "utils/PermissionProvider";
import { getCurrentUser } from "services/auth";

function App() {
  const user = getCurrentUser();
  return (
    <PermissionProvider role={user?.role}>
      <AppRoutes />
    </PermissionProvider>
  );
}

export default App;
