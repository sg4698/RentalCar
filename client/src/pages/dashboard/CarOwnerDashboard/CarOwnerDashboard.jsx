// import React from 'react';

// const CarOwnerDashboard = () => {
//   return <div className="p-4">📦 Car Owner Dashboard - Create & Manage your cars.</div>;
// };

// export default CarOwnerDashboard;


import { Outlet, useLocation } from 'react-router-dom';
import CarOwnerSidebar from '../../../components/CarOwnerSidebar';

const CarOwnerDashboard = () => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-white-50  text-gray-900">
      <CarOwnerSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet key={location.pathname}  />
      </div>
    </div>
  );
};

export default CarOwnerDashboard;
