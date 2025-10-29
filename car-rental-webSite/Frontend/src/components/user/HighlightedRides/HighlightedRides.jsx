import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const HighlightedRides = () => {
  const { loading, cars } = useSelector((state) => state.cars);
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="py-20 text-center bg-gradient-to-b from-cyan-500 to-blue-500 dark:from-gray-900 dark:to-gray-800 text-white transition-colors duration-500">
        <h2 className="text-2xl">Loading cars...</h2>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-cyan-500 to-blue-500 dark:from-gray-900 dark:to-gray-800 text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Highlighted Rides</h2>
        <p className="text-white/90 mb-10 dark:text-gray-300">
          Explore our selection of premium vehicles available for your journey.
        </p>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars?.map((car) => (
            <div
              key={car._id}
              onClick={() => navigate(`/car/${car._id}`)}
              className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer 
                ${!car.available ? "opacity-80 grayscale" : ""}`}
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`absolute top-2 left-2 text-white text-sm px-3 py-1 rounded-full ${
                    car.available ? "bg-green-600" : "bg-red-500"
                  }`}
                >
                  {car.available ? "Available Now" : "Unavailable"}
                </span>
              </div>

              {/* Details Section */}
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold mb-1">{car.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {car.brand}
                </p>

                {/* ⭐ Rating Section */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < car.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                    ({car.numOfReviews || 0})
                  </span>
                </div>

                <ul className="text-sm space-y-2">
                  <li>🚗 <strong>Category:</strong> {car.category || "N/A"}</li>
                  <li>🪑 <strong>Seats:</strong> {car.seats}</li>
                  <li>⛽ <strong>Fuel:</strong> {car.fuelType}</li>
                  <li>⚙️ <strong>Transmission:</strong> {car.transmission}</li>
                  <li>📍 <strong>Location:</strong> {car.location}</li>
                  <li>💰 <strong>Price:</strong> ₹{car.price}/day</li>
                </ul>

                {/* Book Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (car.available) navigate(`/car/${car._id}`);
                  }}
                  disabled={!car.available}
                  className={`mt-4 w-full py-2 rounded-full transition font-medium ${
                    car.available
                      ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {car.available ? "Book Now" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Button */}
        <button
          onClick={() => navigate("/cars")}
          className="mt-10 bg-white dark:bg-gray-700 text-cyan-700 dark:text-cyan-400 
            font-medium px-6 py-3 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          Explore More →
        </button>
      </div>
    </section>
  );
};

export default HighlightedRides;
