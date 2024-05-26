import React from 'react';

import { Route, Routes } from 'react-router-dom';

import ApplicationFrame from './pages/ApplicationFrame';
import Employees from './pages/Employees/Employees';
import EmployeePage from './pages/Employees/EmployeePage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationFrame />}>
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeePage />} />
      </Route>
      <Route path="*" element={<div className="h1">Page not found</div>} />
    </Routes>
  );
}
