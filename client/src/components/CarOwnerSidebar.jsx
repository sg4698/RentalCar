// // 
// import { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import {
//   MdDashboard, MdCarRental, MdAddBox, MdBookOnline, MdAttachMoney,
//   MdMessage, MdRateReview, MdNotifications, MdPerson, MdHelpOutline,
//   MdLogout, MdMenu, MdExpandMore, MdExpandLess
// } from "react-icons/md";
// import useLogout from "../hooks/useLogout";

// export default function CarOwnerSidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [openDropdowns, setOpenDropdowns] = useState({
//     cars: false,
//     earnings: false,
//     profile: false,
//   });

//   const location = useLocation();
//   const handleLogout = useLogout();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const toggleDropdown = (key) =>
//     setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));

//   return (
//     <div
//       className={`bg-white border-r shadow-md min-h-screen sticky top-0 z-30 transition-all duration-300 ${
//         isOpen ? "w-64" : "w-20"
//       } overflow-hidden`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-5 border-b">
//         {isOpen ? (
//           <h2 className="text-xl font-bold text-blue-600">Owner Dashboard</h2>
//         ) : (
//           <MdMenu className="text-2xl text-blue-600 cursor-pointer" onClick={toggleSidebar} />
//         )}
//         {isOpen && (
//           <MdMenu className="text-2xl text-gray-600 cursor-pointer" onClick={toggleSidebar} />
//         )}
//       </div>

//       {/* Nav Items */}
//       <ul className="py-4 space-y-1">

//         {/* Dashboard */}
//         <li>
//           <NavLink
//             to="/dashboard/owner/overview"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 transition-all duration-200 rounded-lg
//               ${isActive
//                 ? "bg-blue-100 text-gray-700 font-semibold"
//                 : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"} 
//               ${!isOpen && "justify-center"}`
//             }
//           >
//             <MdDashboard className="text-xl" />
//             {isOpen && <span>Dashboard</span>}
//           </NavLink>
//         </li>

//         {/* Cars Dropdown */}
//         <li>
//           <button
//             onClick={() => toggleDropdown("cars")}
//             className={`flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg transition 
//               ${location.pathname.includes("/dashboard/owner/my-cars") || location.pathname.includes("/dashboard/owner/createCar")
//                 ? "bg-blue-100 text-blue-700 font-semibold"
//                 : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"}
//               ${!isOpen && "justify-center"}`}
//           >
//             <MdCarRental className="text-xl" />
//             {isOpen && <span className="flex-1">Cars</span>}
//             {isOpen && (openDropdowns.cars ? <MdExpandLess /> : <MdExpandMore />)}
//           </button>
//           {openDropdowns.cars && isOpen && (
//             <div className="ml-10 mt-1 space-y-1">
//               <NavLink
//                 to="/dashboard/owner/my-cars"
//                 className={({ isActive }) =>
//                   `block text-sm px-2 py-1 rounded-lg ${
//                     isActive
//                       ? "bg-blue-50 text-gray-900 font-semibold"
//                       : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
//                   }`
//                 }
//               >
//                 My Cars
//               </NavLink>
//               <NavLink
//                 to="/dashboard/owner/createCar"
//                 className={({ isActive }) =>
//                   `block text-sm px-2 py-1 rounded-lg ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700 font-semibold"
//                       : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
//                   }`
//                 }
//               >
//                 Add New Car
//               </NavLink>
//             </div>
//           )}
//         </li>

//         {/* Bookings */}
//         <li>
//           <NavLink
//             to="/dashboard/owner/bookings"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 transition-all duration-200 rounded-lg
//               ${isActive
//                 ? "bg-blue-100 text-blue-700 font-semibold"
//                 : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"} 
//               ${!isOpen && "justify-center"}`
//             }
//           >
//             <MdBookOnline className="text-xl" />
//             {isOpen && <span>Bookings</span>}
//           </NavLink>
//         </li>

//         {/* Earnings */}
//         <li>
//           <button
//             onClick={() => toggleDropdown("earnings")}
//             className={`flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg transition 
//               ${location.pathname.includes("/dashboard/owner/earnings")
//                 ? "bg-blue-100 text-blue-700 font-semibold"
//                 : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"}
//               ${!isOpen && "justify-center"}`}
//           >
//             <MdAttachMoney className="text-xl" />
//             {isOpen && <span className="flex-1">Earnings</span>}
//             {isOpen && (openDropdowns.earnings ? <MdExpandLess /> : <MdExpandMore />)}
//           </button>
//           {openDropdowns.earnings && isOpen && (
//             <div className="ml-10 mt-1 space-y-1">
//               <NavLink
//                 to="/dashboard/owner/earnings"
//                 className={({ isActive }) =>
//                   `block text-sm px-2 py-1 rounded-lg ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700 font-semibold"
//                       : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
//                   }`
//                 }
//               >
//                 Total Earnings
//               </NavLink>
//             </div>
//           )}
//         </li>

//         {/* Messages */}
//         <li>
//           <NavLink
//             to="/dashboard/owner/messages"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
//               ${isActive
//                 ? "bg-blue-100 text-blue-700 font-semibold"
//                 : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"} 
//               ${!isOpen && "justify-center"}`
//             }
//           >
//             <MdMessage className="text-xl" />
//             {isOpen && <span>Messages</span>}
//           </NavLink>
//         </li>

//         {/* Reviews */}
//         <li>
//           <NavLink
//             to="/dashboard/owner/reviews"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
//               ${isActive
//                 ? "bg-blue-100 text-blue-700 font-semibold"
//                 : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"} 
//               ${!isOpen && "justify-center"}`
//             }
//           >
//             <MdRateReview className="text-xl" />
//             {isOpen && <span>Reviews</span>}
//           </NavLink>
//         </li>

//         {/* Notifications */}
//         <li>
//           <NavLink
//             to="/dashboard/owner/notifications"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
//               ${isActive
//                 ? "bg-blue-100 text-blue-700 font-semibold"
//                 : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"} 
//               ${!isOpen && "justify-center"}`
//             }
//           >
//             <MdNotifications className="text-xl" />
//             {isOpen && <span>Notifications</span>}
//           </NavLink>
//         </li>

//         {/* Profile Dropdown */}
//         <li>
//           <button
//             onClick={() => toggleDropdown("profile")}
//             className={`flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg transition 
//               ${location.pathname.includes("/dashboard/owner/profile")
//                 ? "bg-blue-100 text-blue-700 font-semibold"
//                 : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"}
//               ${!isOpen && "justify-center"}`}
//           >
//             <MdPerson className="text-xl" />
//             {isOpen && <span className="flex-1">Profile</span>}
//             {isOpen && (openDropdowns.profile ? <MdExpandLess /> : <MdExpandMore />)}
//           </button>
//           {openDropdowns.profile && isOpen && (
//             <div className="ml-10 mt-1 space-y-1">
//               <NavLink
//                 to="/dashboard/owner/profile"
//                 className={({ isActive }) =>
//                   `block text-sm px-2 py-1 rounded-lg ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700 font-semibold"
//                       : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
//                   }`
//                 }
//               >
//                 View Profile
//               </NavLink>
//             </div>
//           )}
//         </li>

//         {/* Support */}
//         <li>
//           <NavLink
//             to="/dashboard/owner/support"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
//               ${isActive
//                 ? "bg-blue-100 text-blue-700 font-semibold"
//                 : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"} 
//               ${!isOpen && "justify-center"}`
//             }
//           >
//             <MdHelpOutline className="text-xl" />
//             {isOpen && <span>Support</span>}
//           </NavLink>
//         </li>

//         {/* Logout */}
//         <li>
//           <button
//             onClick={handleLogout}
//             className={`flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left 
//             ${!isOpen && "justify-center"}`}
//           >
//             <MdLogout className="text-xl" />
//             {isOpen && <span>Logout</span>}
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// }
import {
  MdDashboard,
  MdCarRental,
  MdBookOnline,
  MdAttachMoney,
  MdMessage,
  MdRateReview,
  MdNotifications,
  MdPerson,
  MdHelpOutline,
  MdLogout,
} from "react-icons/md";
import Sidebar from "./Sidebar";
import useLogout from "../hooks/useLogout";

const ownerMenu = [
  {
    to: "/dashboard/owner/overview",
    label: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    key: "cars",
    label: "Cars",
    icon: <MdCarRental />,
    subLinks: [
      { to: "/dashboard/owner/my-cars", label: "My Cars" },
      { to: "/dashboard/owner/createCar", label: "Add New Car" },
    ],
  },
  {
    to: "/dashboard/owner/bookings",
    label: "Bookings",
    icon: <MdBookOnline />,
  },
  {
    key: "earnings",
    label: "Earnings",
    icon: <MdAttachMoney />,
    subLinks: [{ to: "/dashboard/owner/earnings", label: "Total Earnings" }],
  },
  {
    to: "/dashboard/owner/messages",
    label: "Messages",
    icon: <MdMessage />,
  },
  {
    to: "/dashboard/owner/reviews",
    label: "Reviews",
    icon: <MdRateReview />,
  },
  {
    to: "/dashboard/owner/notifications",
    label: "Notifications",
    icon: <MdNotifications />,
  },
  {
    key: "profile",
    label: "Profile",
    icon: <MdPerson />,
    subLinks: [{ to: "/dashboard/owner/profile", label: "View Profile" }],
  },
  {
    to: "/dashboard/owner/support",
    label: "Support",
    icon: <MdHelpOutline />,
  },
];

export default function CarOwnerSidebar() {
  const handleLogout = useLogout();

  return (
    <Sidebar
      menuItems={ownerMenu}
      headerTitle="Owner"
      collapsedWidth="w-20"
      expandedWidth="w-64"
      isCollapsible={true}
      initialCollapsed={false}
      onLogout={handleLogout}
      logoutIcon={MdLogout}
      logoutText="Logout"
    />
  );
}
