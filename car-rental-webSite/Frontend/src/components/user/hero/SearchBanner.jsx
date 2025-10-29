import { useState } from "react";
import { CalendarDays, MapPin, Loader2, Edit3, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import carImage from "../../../assets/banner_car_image-B9uXTQkB.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { availableCars } from "../../../redux/actions/carActions/carActios";

export default function SearchBanner() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [mode, setMode] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetLocation = () => {
    setShowOptions(false);
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      setLoadingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          const state = data.address?.state;
          const country = data.address?.country;

          if (country !== "India" || state !== "Kerala") {
            alert("Sorry, we currently serve only within Kerala.");
            setPickupLocation("");
            setMode("manual");
            return;
          }

          const place =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            "Unknown";

          setPickupLocation(`${place}, ${state}`);
        } catch {
          alert("Unable to fetch location. Please enter manually.");
          setMode("manual");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        alert("Unable to retrieve your location.");
        setLoadingLocation(false);
      }
    );
  };

  const handleSearch = () => {
    if (!pickupLocation || !pickupDate || !returnDate) {
      alert("Please fill all fields before searching.");
      return;
    }
    dispatch(availableCars());
    navigate("car/availabile");
  };

  return (
    <section
      className="mt-13 relative min-h-screen flex flex-col justify-center items-center 
      bg-gradient-to-br from-sky-200 via-blue-100 to-cyan-100 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      overflow-hidden transition-colors duration-500"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full mx-auto text-center px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-3">
          Rent Your Dream Car 🚘
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg">
          Choose your location, dates, and let’s roll!
        </p>

        {/* FORM + BUTTON CENTER GROUP */}
        <div className="flex flex-col items-center gap-6">
          {/* FORM BOX */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/95 dark:bg-gray-800/90 backdrop-blur-md shadow-xl 
              rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 
              border border-white/40 dark:border-gray-700 w-full md:w-11/12 mx-auto transition-all"
          >
            {/* PICKUP LOCATION */}
            <div className="flex flex-col w-full md:w-1/3 relative">
              <label className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                Pickup Location
              </label>

              <div
                className="flex items-center border border-gray-300 dark:border-gray-600 
                rounded-xl bg-white dark:bg-gray-700 px-3 py-2 h-[52px] 
                transition-all focus-within:border-cyan-500"
              >
                <MapPin className="text-cyan-600 w-5 h-5 mr-2" />
                {mode === "manual" ? (
                  <input
                    type="text"
                    placeholder="Enter location manually (Kerala only)"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="p-2 outline-none w-full text-gray-700 dark:text-gray-100 bg-transparent"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={
                      mode === "auto"
                        ? loadingLocation
                          ? "Detecting your location..."
                          : pickupLocation || "Location detected"
                        : "Click to choose option"
                    }
                    readOnly
                    value={mode === "auto" ? pickupLocation : ""}
                    onClick={() => {
                      if (!mode) setShowOptions(true);
                    }}
                    className={`p-2 outline-none w-full text-gray-700 dark:text-gray-100 bg-transparent ${
                      !mode ? "cursor-pointer" : ""
                    }`}
                  />
                )}
                {loadingLocation && (
                  <Loader2 className="w-4 h-4 text-cyan-600 animate-spin ml-2" />
                )}
              </div>

              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 w-full mt-2 
                    bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 
                    rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setMode("auto");
                      setShowOptions(false);
                      handleGetLocation();
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left 
                      hover:bg-cyan-50 dark:hover:bg-gray-600 text-cyan-700 dark:text-cyan-400 font-medium"
                  >
                    <MapPin className="w-5 h-5" />
                    Detect Automatically
                  </button>
                  <button
                    onClick={() => {
                      setMode("manual");
                      setShowOptions(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left 
                      hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium"
                  >
                    <Edit3 className="w-5 h-5" />
                    Enter Manually
                  </button>
                </motion.div>
              )}

              <div className="h-[22px] mt-1 flex items-center">
                {mode && (
                  <button
                    onClick={() => {
                      setMode("");
                      setPickupLocation("");
                      setShowOptions(false);
                    }}
                    className="text-xs text-blue-500 dark:text-blue-400 flex items-center gap-1 hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Change Option
                  </button>
                )}
              </div>
            </div>

            {/* PICKUP DATE */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                Pickup Date
              </label>
              <div
                className="flex items-center border border-gray-300 dark:border-gray-600 
                rounded-xl bg-white dark:bg-gray-700 px-3 py-2 h-[52px] focus-within:border-cyan-500"
              >
                <CalendarDays className="text-cyan-600 w-5 h-5 mr-2" />
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="p-2 outline-none w-full text-gray-700 dark:text-gray-100 bg-transparent"
                />
              </div>
              <div className="h-[22px]" />
            </div>

            {/* RETURN DATE */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                Return Date
              </label>
              <div
                className="flex items-center border border-gray-300 dark:border-gray-600 
                rounded-xl bg-white dark:bg-gray-700 px-3 py-2 h-[52px] focus-within:border-cyan-500"
              >
                <CalendarDays className="text-cyan-600 w-5 h-5 mr-2" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="p-2 outline-none w-full text-gray-700 dark:text-gray-100 bg-transparent"
                />
              </div>
              <div className="h-[22px]" />
            </div>
          </motion.div>

          {/* CENTERED BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 
            text-white px-14 py-3 rounded-full flex items-center justify-center gap-2 
            shadow-lg hover:shadow-xl transition-all"
          >
            ✨ Find My Ride
          </motion.button>
        </div>

        {/* CAR IMAGE */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mt-12 flex justify-center"
        >
          <img
            src={carImage}
            alt="Luxury Car"
            className="w-full max-w-md md:max-w-lg drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
