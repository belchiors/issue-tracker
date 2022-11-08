import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from 'pages/MainLayout';
import AppRoutes from './AppRoutes';

import './custom.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Route>
    </Routes>
  );
}

export default App;
