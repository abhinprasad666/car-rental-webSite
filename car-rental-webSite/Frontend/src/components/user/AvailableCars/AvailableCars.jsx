import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AvailableCars = () => {
  const navigate = useNavigate();
  const { loading, availableCars } = useSelector((state) => state.cars);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white text-2xl font-semibold">
        🚗 Loading available cars...
      </div>
    );
  }

  if (!availableCars || availableCars.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white text-2xl font-semibold">
        ❌ No available cars found!
      </div>
    );
  }

  return (
    <section className="py-14 bg-gradient-to-b from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-3 text-sky-700 dark:text-sky-400"
        >
          Available Cars 🚗
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 dark:text-gray-300 mb-10"
        >
          Choose from our best-in-class rides, ready for your next trip.
        </motion.p>

        {/* Cars Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {availableCars.map((car) => (
            <motion.div
              key={car._id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
              onClick={() => navigate(`/car/${car._id}`)}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-52 object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                  Available
                </span>
              </div>

              {/* Details */}
              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold mb-3">{car.name}</h3>
                <ul className="text-sm space-y-2">
                  <li>🚘 <strong>Category:</strong> {car.category?.name}</li>
                  <li>🪑 <strong>Seats:</strong> {car.seats}</li>
                  <li>⛽ <strong>Fuel:</strong> {car.fuelType}</li>
                  <li>⚙️ <strong>Transmission:</strong> {car.transmission}</li>
                  <li>📍 <strong>Location:</strong> {car.location}</li>
                  <li>💰 <strong>Price:</strong> ₹{car.price}/day</li>
                </ul>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/car/${car._id}`);
                  }}
                  className="mt-5 w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-sky-600 dark:hover:bg-sky-700 text-white py-2 rounded-full transition"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/cars")}
          className="mt-12 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600 text-white font-medium px-8 py-3 rounded-full shadow transition"
        >
          Explore All Cars →
        </motion.button>
      </div>
    </section>
  );
};

export default AvailableCars;
