import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../components/layouts/PublicLayout";
import ProtectedLayout from "../components/layouts/ProtectedLayout";
import HomePage from "../pages/client/HomePage";
import Catalogue from "../pages/client/Catalogue";
// import Basket from "../pages/client/Basket";
// import MaterialDetail from "../pages/client/MaterialDetail";
// import PackMateriels from "../pages/client/PackMateriels";
// import EspaceClient from "../pages/client/Espace-client";
// import Devis from "../pages/client/Devis";
// import Facture from "../pages/client/Facture";
// import Paiement from "../pages/client/Paiement";
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
import AdminDashboard from "../pages/admin/AdminDashboard";
// import AdminCategory from "../pages/admin/AdminCategory";
// import AdminCatalogues from "../pages/admin/AdminCatalogues";
// import AdminReservationDetail from "../pages/admin/AdminReservationDetail";
// import AdminReservations from "../pages/admin/AdminReservations";
import PublicNotFound from "../pages/not-found/PublicNotFound";
import ProtectedNotFound from "../pages/not-found/ProtectedNotFound";
import ForbiddenPage from "../pages/not-found/ForbiddenPage";
// import ProtectedClient from "../pages/not-found/ProtectedClient";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
    //   { path: "admin-catalogues", element: <AdminCatalogues /> },
    //   { path: "admin-category", element: <AdminCategory /> },
    //   { path: "admin-reservations", element: <AdminReservations /> },
    //   { path: "admin-reservations-detail/:id", element: <AdminReservationDetail /> },
      { path: "*", element: <ProtectedNotFound /> },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "catalogues", element: <Catalogue /> },
    //   { path: "materiel/:id", element: <MaterialDetail /> },
    //   { path: "pack-materiels", element: <PackMateriels /> },

    //   {
    //     element: <ProtectedClient />,
    //     children: [
    //       { path: "client", element: <EspaceClient /> },
    //       { path: "devis/:id", element: <Devis /> },
    //       { path: "facture/:id", element: <Facture /> },
    //       { path: "paiement/:id", element: <Paiement /> },
    //     ]
    //   },

    //   { path: "basket", element: <Basket /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
       { path: "forbidden", element: <ForbiddenPage /> },
      { path: "*", element: <PublicNotFound /> },
    ],
  },
]);
export default router;
