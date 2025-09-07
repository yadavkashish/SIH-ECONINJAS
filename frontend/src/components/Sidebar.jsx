import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-green-800 text-white flex flex-col p-4 fixed left-0 top-0">
      {/* App Name */}
      <h1 className="text-2xl font-bold mb-8">Waste App</h1>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
              isActive ? "bg-green-600" : "hover:bg-green-700"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
              isActive ? "bg-green-600" : "hover:bg-green-700"
            }`
          }
        >
          Account
        </NavLink>
         <NavLink
          to="/modules"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
              isActive ? "bg-green-600" : "hover:bg-green-700"
            }`
          }
        >
          Modules
        </NavLink>
         <NavLink
          to="communities/"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
              isActive ? "bg-green-600" : "hover:bg-green-700"
            }`
          }
        >
          Communities
        </NavLink>
         <NavLink
          to="/buyandsell"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
              isActive ? "bg-green-600" : "hover:bg-green-700"
            }`
          }
        >
          Buy & Sell
        </NavLink>
         <NavLink
          to="/map"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
              isActive ? "bg-green-600" : "hover:bg-green-700"
            }`
          }
        >
          Map
        </NavLink>
         <NavLink
          to="/tracking"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
              isActive ? "bg-green-600" : "hover:bg-green-700"
            }`
          }
        >
          Tracking
        </NavLink>

         <NavLink
          to="/complaints"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
              isActive ? "bg-green-600" : "hover:bg-green-700"
            }`
          }
        >
          Complain
        </NavLink>
          


        <NavLink
          to="/rewards"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
              isActive ? "bg-green-600" : "hover:bg-green-700"
            }`
          }
        >
          Rewards
        </NavLink>
      </nav>
    </div>
  );
}