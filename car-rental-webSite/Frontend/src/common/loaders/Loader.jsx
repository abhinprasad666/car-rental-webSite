import React from "react";
import { PulseLoader } from "react-spinners";
import { FiLoader } from "react-icons/fi";

const Loader = ({
  size = 8,
  color = "#ffffff",
  message = "",
  messageWidth = "", // Tailwind width class, like 'w-32'
  messageClass = "", // Additional message styling
  fullPage = false,
  bottomMessage = "", // only for fullPage loader
}) => {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 via-white to-teal-50 animate-fade-in">
        <div className="mb-5 text-4xl font-extrabold text-teal-600 animate-bounce tracking-wider drop-shadow">
          Easy Drive
        </div>
        <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/30 backdrop-blur-md shadow-2xl border border-white/20 animate-fade-in-up transition-all duration-500 ease-out">
          <span className="text-lg font-semibold text-teal-600">{message || "Loading..."}</span>
          <FiLoader className="animate-spin text-2xl text-teal-600" />
        </div>
        <p className="mt-6 text-sm text-gray-500 italic animate-pulse tracking-wide">
          {bottomMessage || "Your perfect ride, ready and waiting...."}
        </p>
      </div>
    );
  }

  //  Compact loader for buttons and inline use
  return (
    <div className="flex items-center gap-2">
      {message && (
        <span
          className={`text-sm font-bold  text-white truncate ${messageWidth} ${messageClass}`}
        >
          {message}
        </span>
      )}
      <PulseLoader size={size} color={color} />
    </div>
  );
};

export default Loader;