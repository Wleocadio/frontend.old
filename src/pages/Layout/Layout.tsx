import React from 'react';
import Dashboard from '../Dashboard/Dashboard';

const Layout: React.FC<{ content: React.ReactNode }> = ({}) => {
  return (
    <div>
      <Dashboard />      
    </div>
  );
};

export default Layout;