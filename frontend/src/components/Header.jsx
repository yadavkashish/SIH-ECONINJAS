import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaEllipsisH } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const accountRef = useRef();
  const moreRef = useRef();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleAccount = () => setAccountOpen(!accountOpen);
  const toggleMore = () => setMoreOpen(!moreOpen);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setAccountOpen(false);
    setSidebarOpen(false);
    setMoreOpen(false);
  };

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md transition font-medium ${
      isActive
        ? "bg-green-700 text-white"
        : "text-white hover:bg-green-700 hover:text-gray-100"
    }`;

  return (
    <>
      {/* Header */}
      <header className="bg-green-800 fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-white hover:text-gray-200 transition"
          >
            Swachh Saathi
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-2 items-center">
            {/* Always visible */}
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>

            {token ? (
              // Logged-in links
              <>
                <NavLink to="/modules" className={linkClasses}>
                  Modules
                </NavLink>
                <NavLink to="/mappage" className={linkClasses}>
                  Tracking
                </NavLink>
                <NavLink to="/complaints" className={linkClasses}>
                  Complaints
                </NavLink>
                <NavLink to="/buyandsell" className={linkClasses}>
                  Buy & Sell
                </NavLink>
                <NavLink to="/rewards" className={linkClasses}>
                  Rewards
                </NavLink>

                {/* More dropdown */}
                <div className="relative" ref={moreRef}>
                  <button
                    onClick={toggleMore}
                    className="p-2 rounded-md text-white hover:bg-green-700 transition"
                  >
                    <FaEllipsisH size={18} />
                  </button>
                  {moreOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50">
                      <NavLink
                        to="/communities"
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                        onClick={() => setMoreOpen(false)}
                      >
                        Communities
                      </NavLink>
                      <NavLink
                        to="/admin"
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                        onClick={() => setMoreOpen(false)}
                      >
                        Admin Dashboard
                      </NavLink>
                      <NavLink
                        to="/municipal"
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                        onClick={() => setMoreOpen(false)}
                      >
                        Municipal Dashboard
                      </NavLink>
                      <NavLink
                        to="/userCommunity/:id"
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                        onClick={() => setMoreOpen(false)}
                      >
                        User Community
                      </NavLink>
                    </div>
                  )}
                </div>

                {/* Account */}
                <div className="relative" ref={accountRef}>
                  <button
                    onClick={toggleAccount}
                    className="p-2 rounded-full text-white hover:bg-green-700 transition"
                  >
                    <FaUserCircle size={26} />
                  </button>
                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50">
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                        onClick={() => setAccountOpen(false)}
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Logged-out links: only Signup and Login
              <>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
                >
                  Signup
                </NavLink>
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-md border border-white text-white font-medium hover:bg-white hover:text-green-700 transition"
                >
                  Login
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-white hover:text-gray-200 transition"
          >
            {sidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r transform transition-transform duration-300 ease-in-out z-40
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden pt-20`}
      >
        <nav className="flex flex-col gap-1 px-4">
          {/* Home is always visible */}
          <NavLink
            to="/"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </NavLink>

          {token ? (
            // Logged-in links
            <>
              <NavLink
                to="/profile"
                className={linkClasses}
                onClick={() => setSidebarOpen(false)}
              >
                Profile
              </NavLink>
              <NavLink
                to="/modules"
                className={linkClasses}
                onClick={() => setSidebarOpen(false)}
              >
                Modules
              </NavLink>
              <NavLink
                to="/tracking"
                className={linkClasses}
                onClick={() => setSidebarOpen(false)}
              >
                Tracking
              </NavLink>
              <NavLink
                to="/communities"
                className={linkClasses}
                onClick={() => setSidebarOpen(false)}
              >
                Communities
              </NavLink>
              <NavLink
                to="/buyandsell"
                className={linkClasses}
                onClick={() => setSidebarOpen(false)}
              >
                Buy & Sell
              </NavLink>
              <NavLink
                to="/complaints"
                className={linkClasses}
                onClick={() => setSidebarOpen(false)}
              >
                Complaints
              </NavLink>
              <NavLink
                to="/rewards"
                className={linkClasses}
                onClick={() => setSidebarOpen(false)}
              >
                Rewards
              </NavLink>
              <button
                onClick={logout}
                className="mt-4 px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            // Logged-out links: only Signup and Login
            <>
              <NavLink
                to="/signup"
                className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
                onClick={() => setSidebarOpen(false)}
              >
                Signup
              </NavLink>
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-md border border-green-600 text-green-600 font-medium hover:bg-green-600 hover:text-white transition"
                onClick={() => setSidebarOpen(false)}
              >
                Login
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
