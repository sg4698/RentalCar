
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useSelector} from 'react-redux';
// // import { logoutUser } from '../features/auth/authSlice';
// // import { showToast } from '../utils/toast';
// import {
//   FaUserCircle,
//   FaSearch,
//   FaCaretDown,
//   FaSignInAlt,
//   FaUserPlus,
//   FaClipboardList,
//   FaUserCog,
//   FaSignOutAlt,
// } from 'react-icons/fa';
// import { useState, useRef, useEffect } from 'react';
// import useLogout from '../hooks/useLogout';

// export default function Navbar() {
//   const { user, role, name } = useSelector((state) => state.auth);
//   // const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
// const handleLogout = useLogout();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef();

// // const handleLogout = async () => {
// //   await dispatch(logoutUser());
// //   showToast('Logged out successfully!');
// //   navigate('/');
// // };

//   const handleProtectedNav = (path) => {
//     if (!user) {
//       navigate(`/login?redirect=${path}`);
//     } else {
//       navigate(path);
//     }
//     setDropdownOpen(false);
//   };

//   const handleLogoClick = () => {
//     if (!user || role === 'user') {
//       navigate('/');
//     } else if (role === 'admin') {
//       navigate('/dashboard/admin/overview');
//     } else if (role === 'carOwner') {
//       navigate('/dashboard/owner/overview');
//     }
//   };

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <header className="bg-white shadow sticky top-0 z-50">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//         {/* ✅ Logo with pointer */}
//         <div
//           onClick={handleLogoClick}
//           className="text-2xl font-bold text-green-600 flex items-center gap-1 cursor-pointer"
//         >
//           <span className="text-3xl font-bold">∞</span> CarRental
//         </div>

//         {/* Search */}
//         <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded w-64 text-gray-700">
//           <FaSearch className="mr-2 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search cars..."
//             className="bg-transparent focus:outline-none w-full"
//           />
//         </div>

//         {/* Account Dropdown */}
//         <div className="relative" ref={dropdownRef}>
//           <button
//             onClick={() => setDropdownOpen((prev) => !prev)}
//             className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition cursor-pointer"
//           >
//             <FaUserCircle className="text-green-600" />
//             <span>{user ? name : 'My Account'}</span>
//             <FaCaretDown />
//           </button>

//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded z-50 text-sm text-gray-800 transition-all duration-200 ease-out animate-fadeIn">
//               {!user && (
//                 <>
//                   <Link
//                     to={`/login?redirect=${location.pathname}`}
//                     onClick={() => setDropdownOpen(false)}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
//                   >
//                     <FaSignInAlt /> Sign In
//                   </Link>
//                   <Link
//                     to="/register"
//                     onClick={() => setDropdownOpen(false)}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
//                   >
//                     <FaUserPlus /> Sign Up
//                   </Link>
//                   <div
//                     onClick={() => handleProtectedNav('/dashboard/user')}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
//                   >
//                     <FaClipboardList /> My Bookings
//                   </div>
//                   <div
//                     onClick={() => handleProtectedNav('/dashboard/user')}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
//                   >
//                     <FaUserCog /> Manage Profile
//                   </div>
//                 </>
//               )}

//               {user && role === 'user' && (
//                 <>
//                   <div
//                     onClick={() => handleProtectedNav('/dashboard/user')}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
//                   >
//                     <FaClipboardList /> My Bookings
//                   </div>
//                   <div
//                     onClick={() => handleProtectedNav('/dashboard/user')}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
//                   >
//                     <FaUserCog /> Manage Profile
//                   </div>
//                   <div
//                     onClick={() => {
//                       handleLogout();
//                       setDropdownOpen(false);
//                     }}
//                     className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 transition cursor-pointer"
//                   >
//                     <FaSignOutAlt /> Logout
//                   </div>
//                 </>
//               )}

//               {user && (role === 'admin' || role === 'carOwner') && null}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }


import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaUserCircle,
  FaSearch,
  FaCaretDown,
  FaSignInAlt,
  FaUserPlus,
  FaClipboardList,
  FaUserCog,
  FaSignOutAlt,
  FaEllipsisV,
  FaHeadset,
} from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import useLogout from '../hooks/useLogout';

export default function Navbar() {
  const { user, role, name } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = useLogout();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const menuRef = useRef();

  const handleProtectedNav = (path) => {
    if (!user) {
      navigate(`/login?redirect=${path}`);
    } else {
      navigate(path);
    }
    setDropdownOpen(false);
  };

  const handleLogoClick = () => {
    if (!user || role === 'user') {
      navigate('/');
    } else if (role === 'admin') {
      navigate('/dashboard/admin/overview');
    } else if (role === 'carOwner') {
      navigate('/dashboard/owner/overview');
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Flipkart-like Logo */}
        <div onClick={handleLogoClick} className="cursor-pointer">
          <div className="text-blue-600 font-bold text-2xl leading-none">CarRental</div>
         
        </div>

        {/* Medium Search bar */}
        <div className="w-96 max-w-md mx-6">
          <div className="flex items-center bg-blue-50 px-4 py-2 rounded-md">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="bg-transparent w-full focus:outline-none text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Right: User + Menu */}
        <div className="flex items-center gap-4">
          {/* Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition"
            >
              <FaUserCircle className="text-gray-700 text-lg" />
              <span className="text-sm">{user ? name : 'My Account'}</span>
              <FaCaretDown className="text-xs" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded z-50 text-sm text-gray-800">
                {!user && (
                  <>
                    <Link
                      to={`/login?redirect=${location.pathname}`}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <FaSignInAlt /> Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <FaUserPlus /> Sign Up
                    </Link>
                    <div
                      onClick={() => handleProtectedNav('/dashboard/user')}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <FaClipboardList /> My Bookings
                    </div>
                    <div
                      onClick={() => handleProtectedNav('/dashboard/user')}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <FaUserCog /> Manage Profile
                    </div>
                  </>
                )}

                {user && role === 'user' && (
                  <>
                    <div
                      onClick={() => handleProtectedNav('/dashboard/user')}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <FaClipboardList /> My Bookings
                    </div>
                    <div
                      onClick={() => handleProtectedNav('/dashboard/user/profile')}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <FaUserCog /> Manage Profile
                    </div>
                    <div
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                    >
                      <FaSignOutAlt /> Logout
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 3 Dots Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-gray-600 hover:text-gray-800 text-lg"
            >
              <FaEllipsisV />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded z-50 text-sm text-gray-800">
                <div
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/customer-service');
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <FaHeadset /> Customer Service
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

