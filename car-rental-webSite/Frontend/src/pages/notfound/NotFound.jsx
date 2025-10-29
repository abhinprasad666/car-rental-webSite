import { Link } from "react-router-dom";
import { motion} from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <motion.h1
        className="text-9xl font-bold text-black-500 mb-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-gray-700 mb-6 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Lost your way? Let's drive you back to the homepage.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-teal-500

 text-white rounded-lg shadow-lg  hover:bg-teal-600 transition duration-300"
        >
          Go back home
        </Link>
      </motion.div>
    </div>
  );
}