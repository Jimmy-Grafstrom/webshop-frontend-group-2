import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="text-center mt-3 sticky top-0 bg-slate-100">
      <h1 className="text-zinc-800 font-bold text-6xl p-2">Group 2 TechShop</h1>
      <nav className="w-full px-8 py-3 grid grid-cols-3 items-center">
        <div/>

        <ul className="uppercase tracking-wider flex gap-x-4 text-sm justify-center flex-wrap">
          <li>
            <NavLink
              to="/"
              className="p-1 font-semibold text-blue-950 hover:text-blue-900 hover:underline active:text-blue-700"
            >
              Hem
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="p-1 font-semibold text-blue-950 hover:text-blue-900 hover:underline active:text-blue-700"
            >
              Produkter
            </NavLink>
          </li>
        </ul>

        <ul className="uppercase tracking-wider flex gap-x-4 text-sm justify-end flex-wrap">
          <li>
            <NavLink
              to="/login"
              className="p-1 font-semibold text-blue-950 hover:text-blue-900 hover:underline active:text-blue-700"
            >
              Logga in
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className="p-1 font-semibold text-blue-950 hover:text-blue-900 hover:underline active:text-blue-700"
            >
              Registrera
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
