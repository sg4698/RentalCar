import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard, MdCarRental, MdAddBox, MdBookOnline, MdAttachMoney,
  MdMessage, MdRateReview, MdNotifications, MdPerson, MdHelpOutline,
  MdLogout, MdMenu
} from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice"; // ✅ your async thunk

const navItems = [
  { name: "Dashboard", path: "/dashboard/owner/overview", icon: <MdDashboard /> },
  { name: "My Cars", path: "/dashboard/owner/my-cars", icon: <MdCarRental /> },
  { name: "Add New Car", path: "/dashboard/owner/createCar", icon: <MdAddBox /> },
  { name: "Bookings", path: "/dashboard/owner/bookings", icon: <MdBookOnline /> },
  { name: "Earnings", path: "/dashboard/owner/earnings", icon: <MdAttachMoney /> },
  { name: "Messages", path: "/dashboard/owner/messages", icon: <MdMessage /> },
  { name: "Reviews", path: "/dashboard/owner/reviews", icon: <MdRateReview /> },
  { name: "Notifications", path: "/dashboard/owner/notifications", icon: <MdNotifications /> },
  { name: "Profile", path: "/dashboard/owner/profile", icon: <MdPerson /> },
  { name: "Support", path: "/dashboard/owner/support", icon: <MdHelpOutline /> },
  { name: "Logout", path: "/logout", icon: <MdLogout /> }, // This will be handled as a button
];

export default function CarOwnerSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div
      className={`bg-white border-r shadow-md min-h-screen sticky top-0 z-30 transition-all duration-300
      ${isOpen ? "w-64" : "w-20"} overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b">
        {isOpen ? (
          <h2 className="text-xl font-bold text-blue-600"> Owner Dashboard</h2>
        ) : (
          <MdMenu
            className="text-2xl text-blue-600 cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
        {isOpen && (
          <MdMenu
            className="text-2xl text-gray-600 cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
      </div>

      {/* Nav Items */}
      <ul className="py-4 space-y-1">
        {navItems.map((item) => (
          <li key={item.name}>
            {item.name === "Logout" ? (
              <button
                onClick={handleLogout}
                className={`flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left 
                ${!isOpen && "justify-center"}`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </button>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 transition-all duration-200 rounded-lg group
                  ${isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"} 
                  ${!isOpen && "justify-center"}`
                }
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && (
                  <span className="whitespace-nowrap transition-opacity duration-300">
                    {item.name}
                  </span>
                )}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
