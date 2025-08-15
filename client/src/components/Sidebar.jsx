import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdExpandLess, MdExpandMore, MdMenu } from "react-icons/md";

export default function Sidebar({
  menuItems,
  headerTitle,
  collapsedWidth = "w-20",
  expandedWidth = "w-64",
  isCollapsible = false,
  initialCollapsed = false,
  renderHeaderExtra = null,
  onLogout,
  logoutText = "Logout",
  logoutIcon: LogoutIcon,
}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(!initialCollapsed);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleSidebar = () => {
    if (isCollapsible) setIsOpen((prev) => !prev);
  };

  const toggleDropdown = (key) =>
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));

  const renderNavLink = (to, label, icon, isSubLink = false) => {
    // const isActive = location.pathname === to;
    return (
      <NavLink
        to={to}
        key={to}
        className={({ isActive }) =>
          `${
            isSubLink ? "block text-sm px-6 py-1.5 rounded" : "flex items-center gap-3 px-4 py-2 rounded"
          } transition whitespace-nowrap overflow-hidden text-ellipsis ${
            isActive
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
          } ${!isOpen && !isSubLink ? "justify-center" : ""}`
        }
      >
        {icon && <span className="text-xl">{icon}</span>}
        {isOpen && <span>{label}</span>}
      </NavLink>
    );
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 shadow-sm min-h-screen p-4 sticky top-0 z-30 transition-all duration-300 ${
        isOpen ? expandedWidth : collapsedWidth
      } overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-6">
        {isOpen ? (
          <h2 className="text-2xl font-bold text-blue-600 whitespace-nowrap">{headerTitle}</h2>
        ) : (
          <button
            className="text-3xl text-blue-600 cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <MdMenu />
          </button>
        )}
        {isOpen && renderHeaderExtra}
        {isOpen && isCollapsible && (
          <button
            className="text-3xl text-gray-600 cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <MdMenu />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <nav>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            if (item.subLinks && item.subLinks.length > 0) {
              const isDropdownOpen = openDropdowns[item.key];
              const isActiveDropdown = item.subLinks.some(
                (sub) => sub.to === location.pathname
              );

              return (
                <li key={item.key}>
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded transition ${
                      isActiveDropdown
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    } ${!isOpen ? "justify-center" : ""}`}
                    aria-expanded={isDropdownOpen ? "true" : "false"}
                  >
                    {item.icon && <span className="text-xl">{item.icon}</span>}
                    {isOpen && <span className="flex-1">{item.label}</span>}
                    {isOpen && (
                      <span className="text-lg select-none">
                        {isDropdownOpen ? <MdExpandLess /> : <MdExpandMore />}
                      </span>
                    )}
                  </button>
                  {isDropdownOpen && isOpen && (
                    <div className="ml-10 mt-1 space-y-1">
                      {item.subLinks.map((sub) =>
                        renderNavLink(sub.to, sub.label, null, true)
                      )}
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li key={item.key || item.to}>
                {renderNavLink(item.to, item.label, item.icon)}
              </li>
            );
          })}
          {onLogout && (
            <li>
              <button
                onClick={onLogout}
                className={`flex items-center gap-3 px-4 py-2 mt-3 text-red-600 hover:bg-red-100 rounded transition w-full ${
                  !isOpen ? "justify-center" : ""
                }`}
              >
                {LogoutIcon && <LogoutIcon className="text-xl" />}
                {isOpen && <span>{logoutText}</span>}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}
