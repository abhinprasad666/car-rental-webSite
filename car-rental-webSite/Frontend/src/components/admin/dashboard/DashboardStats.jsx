import React from "react";

const DashboardStats = () => {
  const stats = [
    { title: "Total Cars", value: 24 },
    { title: "Total Users", value: 102 },
    { title: "Bookings Today", value: 8 },
    { title: "Total Revenue", value: "₹1,45,000" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md p-4 text-center hover:shadow-lg transition"
        >
          <p className="text-gray-600 text-sm">{item.title}</p>
          <h2 className="text-xl font-semibold text-blue-600 mt-1">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
