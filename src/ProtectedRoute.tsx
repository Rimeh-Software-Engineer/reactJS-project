import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Simplified example, replace with your actual authentication and role extraction logic
function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(false);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // if (roleRequired && userRole !== roleRequired) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
}
export default ProtectedRoute;
