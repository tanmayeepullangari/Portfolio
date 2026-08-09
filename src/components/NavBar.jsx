import { NavLink } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <NavLink
          to="/Home"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          HOME
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          ABOUT
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          PROJECTS
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          CONTACT
        </NavLink>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${
            theme === "light" ? "dark" : "light"
          } mode`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;