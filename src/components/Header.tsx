import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { getRoles, isAuthenticated, logout } from "../service/authService";

const linkClass =
  "p-1 font-semibold text-blue-950 hover:text-blue-900 hover:underline active:text-blue-700";

const Header = () => {
  const navigate = useNavigate();
  useLocation(); 
  const [menuOpen, setMenuOpen] = useState(false);

  const loggedIn = isAuthenticated();
  const isAdmin = getRoles().includes("ADMIN");

  const closeMenu = () => setMenuOpen(false);

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/");
  }

  const mainLinks = (
    <>
      <li>
        <NavLink to="/" className={linkClass} onClick={closeMenu}>
          Hem
        </NavLink>
      </li>
      <li>
        <NavLink to="/products" className={linkClass} onClick={closeMenu}>
          Produkter
        </NavLink>
      </li>
      {isAdmin && (
        <li>
          <NavLink to="/admin" className={linkClass} onClick={closeMenu}>
            Admin
          </NavLink>
        </li>
      )}
    </>
  );

  const authLinks = loggedIn ? (
    <li>
      <button
        onClick={handleLogout}
        className={`${linkClass} uppercase tracking-wider cursor-pointer`}
      >
        Logga ut
      </button>
    </li>
  ) : (
    <>
      <li>
        <NavLink to="/login" className={linkClass} onClick={closeMenu}>
          Logga in
        </NavLink>
      </li>
      <li>
        <NavLink to="/register" className={linkClass} onClick={closeMenu}>
          Registrera
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="text-center mt-3 sticky top-0 z-10 bg-slate-100">
      <h1 className="text-zinc-800 font-bold text-4xl md:text-6xl p-2">
        Group 2 TechShop
      </h1>
      {/* för dator */}
      <nav className="hidden md:grid w-full px-8 py-3 grid-cols-3 items-center">
        <div />
        <ul className="uppercase tracking-wider flex gap-x-4 text-sm justify-center flex-wrap">
          {mainLinks}
        </ul>
        <ul className="uppercase tracking-wider flex gap-x-4 text-sm justify-end flex-wrap">
          {authLinks}
        </ul>
      </nav>

      {/* för mobil */}
      <nav className="md:hidden px-4 py-2">
        <div className="flex justify-end">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
            aria-expanded={menuOpen}
            className="p-2 text-blue-950 hover:text-blue-900 cursor-pointer"
          >
            {menuOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <ul className="uppercase tracking-wider text-sm flex flex-col items-center gap-y-3 py-4 border-t border-slate-200">
            {mainLinks}
            {authLinks}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
