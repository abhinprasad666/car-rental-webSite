import React, { useState } from "react";

const ManageBookings = () => {
  // Dummy bookings data
  const [bookings, setBookings] = useState([
    {
      _id: "1",
      userId: { name: "Abhin" },
      carId: { name: "Hyundai i20" },
      pickupDate: "2025-10-25",
      returnDate: "2025-10-28",
      totalAmount: 4500,
      status: "pending",
    },
    {
      _id: "2",
      userId: { name: "Rahul" },
      carId: { name: "Maruti Swift" },
      pickupDate: "2025-10-26",
      returnDate: "2025-10-30",
      totalAmount: 5200,
      status: "confirmed",
    },
  ]);

  // Dummy status update function
  const handleStatusChange = (id, newStatus) => {
    const updatedBookings = bookings.map((booking) =>
      booking._id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
  };

  // Status badge color function
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Manage Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Car</th>
              <th className="px-4 py-3 text-left">Pickup</th>
              <th className="px-4 py-3 text-left">Return</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr
                key={b._id}
                className="border-b hover:bg-gray-50 transition-all text-sm"
              >
                <td className="px-4 py-3">{b.userId.name}</td>
                <td className="px-4 py-3">{b.carId.name}</td>
                <td className="px-4 py-3">{b.pickupDate}</td>
                <td className="px-4 py-3">{b.returnDate}</td>
                <td className="px-4 py-3 font-medium">₹{b.totalAmount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={b.status}
                    onChange={(e) =>
                      handleStatusChange(b._id, e.target.value)
                    }
                    className="border rounded-lg p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
