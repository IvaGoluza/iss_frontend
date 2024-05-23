import React from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

export default function ApplicationFrame() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
