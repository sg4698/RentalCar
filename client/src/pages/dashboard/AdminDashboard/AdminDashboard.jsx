// src/pages/dashboard/AdminDashboard/AdminDashboard.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSideBar";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-white-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
