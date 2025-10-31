import { Outlet, NavLink } from "react-router-dom";
import { Car, LayoutDashboard, PlusSquare, ClipboardList,Users } from "lucide-react";

import { useState } from "react";
import AdminTopbar from "../../components/admin/AdminTopbar/AdminTopbar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/add-car", label: "Add Car", icon: PlusSquare },
    { path: "/admin/manage-cars", label: "Manage Cars", icon: Car },
    { path: "/admin/manage-bookings", label: "Manage Bookings", icon: ClipboardList },
       { path: "/admin/manage-users", label: "Manage Users", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 shadow-md transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-sky-600 dark:text-sky-400">
            {isSidebarOpen ? "EasyDrive" : "ED"}
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-sky-500 transition"
          >
            ☰
          </button>
        </div>

        <nav className="flex-1 mt-4 space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 space-x-3 font-medium transition-all ${
                  isActive
                    ? "bg-sky-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <Icon size={20} />
              {isSidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
