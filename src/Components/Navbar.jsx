import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { showSuccess } from "../utils/notifications";

export default function Navbar() {
  const { user, UserSignOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await UserSignOut();
      showSuccess("Successfully Logged Out");
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold border-b-2 border-primary transition-all"
      : "text-gray-600 hover:text-primary transition-all";

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
      </li>

      {
        <>
          <li>
            <NavLink to="/add-car" className={navLinkStyle}>
              Add Car
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-listings" className={navLinkStyle}>
              My Listings
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings" className={navLinkStyle}>
              My Bookings
            </NavLink>
          </li>
        </>
      }

      <li>
        <NavLink to="/browse-cars" className={navLinkStyle}>
          Browse Cars
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50 px-4 lg:px-10">
      <div className="navbar-start">
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-20 p-3 shadow-lg bg-white rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        
        <Link to="/" className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
          <span className="text-primary text-3xl">🚗</span>
          Rent<span className="text-primary">Wheels</span>
        </Link>
      </div>

     
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6">{links}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="relative">
            <button
              className="btn btn-circle btn-ghost w-12 h-12 p-0"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm overflow-hidden">
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
              <ul className="absolute right-0 mt-3 w-60 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3">
                <li className="border-b pb-3 mb-3">
                  <p className="font-semibold text-gray-800">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-2 py-2 rounded-md text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 max-md:flex-col">
            <Link
              to="/login"
              className="btn btn-ghost btn-sm hover:text-primary font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary btn-sm text-white font-semibold shadow-md"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
