import { useState, type JSX } from "react";
import {
  MdOutlineHome,
  MdOutlineLogin,
  MdMenu,
  MdLibraryBooks,
  MdCategory,
  MdAdminPanelSettings,
  MdInventory,
} from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import type { MenuItem, SubItem } from "../../types/types";

const menuItems: MenuItem[] = [
  { title: "Accueil", icon: <MdOutlineHome />, path: "/admin", subItems: [] },
  {
    title: "Admin Catalogues",
    icon: <MdLibraryBooks />,
    path: "/admin/admin-catalogues",
    subItems: [],
  },
  {
    title: "Admin Category",
    icon: <MdCategory />,
    path: "/admin/admin-category",
    subItems: [],
  },
  {
    title: "Admin Packs",
    icon: <MdInventory />,
    path: "/admin/admin-packs",
    subItems: [],
  },
   {
    title: "Admin Packs + Produit",
    icon: <MdInventory />,
    path: "/admin/admin-bundle-product",
    subItems: [],
  },
  {
    title: "Admin Reservations",
    icon: <MdAdminPanelSettings size={24} />,
    path: "/admin/admin-reservations",
    subItems: [],
  },
];

export default function Sidebar(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const logoutFn = useAuthStore((s) => s.logout);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<Record<number, boolean>>({});

  const toggleSidebar = () => setOpenSidebar((o) => !o);
  const toggleSubmenu = (i: number) =>
    setSubmenuOpen((s) => ({ ...s, [i]: !s[i] }));

  const closeSidebar = () => window.innerWidth < 1024 && setOpenSidebar(false);
  const handleLogout = () => {
    logoutFn();
    closeSidebar();
    navigate("/authentification");
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="fixed left-50 z-[10000] p-3 rounded-full bg-slate-100
         hover:bg-slate-200 text-2xl lg:hidden shadow-md"
      >
        {openSidebar ? (
          <RiCloseLine className="text-gray-500" />
        ) : (
          <MdMenu className="text-gray-500" />
        )}
      </button>

      {openSidebar && (
        <div
          className="fixed inset-0 bg-opacity-30 z-[9998] lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 text-white flex flex-col p-4 pt-7
          transform transition-transform duration-300 ease-in-out
          bg-gray-800 h-screen w-64 z-[9999]
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:block
        `}
      >
        <div className="flex flex-col items-center gap-2 pt-7 px-4">
          <img
            src="/logo-blit.png"
            alt="Logo BlitSono"
            className="w-24 h-24 object-cover rounded-full"
          />
          <div className="text-center font-bold text-3xl leading-none flex flex-col italic font-serif">
            <span className="inline-block animate-revealText">
              beloya<span className="text-[#18769C]">lit </span>
            </span>
            <span className="text-xl inline-flex items-center justify-end gap-1 text-[#18769C]">
              <span className="block w-5 h-1 bg-white"></span>.com
            </span>
          </div>
        </div>

        <ul
          className="space-y-2 flex-1 mt-10 h-64 max-h-[calc(100%-80px)] 
         transform transition-transform duration-300 ease-in-out
          overflow-y-scroll overflow-x-hidden scrollbar-custom"
        >
          {menuItems.map((item, i) => (
            <li key={i}>
              {item.subItems.length > 0 ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(i)}
                    className="w-full flex items-center p-2 rounded-lg hover:bg-gray-700"
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                    <FaAngleRight
                      className={`ml-auto transition-transform ${
                        submenuOpen[i] ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`pl-6 overflow-hidden transition-all duration-300 ${
                      submenuOpen[i] ? "h-auto opacity-100" : "h-0 opacity-0"
                    }`}
                  >
                    {item.subItems.map((sub: SubItem, si: number) => (
                      <Link
                        key={si}
                        to={sub.path}
                        onClick={closeSidebar}
                        className={`block p-2 rounded-lg hover:bg-gray-700 ${
                          location.pathname === sub.path && "bg-gray-700"
                        }`}
                      >
                        {sub.icon}
                        <span className="ml-2">{sub.title}</span>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
                    location.pathname === item.path && "bg-gray-700"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="px-4 space-y-3 mt-4">
          <Link
            to="/"
            className="flex items-center text-amber-50 p-2 rounded-lg bg-gray-700
            hover:bg-gray-600 cursor-pointer"
            onClick={closeSidebar}
          >
            Espace Client
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center text-amber-50 p-2 rounded-lg bg-gray-700
            hover:bg-gray-600 cursor-pointer "
          >
            <MdOutlineLogin className="mr-2" />
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
