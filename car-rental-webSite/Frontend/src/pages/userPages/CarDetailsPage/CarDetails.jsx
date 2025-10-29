import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleCar } from "../../../redux/actions/carActions/carActios";
import Loader from "../../../common/loaders/Loader";
import { Star } from "lucide-react";

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch(getSingleCar(id));
  }, [id, dispatch]);

  const { loading, car } = useSelector((state) => state.cars);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [address, setAddress] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diff = (end - start) / (1000 * 60 * 60 * 24);
      const days = diff > 0 ? diff : 0;
      setTotalDays(days);
      setTotalPayment(days * (car?.price || 0));
    } else {
      setTotalDays(0);
      setTotalPayment(0);
    }
  }, [pickupDate, returnDate, car?.price]);

  const handleContinue = () => {
    if (!pickupDate || !returnDate || !address.trim() || !pickupLocation.trim()) {
      alert("⚠️ Please fill all fields before continuing!");
      return;
    }

    const bookingData = {
      carId: car._id,
      carName: car.name,
      carImage: car.image,
      pickupLocation,
      pickupDate,
      returnDate,
      pickupAddress: address,
      totalDays,
      pricePerDay: car.price,
      totalPayment,
    };

    console.log("🟢 Booking JSON:", bookingData);
    navigate("/confirm-booking", { state: { bookingData } });
  };

  if (loading) return <Loader />;

  return (
    <div className="mt-15 min-h-screen bg-gradient-to-b from-sky-300 to-sky-100 dark:from-gray-900 dark:to-gray-800 flex justify-center items-center p-4 transition-colors duration-500">
      <div className="max-w-5xl w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8 border border-sky-100 dark:border-gray-700">
        {/* LEFT SIDE */}
        <div className="flex-1">
          {/* Car Image */}
          <img
            src={car?.image}
            alt={car?.name}
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-md"
          />

          {/* ⭐ Rating Section */}
          <div className="flex items-center gap-2 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={
                  i < Math.round(car?.rating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }
              />
            ))}
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {car?.rating ? `${car.rating.toFixed(1)} / 5` : "No ratings yet"}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">
              ({car?.numOfReviews || 0} Reviews)
            </span>
          </div>

          {/* Unavailable Message */}
          {!car?.available && (
            <p className="inline-block mt-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
              🚫 Temporarily Unavailable for Booking
            </p>
          )}

          {/* Car Name */}
          <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
            {car?.name}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="bg-sky-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-4 py-2 rounded-xl font-medium shadow-sm">
              {car?.seats} Seats
            </span>
            <span className="bg-sky-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-4 py-2 rounded-xl font-medium shadow-sm">
              {car?.fuelType}
            </span>
            <span className="bg-sky-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-4 py-2 rounded-xl font-medium shadow-sm">
              {car?.transmission}
            </span>
            <span className="bg-sky-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-4 py-2 rounded-xl font-medium shadow-sm">
              {car?.category?.name}
            </span>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Description
            </h3>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
              {car?.description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center border border-sky-100 dark:border-gray-700">
          <div className="text-center mb-4">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              ₹{car?.price}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Per Day</p>
          </div>

          <div className="w-full">
            <label className="text-gray-600 dark:text-gray-300 text-sm font-medium">
              Pickup Location
            </label>
            <input
              type="text"
              placeholder="Enter pickup location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full mt-1 mb-3 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-sky-400"
            />

            <label className="text-gray-600 dark:text-gray-300 text-sm font-medium">
              Pickup Date
            </label>
            <input
              type="date"
              value={pickupDate}
              min={today}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full mt-1 mb-3 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-sky-400"
            />

            <label className="text-gray-600 dark:text-gray-300 text-sm font-medium">
              Return Date
            </label>
            <input
              type="date"
              value={returnDate}
              min={pickupDate || today}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full mt-1 mb-3 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-sky-400"
            />

            <label className="text-gray-600 dark:text-gray-300 text-sm font-medium">
              Full Address
            </label>
            <textarea
              rows="2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter complete address"
              className="w-full mt-1 mb-4 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300 mb-3 border-t border-gray-200 dark:border-gray-700 pt-3 w-full">
            <p>
              Total Trip Days: <strong>{totalDays}</strong>
            </p>
            <p>
              Vehicle Rent: ₹{car?.price} × {totalDays} ={" "}
              <strong>₹{totalPayment}</strong>
            </p>
          </div>

          {/* Error message inside right card */}
          {!car?.available && (
            <p className="text-red-600 text-sm font-medium mb-2 text-center">
              This car is temporarily unavailable for booking. <br /> Please check back later.
            </p>
          )}

          <button
            disabled={!car?.available}
            onClick={handleContinue}
            className={`w-full py-3 rounded-lg font-semibold mt-3 transition-colors duration-300 ${
              car?.available
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
            }`}
          >
            {car?.available ? "Continue to Payment" : "Temporarily Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
