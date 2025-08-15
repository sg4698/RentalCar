// import { NavLink, useLocation } from "react-router-dom";
// import {
//   MdDashboard,
//   MdPeople,
//   MdDirectionsCar,
//   MdAttachMoney,
//   MdNotifications,
//   MdLogout,
//   MdBarChart,
//   MdSettings,
//   MdRateReview,
//   MdManageAccounts,
//   MdSupport,
//   MdArticle,
//   MdAccountCircle,
// } from "react-icons/md";
// import SidebarItem from "./SidebarItem";
// import useLogout from "../hooks/useLogout";

// const AdminSidebar = () => {
//   const location = useLocation();
//   const handleLogout = useLogout();

//   const renderSubLink = (to, label) => {
//     const isActive = location.pathname === to;
//     return (
//       <NavLink
//         to={to}
//         key={to}
//         className={`block px-6 py-1.5 text-sm rounded transition whitespace-nowrap overflow-hidden text-ellipsis ${
//           isActive
//             ? "bg-blue-50 text-blue-700 font-semibold"
//             : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
//         }`}
//       >
//         {label}
//       </NavLink>
//     );
//   };

//   return (
//     <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm p-4">
//       <h2 className="text-2xl font-bold text-blue-600 mb-6 px-2 whitespace-nowrap">
//         Admin Panel
//       </h2>

//       <NavLink
//         to="/dashboard/admin/overview"
//         className={({ isActive }) =>
//           `flex items-center gap-3 px-4 py-2 mb-1 rounded transition ${
//             isActive
//               ? "bg-blue-100 text-blue-700 font-semibold"
//               : "text-gray-700 hover:bg-blue-50"
//           }`
//         }
//       >
//         <MdDashboard className="text-xl" />
//         <span className="whitespace-nowrap">Overview</span>
//       </NavLink>

//       <SidebarItem icon={MdPeople} label="User">
//         {renderSubLink("/dashboard/admin/users", "All Users")}
//       </SidebarItem>

//       <SidebarItem icon={MdDirectionsCar} label="Car">
//         {renderSubLink("/dashboard/admin/cars/AllCars", "All Cars")}
//         {/* {renderSubLink("/dashboard/admin/cars/pending", "Pending Cars")}
//         {renderSubLink("/dashboard/admin/cars/approved", "Approved Cars")}
//         {renderSubLink("/dashboard/admin/cars/rejected", "Rejected Cars")} */}
//       </SidebarItem>

//       <SidebarItem icon={MdAttachMoney} label="Booking">
//         {renderSubLink("/dashboard/admin/bookings", "All Bookings")}
//         {renderSubLink(
//           "/dashboard/admin/bookings/fraud",
//           "Fraudulent Bookings"
//         )}
//       </SidebarItem>

//       <SidebarItem icon={MdBarChart} label="Earnings / Transactions">
//         {renderSubLink(
//           "/dashboard/admin/earnings/platform",
//           "Platform Earnings"
//         )}
//         {renderSubLink(
//           "/dashboard/admin/earnings/payouts",
//           "Car Owner Payouts"
//         )}
//         {renderSubLink("/dashboard/admin/earnings/refunds", "Refunds")}
//       </SidebarItem>

//       <SidebarItem icon={MdManageAccounts} label="Car Owner Requests">
//         {renderSubLink("/dashboard/admin/requests", "All Requests")}
//         {renderSubLink("/dashboard/admin/requests/review", "Review Profile")}
//       </SidebarItem>

//       <SidebarItem icon={MdBarChart} label="Reports & Analytics">
//         {renderSubLink("/dashboard/admin/reports/earnings", "Earnings Report")}
//         {renderSubLink("/dashboard/admin/reports/activity", "User Activity")}
//         {renderSubLink("/dashboard/admin/reports/bookings", "Booking Trends")}
//       </SidebarItem>

//       <SidebarItem icon={MdRateReview} label="Reviews & Ratings">
//         {renderSubLink("/dashboard/admin/reviews", "All Reviews")}
//         {renderSubLink("/dashboard/admin/reviews/abusive", "Abusive Reviews")}
//       </SidebarItem>

//       <NavLink
//         to="/dashboard/admin/notifications"
//         className={({ isActive }) =>
//           `flex items-center gap-3 px-4 py-2 mt-1 rounded transition ${
//             isActive
//               ? "bg-blue-100 text-blue-700 font-semibold"
//               : "text-gray-700 hover:bg-blue-50"
//           }`
//         }
//       >
//         <MdNotifications className="text-xl" />
//         <span className="whitespace-nowrap">Notifications</span>
//       </NavLink>

//       <NavLink
//         to="/dashboard/admin/support"
//         className={({ isActive }) =>
//           `flex items-center gap-3 px-4 py-2 mt-1 rounded transition ${
//             isActive
//               ? "bg-blue-100 text-blue-700 font-semibold"
//               : "text-gray-700 hover:bg-blue-50"
//           }`
//         }
//       >
//         <MdSupport className="text-xl" />
//         <span className="whitespace-nowrap">Support</span>
//       </NavLink>

//       <SidebarItem icon={MdArticle} label="CMS">
//         {renderSubLink("/dashboard/admin/cms/terms", "Terms & Conditions")}
//         {renderSubLink("/dashboard/admin/cms/banner", "Homepage Banner")}
//       </SidebarItem>

//       <SidebarItem icon={MdAccountCircle} label="Admin Profile">
//         {renderSubLink("/dashboard/admin/profile", "View Profile")}
//         {renderSubLink("/dashboard/admin/profile/password", "Change Password")}
//       </SidebarItem>

//       <SidebarItem icon={MdSettings} label="Settings">
//         {renderSubLink("/dashboard/admin/settings/general", "General")}
//         {renderSubLink(
//           "/dashboard/admin/settings/roles",
//           "Roles & Permissions"
//         )}
//         {renderSubLink(
//           "/dashboard/admin/settings/payments",
//           "Payment Settings"
//         )}
//       </SidebarItem>

//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-3 px-4 py-2 mt-3 text-red-600 hover:bg-red-100 rounded transition w-full"
//       >
//         <MdLogout className="text-xl" />
//         <span className="whitespace-nowrap">Logout</span>
//       </button>
//     </aside>
//   );
// };

// export default AdminSidebar;
import {
  MdDashboard,
  MdPeople,
  MdDirectionsCar,
  MdAttachMoney,
  MdNotifications,
  MdLogout,
  MdBarChart,
  MdManageAccounts,
  MdRateReview,
  MdSupport,
  MdArticle,
  MdAccountCircle,
  MdSettings,
} from "react-icons/md";
import Sidebar from "./Sidebar";
import useLogout from "../hooks/useLogout";

const adminMenu = [
  {
    to: "/dashboard/admin/overview",
    label: "Overview",
    icon: <MdDashboard />,
  },
  {
    key: "user",
    label: "User",
    icon: <MdPeople />,
    subLinks: [{ to: "/dashboard/admin/users", label: "All Users" }],
  },
  {
    key: "car",
    label: "Car",
    icon: <MdDirectionsCar />,
    subLinks: [
      { to: "/dashboard/admin/cars/AllCars", label: "All Cars" },
      // Uncomment if you want to add more
      // { to: "/dashboard/admin/cars/pending", label: "Pending Cars" },
      // { to: "/dashboard/admin/cars/approved", label: "Approved Cars" },
      // { to: "/dashboard/admin/cars/rejected", label: "Rejected Cars" },
    ],
  },
  {
    key: "booking",
    label: "Booking",
    icon: <MdAttachMoney />,
    subLinks: [
      { to: "/dashboard/admin/bookings", label: "All Bookings" },
      { to: "/dashboard/admin/bookings/fraud", label: "Fraudulent Bookings" },
    ],
  },
  {
    key: "earnings",
    label: "Earnings / Transactions",
    icon: <MdBarChart />,
    subLinks: [
      { to: "/dashboard/admin/earnings/platform", label: "Platform Earnings" },
      { to: "/dashboard/admin/earnings/payouts", label: "Car Owner Payouts" },
      { to: "/dashboard/admin/earnings/refunds", label: "Refunds" },
    ],
  },
  {
    key: "requests",
    label: "Car Owner Requests",
    icon: <MdManageAccounts />,
    subLinks: [
      { to: "/dashboard/admin/requests", label: "All Requests" },
      { to: "/dashboard/admin/requests/review", label: "Review Profile" },
    ],
  },
  {
    key: "reports",
    label: "Reports & Analytics",
    icon: <MdBarChart />,
    subLinks: [
      { to: "/dashboard/admin/reports/earnings", label: "Earnings Report" },
      { to: "/dashboard/admin/reports/activity", label: "User Activity" },
      { to: "/dashboard/admin/reports/bookings", label: "Booking Trends" },
    ],
  },
  {
    key: "reviews",
    label: "Reviews & Ratings",
    icon: <MdRateReview />,
    subLinks: [
      { to: "/dashboard/admin/reviews", label: "All Reviews" },
      { to: "/dashboard/admin/reviews/abusive", label: "Abusive Reviews" },
    ],
  },
  {
    to: "/dashboard/admin/notifications",
    label: "Notifications",
    icon: <MdNotifications />,
  },
  {
    to: "/dashboard/admin/support",
    label: "Support",
    icon: <MdSupport />,
  },
  {
    key: "cms",
    label: "CMS",
    icon: <MdArticle />,
    subLinks: [
      { to: "/dashboard/admin/cms/terms", label: "Terms & Conditions" },
      { to: "/dashboard/admin/cms/banner", label: "Homepage Banner" },
    ],
  },
  {
    key: "profile",
    label: "Admin Profile",
    icon: <MdAccountCircle />,
    subLinks: [
      { to: "/dashboard/admin/profile", label: "View Profile" },
      { to: "/dashboard/admin/profile/password", label: "Change Password" },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    icon: <MdSettings />,
    subLinks: [
      { to: "/dashboard/admin/settings/general", label: "General" },
      { to: "/dashboard/admin/settings/roles", label: "Roles & Permissions" },
      { to: "/dashboard/admin/settings/payments", label: "Payment Settings" },
    ],
  },
];

export default function AdminSidebar() {
  const handleLogout = useLogout();

  return (
    <Sidebar
      menuItems={adminMenu}
      headerTitle="Admin Panel"
      collapsedWidth="w-64" // Admin sidebar is always expanded
      expandedWidth="w-64"
      isCollapsible={false}
      onLogout={handleLogout}
      logoutIcon={MdLogout}
      logoutText="Logout"
    />
  );
}
