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
  "/admin/admin-catalogues": "Gestion des catalogues",
  "/admin/admin-category": "Gestion des catégories ",
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
            <Sidebar/>

            <div className="flex flex-col flex-1 overflow-y-auto">
              <header
                className="
                  bg-white shadow 
                  px-2 py-2 max-[479px]:text-sm
                  sm:px-4 sm:py-3
                  flex flex-col gap-2 items-start
                  sm:flex-row sm:justify-between sm:items-center
                "
              >
                <h1
                  className="
                  text-base font-semibold text-gray-800
                  sm:text-lg md:text-xl lg:text-2xl
                "
                >
                  {title}
                </h1>
                <div
                  className="
                  text-[11px] text-gray-500
                  sm:text-xs md:text-sm lg:text-base
                "
                >
                  {user?.email ?? "no-email@example.com"}
                </div>
              </header>

              <main
                className="
                flex-1 
                p-2 max-[479px]:p-1
                sm:p-4 md:p-6 lg:p-8 xl:p-10
                bg-gray-100
              "
              >
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
