// src/components/Sidebar/AdminSidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import {
  MdDashboard, MdPeople, MdDirectionsCar, MdAttachMoney, MdNotifications,
  MdLogout, MdBarChart, MdMessage, MdSettings, MdRateReview,
  MdManageAccounts, MdSupport, MdArticle, MdAccountCircle
} from "react-icons/md";
import SidebarItem from "./SidebarItem";

const AdminSidebar = () => {
  const location = useLocation();

  const renderSubLink = (to, label) => {
    const isActive = location.pathname === to;
    return (
      <NavLink
        to={to}
        key={to}
        className={`block px-6 py-1.5 text-sm rounded transition whitespace-nowrap overflow-hidden text-ellipsis ${
          isActive ? "text-blue-700 font-medium bg-blue-50" : "text-gray-600 hover:text-blue-600"
        }`}
      >
        {label}
      </NavLink>
    );
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 pl-2 whitespace-nowrap">
        Admin Panel
      </h2>

      <NavLink
        to="/dashboard/admin/overview"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 mb-1 rounded hover:bg-blue-100 transition ${
            isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"
          }`
        }
      >
        <MdDashboard className="text-xl" />
        <span className="whitespace-nowrap">Overview</span>
      </NavLink>

      <SidebarItem icon={MdPeople} label="User Management">
        {renderSubLink("/dashboard/admin/users", "All Users")}
        {renderSubLink("/dashboard/admin/users/banned", "Banned Users")}
        {renderSubLink("/dashboard/admin/users/filter", "Filter by Role")}
      </SidebarItem>

      <SidebarItem icon={MdDirectionsCar} label="Car Management">
        {renderSubLink("/dashboard/admin/cars", "All Cars")}
        {renderSubLink("/dashboard/admin/cars/pending", "Pending Approvals")}
        {renderSubLink("/dashboard/admin/cars/edit", "Edit/Delete Cars")}
      </SidebarItem>

      <SidebarItem icon={MdAttachMoney} label="Booking Management">
        {renderSubLink("/dashboard/admin/bookings", "All Bookings")}
        {renderSubLink("/dashboard/admin/bookings/fraud", "Fraudulent Bookings")}
      </SidebarItem>

      <SidebarItem icon={MdBarChart} label="Earnings / Transactions">
        {renderSubLink("/dashboard/admin/earnings/platform", "Platform Earnings")}
        {renderSubLink("/dashboard/admin/earnings/payouts", "Car Owner Payouts")}
        {renderSubLink("/dashboard/admin/earnings/refunds", "Refunds")}
      </SidebarItem>

      <SidebarItem icon={MdManageAccounts} label="Car Owner Requests">
        {renderSubLink("/dashboard/admin/requests", "All Requests")}
        {renderSubLink("/dashboard/admin/requests/review", "Review Profile")}
      </SidebarItem>

      <SidebarItem icon={MdBarChart} label="Reports & Analytics">
        {renderSubLink("/dashboard/admin/reports/earnings", "Earnings Report")}
        {renderSubLink("/dashboard/admin/reports/activity", "User Activity")}
        {renderSubLink("/dashboard/admin/reports/bookings", "Booking Trends")}
      </SidebarItem>

      <SidebarItem icon={MdRateReview} label="Reviews & Ratings">
        {renderSubLink("/dashboard/admin/reviews", "All Reviews")}
        {renderSubLink("/dashboard/admin/reviews/abusive", "Abusive Reviews")}
      </SidebarItem>

      <NavLink
        to="/dashboard/admin/notifications"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 mt-1 rounded hover:bg-blue-100 transition ${
            isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"
          }`
        }
      >
        <MdNotifications className="text-xl" />
        <span className="whitespace-nowrap">Notifications</span>
      </NavLink>

      <NavLink
        to="/dashboard/admin/support"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 mt-1 rounded hover:bg-blue-100 transition ${
            isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"
          }`
        }
      >
        <MdSupport className="text-xl" />
        <span className="whitespace-nowrap">Support</span>
      </NavLink>

      <SidebarItem icon={MdArticle} label="CMS">
        {renderSubLink("/dashboard/admin/cms/terms", "Terms & Conditions")}
        {renderSubLink("/dashboard/admin/cms/banner", "Homepage Banner")}
      </SidebarItem>

      <SidebarItem icon={MdAccountCircle} label="Admin Profile">
        {renderSubLink("/dashboard/admin/profile", "View Profile")}
        {renderSubLink("/dashboard/admin/profile/password", "Change Password")}
      </SidebarItem>

      <SidebarItem icon={MdSettings} label="Settings">
        {renderSubLink("/dashboard/admin/settings/general", "General")}
        {renderSubLink("/dashboard/admin/settings/roles", "Roles & Permissions")}
        {renderSubLink("/dashboard/admin/settings/payments", "Payment Settings")}
      </SidebarItem>

      <NavLink
        to="/logout"
        className="flex items-center gap-3 px-4 py-2 mt-6 text-red-600 hover:bg-red-100 rounded transition"
      >
        <MdLogout className="text-xl" />
        <span className="whitespace-nowrap">Logout</span>
      </NavLink>
    </aside>
  );
};

export default AdminSidebar;
