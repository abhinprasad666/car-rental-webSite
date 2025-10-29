// components/auth/LoginLeftPanel.jsx
import React from "react";
import { CheckCircle, UserPlus } from "lucide-react";

const LoginLeftPanel = () => {
  return (
    <div className="dark:bg-gray-900 md:w-1/2 flex flex-col justify-center items-start p-12 text-left bg-white shadow-md animate-fadeIn">
    <h1 className="text-4xl font-extrabold text-teal-600 mb-4 animate-bounce flex items-center gap-2">
            <UserPlus className="w-8 h-8" />Easy Drive
          </h1>
      <p className="text-gray-700 text-lg mb-6">
        Welcome to <span className="font-semibold text-teal-500">Easy Drive</span> — Where quality cars meet your next journey
      </p>
      <ul className="space-y-3 text-gray-700 text-sm">
        <li className="flex items-start gap-2">
          <CheckCircle className="text-teal-500 w-5 h-5 mt-1" />
          Fast and secure login with protected credentials
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="text-teal-500 w-5 h-5 mt-1" />
          Manage your bookings, profile & car listings easily
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="text-teal-500 w-5 h-5 mt-1" />
          Trusted by thousands of happy users
        </li>
      </ul>
    </div>
  );
};

export default LoginLeftPanel;