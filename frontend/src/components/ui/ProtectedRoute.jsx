import { Navigate, useLocation } from "react-router-dom";

import { useApp } from "../../context/AppContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
