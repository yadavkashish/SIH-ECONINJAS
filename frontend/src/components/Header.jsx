// Header.jsx
import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Waste App Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="font-bold text-xl text-green-700">Waste App</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-700 hover:text-green-700">
            Home
          </a>
          <a href="/modules" className="text-gray-700 hover:text-green-700">
            Modules
          </a>
          <a href="/communities" className="text-gray-700 hover:text-green-700">
            Communities
          </a>
          <a href="/map" className="text-gray-700 hover:text-green-700">
            Map
          </a>
        </nav>

        {/* Signup / Signin */}
        <div className="hidden md:flex space-x-4">
          <a
            href="/signin"
            className="px-4 py-2 border border-green-700 text-green-700 rounded hover:bg-green-50 transition"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-green-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-2">
          <a href="/" className="block text-gray-700 hover:text-green-700">
            Home
          </a>
          <a href="/modules" className="block text-gray-700 hover:text-green-700">
            Modules
          </a>
          <a href="/communities" className="block text-gray-700 hover:text-green-700">
            Communities
          </a>
          <a href="/map" className="block text-gray-700 hover:text-green-700">
            Map
          </a>
          <a
            href="/signin"
            className="block px-4 py-2 border border-green-700 text-green-700 rounded hover:bg-green-50 transition"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="block px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
          >
            Sign Up
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
