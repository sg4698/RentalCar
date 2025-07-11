import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Wait until auth finishes loading
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // If not logged in
  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // If role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
