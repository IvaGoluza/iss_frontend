import React from 'react';

import { Route, Routes } from 'react-router-dom';

import ApplicationFrame from './pages/ApplicationFrame';
import Home from './pages/Home/Home';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationFrame />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<div className="h1">Page not found</div>} />
    </Routes>
  );
}
