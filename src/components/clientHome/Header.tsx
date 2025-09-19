import { useState } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { MdLogin, MdMenu, MdClose } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { useCartStore } from "../../stores/useCartStore";
import Search from "./Search";

type MenuItem = { title: string; path: string };
const menuItems: MenuItem[] = [
  { title: "Accueil", path: "/" },
  { title: "Catalogue", path: "/catalogues" },
  { title: "Matériel packs", path: "/pack-materiels" },
  { title: "Espace client", path: "/client" },
];

export default function Header(){
  const isAuth = useAuthStore((s) => s.isAuthenticated);
  const totalItems = useCartStore((s) => s.totalCount());
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const user = useAuthStore((s) => s.user);

  const logout = () => {
    useAuthStore.getState().logout();
    navigate("/");
    setOpen(false);
  };
  const isActive = (p: string) => location.pathname === p;

  return (
    <header className="fixed top-0 w-full bg-[#1E2939] text-white z-50 shadow-lg">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo-blit.png"
            alt="Logo BlitSono"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-full"
          />
          <div className="flex flex-col italic font-serif">
            <span className="text-lg sm:text-2xl md:text-3xl font-bold animate-revealText">
              beloya<span className="text-[#18769C]">lit</span>
            </span>
            <span className="text-sm sm:text-base text-[#18769C] flex items-center">
              <span className="w-4 h-1 bg-white mr-1"></span>.com
            </span>
          </div>
        </Link>

        <button
          className="sm:hidden text-2xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <MdClose /> : <MdMenu />}
        </button>
        
        <div className="hidden sm:flex items-center gap-4 lg:gap-8">
          
          <nav className="flex gap-3 lg:gap-6">
            {menuItems.map((item) =>
              (item.title !== "Espace client" || isAuth) && (
                <Link key={item.path} to={item.path}>
                  <span
                    className={`relative inline-block px-3 py-2 rounded-full transition ${
                      isActive(item.path)
                        ? "font-semibold underline underline-offset-4 text-[#18769C]"
                        : "hover:text-[#18769C]"
                    }`}
                  >
                    {item.title}
                    {!isActive(item.path) && (
                      <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#18769C] transition-all duration-300"></span>
                    )}
                  </span>
                </Link>
              )
            )}
          </nav>
          {user?.id_role == 2 && (
            <li className="bg-white text-[#18769C] inline-block p-1 rounded">
              <Link to="/admin">Admin</Link>
            </li>
          )}
          <div className="w-40 sm:w-56 lg:w-72">
            <Search />
          </div>

          <div className="flex items-center gap-4">
            <Link to="/basket" className="relative">
              <FaShoppingCart className="text-2xl hover:text-[#18769C] transition" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/sign-in">
              <FaUser className="text-2xl hover:text-[#18769C] transition" />
            </Link>
            {isAuth && (
              <button onClick={logout} className="cursor-pointer">
                <MdLogin className="text-2xl hover:text-[#18769C] transition" />
              </button>
            )}
          </div>
        </div>
      </div>


      {open && (
        <div className="sm:hidden px-4 pb-4 bg-[#1E2939] border-t border-gray-700">
          <Search />
          <nav className="mt-4 flex flex-col gap-2">
            {menuItems.map((item) =>
              (item.title !== "Espace client" || isAuth) && (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                >
                  <span
                    className={`block px-4 py-2 rounded transition ${
                      isActive(item.path)
                        ? "bg-gray-700 font-semibold"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              )
            )}
          </nav>
          <div className="mt-4 flex items-center gap-4">
            <Link to="/basket" onClick={() => setOpen(false)}>
              <FaShoppingCart className="text-2xl hover:text-[#18769C] transition" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/sign-in" onClick={() => setOpen(false)}>
              <FaUser className="text-2xl hover:text-[#18769C] transition" />
            </Link>
            {isAuth && (
              <button onClick={logout} className="cursor-pointer">
                <MdLogin className="text-2xl hover:text-[#18769C] transition" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
