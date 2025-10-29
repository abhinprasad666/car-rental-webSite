import React from "react";
import { CheckCircle, UserPlus } from "lucide-react";

const SignupLeftPanel = () => {
  return (
    <div className="md:w-1/2 flex flex-col justify-center items-start p-12 bg-white shadow-md dark:bg-gray-900 ">
      <h1 className="text-4xl font-extrabold text-teal-600
 mb-4 animate-bounce flex items-center gap-2">
        <UserPlus className="w-8 h-8" /> Easy Drive
      </h1>
      <p className="text-gray-700 text-lg mb-4">
        Join our platform and unlock a smarter, safer way to rent cars.
      </p>
      <ul className="space-y-4 text-gray-700 text-sm">
        <li className="flex items-start gap-2 animate-pulse">
          <CheckCircle className="text-teal-400
 w-5 h-5 mt-1" />
          Secure registration with advanced password protection
        </li>
        <li className="flex items-start gap-2 animate-pulse delay-100">
          <CheckCircle className="text-teal-400
 w-5 h-5 mt-1" />
          Unlock budget-friendly offers and enjoy quality rides anytime.
        </li>
        <li className="flex items-start gap-2 animate-pulse delay-200">
          <CheckCircle className="text-teal-400
 w-5 h-5 mt-1" />
          Trusted by over <span className="font-semibold">10,000+ users</span> across India
        </li>
        <li className="flex items-start gap-2 animate-pulse delay-300">
          <CheckCircle className="text-teal-400
 w-5 h-5 mt-1" />
          Track bookings, manage your profile, and much more.
        </li>
      </ul>
    </div>
  );
};

export default SignupLeftPanel;