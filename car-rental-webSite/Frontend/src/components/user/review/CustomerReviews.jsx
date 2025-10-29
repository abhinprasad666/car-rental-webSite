import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const CustomerReviews = () => {
         const { loading,reviews } = useSelector((state) => state.user);
         console.log("reviews",reviews)
//   const reviews = [
//     {
//       id: 1,
//       name: "Aarav Nair",
//       car: "Hyundai Creta 2023",
//       rating: 5,
//       comment:
//         "Excellent service! The car was clean and comfortable throughout the trip.",
//     },
//     {
//       id: 2,
//       name: "Meera Raj",
//       car: "Maruti Baleno",
//       rating: 4,
//       comment: "Booking process was smooth and the car performed well.",
//     },
//     {
//       id: 3,
//       name: "Vikram Das",
//       car: "Toyota Innova Crysta",
//       rating: 5,
//       comment: "Perfect for long drives! Very comfortable and spacious vehicle.",
//     },
//     {
//       id: 4,
//       name: "Nandita Menon",
//       car: "Honda City",
//       rating: 4,
//       comment:
//         "Affordable rates and good condition car. Highly recommended!",
//     },
//     {
//       id: 5,
//       name: "Rahul Krishnan",
//       car: "Tata Nexon EV",
//       rating: 5,
//       comment:
//         "Loved the EV experience! Very smooth and eco-friendly ride.",
//     },
//   ];

  return (
    <div className="w-full bg-gradient-to-b from-cyan-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 py-14">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-cyan-800 dark:text-cyan-400 mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Discover why travelers love our service
        </p>

        {/* Auto Scroll Slider */}
        <motion.div
          className="flex gap-6 overflow-hidden"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className="min-w-[300px] md:min-w-[340px] bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 flex flex-col items-center"
            >
              {/* Name + Car */}
              <h3 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">
                {review?.userId.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {review.car}
              </p>

              {/* Rating */}
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < review.rating ? "#FACC15" : "transparent"}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 dark:text-gray-300 text-sm italic leading-snug">
                “{review.comment}”
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerReviews;
