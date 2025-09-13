import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // check auth

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-green-800 text-white fixed left-0 top-0 flex flex-col">
      {/* App Name */}
      <h1 className="text-2xl font-bold mb-4 p-4">Waste App</h1>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto pb-4">
        {/* Always visible */}
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

        {!token ? (
          <>
            <NavLink
              to="/signup"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition ${
                  isActive ? "bg-green-600" : "hover:bg-green-700"
                }`
              }
            >
              Signup
            </NavLink>
            <NavLink
              to="/login"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition ${
                  isActive ? "bg-green-600" : "hover:bg-green-700"
                }`
              }
            >
              Login
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/profile"
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
              to="/communities"
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
              to="/complaints"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition ${
                  isActive ? "bg-green-600" : "hover:bg-green-700"
                }`
              }
            >
              Complaints
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
              to="/rewards"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition ${
                  isActive ? "bg-green-600" : "hover:bg-green-700"
                }`
              }
            >
              Rewards
            </NavLink>

            {/* Committee Pages */}
            <NavLink
              to="/citizen-form"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition ${
                  isActive ? "bg-green-600" : "hover:bg-green-700"
                }`
              }
            >
              Citizen Form
            </NavLink>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition ${
                  isActive ? "bg-green-600" : "hover:bg-green-700"
                }`
              }
            >
              Admin Dashboard
            </NavLink>
            <NavLink
              to="/municipal"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition ${
                  isActive ? "bg-green-600" : "hover:bg-green-700"
                }`
              }
            >
              Municipal Dashboard
            </NavLink>

            <NavLink
              to="/userCommunity"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition ${
                  isActive ? "bg-green-600" : "hover:bg-green-700"
                }`
              }
            >
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
  );
}
