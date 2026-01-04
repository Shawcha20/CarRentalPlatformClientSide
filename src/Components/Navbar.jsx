import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { showSuccess } from "../utils/notifications";

export default function Navbar() {
  const { user, UserSignOut } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /* =========================
     THEME TOGGLE LOGIC
  ========================== */
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* =========================
     LOGOUT
  ========================== */
  const handleSignOut = async () => {
    try {
      await UserSignOut();
      showSuccess("Successfully Logged Out");
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  /* =========================
     NAVLINK STYLE
  ========================== */
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold border-b-2 border-primary transition-all"
      : "text-base-content/70 hover:text-primary transition-all";

  /* =========================
     NAV LINKS
  ========================== */
  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard" className={navLinkStyle}>
            Dashboard
          </NavLink>
        </li>
      )}

      <li>
        <NavLink to="/browse-cars" className={navLinkStyle}>
          Browse Cars
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar bg-base-100/80 backdrop-blur-lg shadow-md sticky top-0 z-50 px-4 lg:px-10">
      {/* =========================
         NAVBAR START
      ========================== */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <ul className="menu menu-sm dropdown-content mt-3 z-20 p-3 shadow-lg bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-base-content flex items-center gap-2"
        >
          <span className="text-primary text-3xl">🚗</span>
          Rent<span className="text-primary">Wheels</span>
        </Link>
      </div>

      {/* =========================
         NAVBAR CENTER
      ========================== */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6">{links}</ul>
      </div>

      {/* =========================
         NAVBAR END
      ========================== */}
      <div className="navbar-end gap-2">
        {/* THEME TOGGLE */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle Theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {user ? (
          /* =========================
             USER DROPDOWN
          ========================== */
          <div className="relative">
            <button
              className="btn btn-circle btn-ghost"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  user.displayName?.charAt(0).toUpperCase() || "U"
                )}
              </div>
            </button>

            {isDropdownOpen && (
              <ul className="absolute right-0 mt-3 w-60 bg-base-100 border border-base-300 rounded-xl shadow-xl z-50 p-3">
                <li className="border-b border-base-300 pb-3 mb-3">
                  <p className="font-semibold text-base-content">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm text-base-content/70 truncate">
                    {user.email}
                  </p>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="w-full text-left px-2 py-2 rounded-md text-base-content hover:bg-primary/10 hover:text-primary transition block"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-2 py-2 rounded-md text-error hover:bg-error/10 transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          /* =========================
             AUTH BUTTONS
          ========================== */
          <div className="flex items-center gap-3 max-md:flex-col">
            <Link
              to="/login"
              className="btn btn-sm font-medium hover:text-primary
                         [data-theme=light_&]:btn-ghost"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-primary btn-sm font-semibold shadow-md"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
