import { useState, useRef, useEffect } from "react";
import { User, LogOut, History, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../../../redux/actions/authActions/logoutAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toastUtils";

export default function UserMenu({ user, onProfileClick }) {

  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  //LogOut
    const handleLogout = () => {
      dispatch(logout());
      navigate("/");
    };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-semibold">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-600 dark:text-gray-300 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50"
          >
            <button
              onClick={() => {
                onProfileClick?.();
                setOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <User className="mr-2 w-4 h-4" />
              Go to Profile
            </button>

            <button
              onClick={() => setOpen(false)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <History className="mr-2 w-4 h-4" />
              Booking History
            </button>

            <button
              onClick={() => {
               handleLogout();
                  showToast("Logout successful!", "success");
                setOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="mr-2 w-4 h-4" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
