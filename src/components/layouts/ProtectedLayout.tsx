import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { Admin, Client } from "../../types/user";
import { useAuthStore } from "../../stores/useAuthStore";
import Sidebar from "../adminDashboard/Sidebar";

type AuthAdminProps = {
  children?: (user: Admin | Client | null) => React.ReactNode;
};

function AuthAdmin({ children }: AuthAdminProps) {
  const user = useAuthStore.use.user();
  const isAuthenticated = useAuthStore.use.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children?.(user as Admin)}</>; 
}

const routes = {
  "/admin": "Admin Dashboard",
  "/admin/categories": "Gestion des catégories",
  "/admin/catalogues": "Gestion des catalogues",
  "/admin/admin-reservations": "Gestion des réservations",
} as const;

function ProtectedLayout() {
  const location = useLocation();
  const title = routes[location.pathname as keyof typeof routes] || "Dashboard";

  return (
    <AuthAdmin>
      {(user) => (
        <>
          <title>{title} • Mon App</title>

          <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex flex-col flex-1 overflow-y-auto">
              <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
                <div className="text-sm text-gray-500">
                  {user?.email ?? "no-email@example.com"}
                </div>
              </header>

              <main className="flex-1 p-4 bg-gray-100">
                <Outlet />
              </main>
            </div>
          </div>
        </>
      )}
    </AuthAdmin>
  );
}

export default ProtectedLayout;
