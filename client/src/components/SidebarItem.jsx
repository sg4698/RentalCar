// // src/components/Sidebar/SidebarItem.jsx
// import { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { FaChevronDown, FaChevronRight } from "react-icons/fa";

// const SidebarItem = ({ icon: Icon, label, children }) => {
//   const [open, setOpen] = useState(false);
//   const location = useLocation();

//   const isActive = () => {
//     // Check if any of the child routes are active
//     return (
//       children &&
//       Array.isArray(children) &&
//       children.some(
//         (child) => location.pathname === child.props.to
//       )
//     );
//   };

//   return (
//     <div className="w-full">
//       <button
//         onClick={() => setOpen(!open)}
//         className={`flex items-center justify-between w-full px-4 py-2 hover:bg-gray-200 transition rounded ${
//           open || isActive() ? "bg-gray-100 font-medium" : ""
//         }`}
//       >
//         <span className="flex items-center gap-2">
//           {Icon && <Icon className="w-5 h-5" />}
//           <span>{label}</span>
//         </span>
//         {children && (open ? <FaChevronDown /> : <FaChevronRight />)}
//       </button>

//       {/* Dropdown content with transition */}
//       <div
//         className={`ml-6 overflow-hidden transition-all duration-300 ease-in-out ${
//           open ? "max-h-[1000px]" : "max-h-0"
//         }`}
//       >
//         <div className="flex flex-col space-y-1 py-2">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SidebarItem;
// src/components/Sidebar/SidebarItem.jsx
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const SidebarItem = ({ icon: Icon, label, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-blue-100 transition"
      >
        <span className="flex items-center gap-3 whitespace-nowrap overflow-hidden text-ellipsis text-gray-700 font-medium">
          {Icon && <Icon className="text-xl flex-shrink-0" />}
          <span className="truncate">{label}</span>
        </span>
        {children && (open ? <FaChevronDown className="text-gray-500" /> : <FaChevronRight className="text-gray-500" />)}
      </button>
      {open && children && (
        <div className="ml-8 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
