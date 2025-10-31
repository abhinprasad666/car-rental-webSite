
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { deleteUser, getAllUsers } from "../../../redux/actions/authActions/admin/adminUserActions";

export default function ManageUsers() {
  const dispatch = useDispatch();
  const { users, loading, message, error } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    //   dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Manage Users
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="px-4 sm:px-6 py-3">Name</th>
              <th className="px-4 sm:px-6 py-3">Email</th>
              <th className="px-4 sm:px-6 py-3">Role</th>
              <th className="px-4 sm:px-6 py-3">Status</th>
              <th className="px-4 sm:px-6 py-3">Joined On</th>
              <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  Loading users...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition"
                >
                  <td className="px-4 sm:px-6 py-3 font-medium">{user.name}</td>
                  <td className="px-4 sm:px-6 py-3">{user.email}</td>
                  <td className="px-4 sm:px-6 py-3 capitalize">{user.role}</td>
                  <td
                    className={`px-4 sm:px-6 py-3 font-medium ${
                      user.status === "active" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="px-4 sm:px-6 py-3">
                    {new Date(user.createdAt).toISOString().split("T")[0]}
                  </td>

                  <td className="px-4 sm:px-6 py-3 flex justify-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
