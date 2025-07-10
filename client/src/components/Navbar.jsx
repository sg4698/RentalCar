import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { showToast } from '../utils/toast';
import { FaUserCircle, FaSearch } from 'react-icons/fa';

export default function Navbar() {
  const { user, role, name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    showToast('Logged out successfully!');
    navigate('/');
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600 flex items-center gap-1">
          <span className="text-3xl font-bold">∞</span> CarRental
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded w-64 text-gray-700">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search cars..."
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:text-green-600 transition duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="hover:text-green-600 transition duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* {role === 'carOwner' && (
                <Link
                  to="/createCar"
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Rent Your Car
                </Link>
              )} */}
              {role === 'admin' && (
                <Link to="/dashboard/admin" className="hover:text-green-600">
                  Admin Dashboard
                </Link>
              )}
              {role === 'carOwner' && (
                <Link to="/dashboard/owner" className="hover:text-green-600">
                  Owner Dashboard
                </Link>
              )}
              {/* {role === 'user' && (
                <Link to="/dashboard/user" className="hover:text-green-600">
                  My Rentals
                </Link>
              )} */}

              {/* Profile with Name */}
              <div className="flex items-center bg-gray-100 px-3 py-1 rounded shadow-sm gap-2">
                <FaUserCircle className="text-lg text-green-600" />
                <span className="capitalize">{name}</span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
