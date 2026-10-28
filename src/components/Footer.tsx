import { NavLink } from "react-router";

const linkClass =
  "p-1 font-semibold text-blue-950 hover:text-blue-900 hover:underline active:text-blue-700";

const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 py-6 px-4 text-sm mt-auto">
      <span>&copy; 2026 Group 2 TechShop</span>
      <nav aria-label="Sidfot">
        <NavLink to="/cookies" className={linkClass}>
          Cookies
        </NavLink>
      </nav>
    </footer>
  );
};

export default Footer;
