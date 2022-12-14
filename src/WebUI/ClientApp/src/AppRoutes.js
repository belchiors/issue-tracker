import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "pages/Layout";

import Home from "pages/Home";
import Issues from "pages/Issues";
import Projects from "pages/Projects";

import IssueEditor from "pages/IssueEditor";
import ProjectEditor from "pages/ProjectEditor";

import IssueView from "pages/IssueView";

import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";

import { isAuthenticated } from "services/auth";

function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/account/signin" replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route index path="" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="issues" element={<PrivateRoute><Issues /></PrivateRoute>} />
        <Route path="issues/:issueId" element={<PrivateRoute><IssueView /></PrivateRoute>} />
        <Route path="issues/edit" element={<PrivateRoute><IssueEditor /></PrivateRoute>} />
        <Route path="issues/edit/:issueId" element={<PrivateRoute><IssueEditor /></PrivateRoute>} />
        <Route path="projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
        <Route path="projects/edit" element={<PrivateRoute><ProjectEditor /></PrivateRoute>} />
      </Route>
      <Route path="/account">
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
