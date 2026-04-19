import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // ❌ No token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Expired token
  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    return <Navigate to="/login" replace />;
  }

  // ❌ Role mismatch
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/jobs" replace />;
  }

  return children;
};

export default ProtectedRoute;