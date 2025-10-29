import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Car, Home, CalendarDays, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";
import UserMenu from "./UserMenu";
import NavLinks from "./NavLinks";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true); 
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  //  Show admin buttons only if user.role === "admin"
  const showAdminButtons = user?.role === "admin";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* BRAND */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-bold text-sky-600 dark:text-sky-400"
        >
          <Car size={26} />
          <span>EasyDrive</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks handleNavigate={handleNavigate} />
          <DarkModeToggle />

          {/* Admin Logic: Only show if user is admin */}
          {showAdminButtons && (
            isAdminLoggedIn ? (
              <button
                onClick={() => handleNavigate("/admin/dashboard")}
                className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition"
              >
                <Shield size={18} />
                <span>Admin Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavigate("/admin/login")}
                className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition"
              >
                <Shield size={18} />
                <span>Admin Login</span>
              </button>
            )
          )}

          {user ? (
            <UserMenu
              user={user}
              onProfileClick={() => handleNavigate("/user/profile")}
            />
          ) : (
            <Link
              to="/login"
              className="bg-sky-500 text-white px-4 py-1 rounded-md shadow hover:bg-sky-600 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-800 dark:text-gray-200 focus:outline-none"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 dark:bg-gray-900/90 px-5 py-5 space-y-4 shadow-lg border-t border-gray-200 dark:border-gray-700"
          >
            <button
              onClick={() => handleNavigate("/")}
              className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition"
            >
              <Home size={20} />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNavigate("/cars")}
              className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition"
            >
              <Car size={20} />
              <span>Cars</span>
            </button>

            <button
              onClick={() => handleNavigate("/booking")}
              className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition"
            >
              <CalendarDays size={20} />
              <span>Booking</span>
            </button>

            {/* 👇 Mobile Admin Logic */}
            {showAdminButtons && (
              isAdminLoggedIn ? (
                <button
                  onClick={() => handleNavigate("/admin/dashboard")}
                  className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition"
                >
                  <Shield size={20} />
                  <span>Admin Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavigate("/admin/login")}
                  className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition"
                >
                  <Shield size={20} />
                  <span>Admin Login</span>
                </button>
              )
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-300 dark:border-gray-700">
              <DarkModeToggle />
              {user ? (
                <UserMenu
                  user={user}
                  onProfileClick={() => handleNavigate("/user/profile")}
                />
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-sky-500 text-white px-4 py-1 rounded-md shadow hover:bg-sky-600 transition"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
