import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // check auth
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
  };

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md transition ${
      isActive ? "bg-green-600" : "hover:bg-green-700"
    }`;

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-green-800 bg-green-200 p-2 rounded-md md:hidden"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-green-800 text-white flex flex-col z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* App Name */}
        <h1 className="text-2xl font-bold mb-4 p-4">Swachh Sathi</h1>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto pb-4">
          <NavLink to="/" end className={linkClasses}>
            Home
          </NavLink>

          {!token ? (
            <>
              <NavLink to="/signup" end className={linkClasses}>
                Signup
              </NavLink>
              <NavLink to="/login" end className={linkClasses}>
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className={linkClasses}>
                Account
              </NavLink>
              <NavLink to="/modules" end className={linkClasses}>
                Modules
              </NavLink>
              <NavLink to="/communities" end className={linkClasses}>
                Communities
              </NavLink>
              <NavLink to="/buyandsell" end className={linkClasses}>
                Buy & Sell
              </NavLink>
              <NavLink to="/complaints" end className={linkClasses}>
                Complaints
              </NavLink>
              <NavLink to="/mappage" end className={linkClasses}>
                Tracking
              </NavLink>
              <NavLink to="/rewards" end className={linkClasses}>
                Rewards
              </NavLink>
              <NavLink to="/admin" end className={linkClasses}>
                Admin Dashboard
              </NavLink>
              <NavLink to="/municipal" end className={linkClasses}>
                Municipal Dashboard
              </NavLink>
              <NavLink to="/userCommunity/:id" end className={linkClasses}>
                User Community
              </NavLink>

              {/* Logout button */}
              <button
                onClick={logout}
                className="mt-4 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-left"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
