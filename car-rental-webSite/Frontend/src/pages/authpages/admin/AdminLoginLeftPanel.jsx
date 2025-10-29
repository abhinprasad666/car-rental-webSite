import React from "react";
import { ShieldCheck, CheckCircle } from "lucide-react";

const AdminLoginLeftPanel = () => {
  return (
    <div className="md:w-1/2 flex flex-col justify-center items-start p-12 bg-white shadow-md dark:bg-gray-900">
      {/* Title with Icon */}
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4 flex items-center gap-2 animate-fade-in">
        <ShieldCheck className="w-8 h-8 text-blue-600 animate-pulse" />
       <span className=" text-pink-600">Deal Spot</span> Admin Access
      </h1>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
        Welcome to the DealSpot Admin Portal. Manage your platform with confidence and full control.
      </p>

      {/* Feature List */}
      <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-sm">
        <li className="flex items-start gap-2 animate-slide-in">
          <CheckCircle className="text-blue-500 w-5 h-5 mt-1" />
          Full dashboard access with real-time insights and reports
        </li>
        <li className="flex items-start gap-2 animate-slide-in delay-100">
          <CheckCircle className="text-blue-500 w-5 h-5 mt-1" />
          Manage users, products, orders, reviews, and more
        </li>
        <li className="flex items-start gap-2 animate-slide-in delay-200">
          <CheckCircle className="text-blue-500 w-5 h-5 mt-1" />
          Secure login with role-based access control
        </li>
        <li className="flex items-start gap-2 animate-slide-in delay-300">
          <CheckCircle className="text-blue-500 w-5 h-5 mt-1" />
          Designed for speed, performance, and visibility
        </li>
      </ul>
    </div>
  );
};

export default AdminLoginLeftPanel;
