import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

export default function ProtectedClient() {
  const { isAuthenticated, user } = useAuthStore(); 

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user?.role !== "client") {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
