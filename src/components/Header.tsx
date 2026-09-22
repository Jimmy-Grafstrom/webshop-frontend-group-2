import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="text-center mt-3 sticky top-0 bg-slate-100">
      <h1 className="text-zinc-800 font-bold text-6xl p-2">Group 2 TechShop</h1>
      <nav className="flex gap-2 justify-center">
        <NavLink
          to="/"
          className="p-1 font-semibold text-blue-950 hover:text-blue-900 hover:underline active:text-blue-700"
        >
          Hem
        </NavLink>
        <NavLink
          to="/products"
          className="p-1 font-semibold text-blue-950 hover:text-blue-900 hover:underline active:text-blue-700"
        >
          Produkter
        </NavLink>
        <NavLink
          to="/login"
          className="p-1 font-semibold text-blue-950 hover:text-blue-900 hover:underline active:text-blue-700"
        >
          Logga in
        </NavLink>
        <NavLink
          to="/register"
          className="p-1 font-semibold text-blue-950 hover:text-blue-900 hover:underline active:text-blue-700"
        >
          Registrera
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
