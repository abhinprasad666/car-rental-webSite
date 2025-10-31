import React from "react";
import { ShieldCheck, CheckCircle } from "lucide-react";

const AdminLoginLeftPanel = () => {
  return (
    <div className="md:w-1/2 flex flex-col justify-center items-start p-12 bg-white shadow-md dark:bg-gray-900">
      {/* Title with Icon */}
      <h1 className="text-4xl font-extrabold text-teal-600 mb-4 flex items-center gap-2 animate-fade-in">
        <ShieldCheck className="w-8 h-8 text-teal-600 animate-pulse" />
        Easy Drive <span className="text-gray-700">Admin Portal</span>
      </h1>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
        Welcome to the <span className="font-semibold text-teal-500">Easy Drive Admin Panel</span>.  
        Manage your rental fleet, users, and bookings efficiently with full control.
      </p>

      {/* Feature List */}
      <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-sm">
        <li className="flex items-start gap-2 animate-slide-in">
          <CheckCircle className="text-teal-500 w-5 h-5 mt-1" />
          Track and manage all car bookings in real-time
        </li>
        <li className="flex items-start gap-2 animate-slide-in delay-100">
          <CheckCircle className="text-teal-500 w-5 h-5 mt-1" />
          Manage car listings, user profiles, and rental pricing
        </li>
        <li className="flex items-start gap-2 animate-slide-in delay-200">
          <CheckCircle className="text-teal-500 w-5 h-5 mt-1" />
          Secure login with admin-only privileges
        </li>
        <li className="flex items-start gap-2 animate-slide-in delay-300">
          <CheckCircle className="text-teal-500 w-5 h-5 mt-1" />
          Analytics dashboard for better insights and decision making
        </li>
      </ul>
    </div>
  );
};

export default AdminLoginLeftPanel;
