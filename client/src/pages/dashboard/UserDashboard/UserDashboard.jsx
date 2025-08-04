import React from 'react';
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
 return (
    <div>
      {/* Navigation/Header for UserDashboard */}
      <Outlet />
    </div>
  );
};

export default UserDashboard;
