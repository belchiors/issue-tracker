import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from 'pages/Layout';
import Home from 'pages/Home';
import Issues from 'pages/Issues';
import Projects from 'pages/Projects';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

import { isAuthenticated } from 'services/auth';

function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to='/account/signin' replace />
  }
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route exact path='/' element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index path="" element={<Home />} />
        <Route path='issues' element={<Issues />} />
        <Route path='projects' element={<Projects />} />
      </Route>
      <Route path='/account'>
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
