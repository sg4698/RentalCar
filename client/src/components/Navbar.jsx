// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../features/auth/authSlice';
// import { showToast } from '../utils/toast';
// import { FaUserCircle, FaSearch } from 'react-icons/fa';

// export default function Navbar() {
//   const { user, role, name } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     showToast('Logged out successfully!');
//     navigate('/');
//   };

//   return (
//     <header className="bg-white shadow sticky top-0 z-50">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-green-600 flex items-center gap-1">
//           <span className="text-3xl font-bold">∞</span> CarRental
//         </Link>

//         {/* Search Bar */}
//         <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded w-64 text-gray-700">
//           <FaSearch className="mr-2 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search cars..."
//             className="bg-transparent focus:outline-none w-full"
//           />
//         </div>

//         {/* Right Menu */}
//         <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
//           {!user ? (
//             <>
//               <Link
//                 to="/login"
//                 className="hover:text-green-600 transition duration-200"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 to="/register"
//                 className="hover:text-green-600 transition duration-200"
//               >
//                 Register
//               </Link>
//             </>
//           ) : (
//             <>
//               {/* {role === 'carOwner' && (
//                 <Link
//                   to="/createCar"
//                   className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
//                 >
//                   Rent Your Car
//                 </Link>
//               )} */}
//               {role === 'admin' && (
//                 <Link to="/dashboard/admin" className="hover:text-green-600">
//                   Admin Dashboard
//                 </Link>
//               )}
//               {role === 'carOwner' && (
//                 <Link to="/dashboard/owner" className="hover:text-green-600">
//                   Owner Dashboard
//                 </Link>
//               )}
//               {/* {role === 'user' && (
//                 <Link to="/dashboard/user" className="hover:text-green-600">
//                   My Rentals
//                 </Link>
//               )} */}

//               {/* Profile with Name */}
//               <div className="flex items-center bg-gray-100 px-3 py-1 rounded shadow-sm gap-2">
//                 <FaUserCircle className="text-lg text-green-600" />
//                 <span className="capitalize">{name}</span>
//               </div>

//               {/* Logout */}
//               <button
//                 onClick={handleLogout}
//                 className="text-red-600 hover:text-red-800"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { showToast } from '../utils/toast';
import {
  FaUserCircle,
  FaSearch,
  FaCaretDown,
  FaSignInAlt,
  FaUserPlus,
  FaClipboardList,
  FaUserCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { user, role, name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

const handleLogout = async () => {
  await dispatch(logoutUser());
  showToast('Logged out successfully!');
  navigate('/');
};

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
      navigate('/dashboard/admin');
    } else if (role === 'carOwner') {
      navigate('/dashboard/owner');
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* ✅ Logo with pointer */}
        <div
          onClick={handleLogoClick}
          className="text-2xl font-bold text-green-600 flex items-center gap-1 cursor-pointer"
        >
          <span className="text-3xl font-bold">∞</span> CarRental
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded w-64 text-gray-700">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search cars..."
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        {/* Account Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition cursor-pointer"
          >
            <FaUserCircle className="text-green-600" />
            <span>{user ? name : 'My Account'}</span>
            <FaCaretDown />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded z-50 text-sm text-gray-800 transition-all duration-200 ease-out animate-fadeIn">
              {!user && (
                <>
                  <Link
                    to={`/login?redirect=${location.pathname}`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FaSignInAlt /> Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FaUserPlus /> Sign Up
                  </Link>
                  <div
                    onClick={() => handleProtectedNav('/dashboard/user')}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FaClipboardList /> My Bookings
                  </div>
                  <div
                    onClick={() => handleProtectedNav('/dashboard/user')}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FaUserCog /> Manage Profile
                  </div>
                </>
              )}

              {user && role === 'user' && (
                <>
                  <div
                    onClick={() => handleProtectedNav('/dashboard/user')}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FaClipboardList /> My Bookings
                  </div>
                  <div
                    onClick={() => handleProtectedNav('/dashboard/user')}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FaUserCog /> Manage Profile
                  </div>
                  <div
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FaSignOutAlt /> Logout
                  </div>
                </>
              )}

              {user && (role === 'admin' || role === 'carOwner') && null}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}



