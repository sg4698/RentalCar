import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, role, loading } = useSelector((state) => state.auth);

  if (loading) return <p className="text-center mt-10">Checking session...</p>;

  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
