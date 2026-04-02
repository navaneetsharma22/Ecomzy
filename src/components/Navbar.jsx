import { FaShoppingCart } from "react-icons/fa";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-CQ73aCIE.png";

const Navbar = ({ theme, toggleTheme }) => {
  const cart = useSelector((state) => state.cart);
  const linkClassName = ({ isActive }) =>
    `transition-colors duration-300 ${
      isActive
        ? "text-[var(--nav-link-active)]"
        : "text-[var(--nav-link)] hover:text-[var(--nav-link-hover)]"
    }`;

  return (
    <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <nav className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <NavLink to="/">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Ecomzy logo"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--accent-soft)]"
            />
            <div className="min-w-0">
              <p className="text-base font-black uppercase tracking-[0.28em] text-[var(--nav-brand)] sm:text-lg sm:tracking-[0.35em]">
                Ecomzy
              </p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--nav-muted)] sm:text-xs sm:tracking-[0.3em]">
                Animated storefront
              </p>
            </div>
          </div>
        </NavLink>

        <div className="flex flex-wrap items-center justify-end gap-3 font-medium sm:gap-6">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-full border border-[var(--toggle-border)] bg-[var(--toggle-bg)] px-4 py-2 text-sm font-semibold text-[var(--toggle-text)] shadow-lg shadow-slate-950/10 transition duration-300 hover:scale-[1.02]"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <HiMiniSun className="text-lg" /> : <HiMiniMoon className="text-lg" />}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>

          <NavLink to="/" className={linkClassName}>
            <p>Home</p>
          </NavLink>

          <NavLink to="/cart" className={linkClassName}>
            <div className="relative rounded-full border border-[var(--cart-shell-border)] bg-[var(--cart-shell-bg)] p-3 shadow-lg shadow-slate-950/20 transition-colors duration-300">
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--accent-contrast)]">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
