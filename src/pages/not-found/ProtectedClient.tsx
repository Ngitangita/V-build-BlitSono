import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

export default function ProtectedClient() {
  const { isAuthenticated} = useAuthStore(); 

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
