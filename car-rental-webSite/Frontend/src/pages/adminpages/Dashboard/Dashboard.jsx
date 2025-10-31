import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboardStats } from "../../../redux/actions/authActions/admin/statusActions/statusAction";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { loading, stats, error } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(getAdminDashboardStats());
  }, [dispatch]);

  // ✅ Fallback values if stats not yet loaded
  const dashboard = stats || {
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
    totalEarnings: 0,
    recentBookings: [],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Dashboard Overview
      </h1>

      {/* Loading State */}
      {loading && (
        <p className="text-sky-500 text-sm font-medium">Loading stats...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-red-500 text-sm font-medium">
          Failed to load stats: {error}
        </p>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Users", count: dashboard.totalUsers },
          { title: "Total Cars", count: dashboard.totalCars },
          { title: "Total Bookings", count: dashboard.totalBookings },
          { title: "Earnings", count: `₹${dashboard.totalEarnings}` },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center transition hover:scale-105 duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {item.title}
            </h3>
            <p className="text-2xl font-bold text-sky-600 mt-2">
              {item.count ?? "—"}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Recent Bookings
        </h2>

        {dashboard.recentBookings && dashboard.recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 px-3 text-left">User</th>
                  <th className="py-2 px-3 text-left">Car</th>
                  <th className="py-2 px-3 text-left">Status</th>
                  <th className="py-2 px-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.recentBookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-2 px-3">{b.userId?.name || "N/A"}</td>
                    <td className="py-2 px-3">{b.carId?.name || "N/A"}</td>
                    <td className="py-2 px-3 capitalize">{b.status}</td>
                    <td className="py-2 px-3">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No recent bookings found.</p>
        )}
      </div>
    </div>
  );
}
