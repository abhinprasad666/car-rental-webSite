import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/actions/authActions/logoutAction";
import { updateProfile } from "../../../redux/actions/userActions/userAction";
import { clearUserProfileState } from "../../../redux/slices/userSlice/userSlice";
import { loadUser } from "../../../redux/actions/authActions/loadUser";
import { showToast } from "../../../utils/toastUtils";
import {
  User,
  Phone,
  Mail,
  Edit,
  LogOut,
  Trash2,
  FileText,
  Info,
} from "lucide-react";
import BookingHistory from "./BookingHistory";

const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message, update } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: user || {},
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (user) reset(user);
    if (message) {
      showToast("Profile Updated Successfully!", "success");
    }
  }, [user, reset, message]);

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    if (data.newPassword) {
      if (!data.currentPassword) {
        alert("⚠ Please enter your current password to change password.");
        return;
      }
      if (data.newPassword !== data.confirmPassword) {
        alert("⚠ New password and confirm password do not match!");
        return;
      }
    }
    dispatch(updateProfile(data));
    setIsEditing(false);
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      showToast(`${error}`, "error");
    }
    if (update || error) {
      const timer = setTimeout(() => {
        dispatch(clearUserProfileState());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, update, error]);

  const handleCancel = () => {
    reset(user);
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    showToast("Logout successful!", "success");
  };

  if (loading) {
    return (
      <div className=" mt-18 min-h-screen flex justify-center items-center text-lg dark:bg-gray-900 dark:text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg dark:bg-gray-900 dark:text-white">
        User not found 😕
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 to-blue-500 dark:from-gray-900 dark:to-gray-800 p-6 flex justify-center items-center text-gray-800 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden transition">
        {/* LEFT SIDEBAR */}
        <div className="bg-gradient-to-b from-cyan-500 to-blue-500 dark:from-gray-800 dark:to-gray-700 w-full md:w-1/3 text-center p-6 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">Easy Drive</h2>
            <div className="flex flex-col items-center">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-white"
                />
              ) : (
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold mb-3">
                  {user.name?.charAt(0)}
                </div>
              )}
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-white/80">{user.email}</p>
            </div>
          </div>

          <div className="text-left mt-10 space-y-3">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-2 text-left py-2 px-4 rounded-md transition ${
                activeTab === "profile"
                  ? "bg-white/30 dark:bg-gray-600"
                  : "bg-white/10 hover:bg-white/20 dark:hover:bg-gray-600"
              }`}
            >
              <Info size={18} /> Personal Information
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center gap-2 text-left py-2 px-4 rounded-md transition ${
                activeTab === "bookings"
                  ? "bg-white/30 dark:bg-gray-600"
                  : "bg-white/10 hover:bg-white/20 dark:hover:bg-gray-600"
              }`}
            >
              <FileText size={18} /> Booking History
            </button>

            <button
              onClick={() => alert("Account deleted (demo)")}
              className="w-full flex items-center gap-2 text-left bg-red-600 py-2 px-4 rounded-md hover:bg-red-700 transition"
            >
              <Trash2 size={18} /> Delete Account
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-left bg-white/10 py-2 px-4 rounded-md hover:bg-white/20 transition dark:hover:bg-gray-600"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          <div className="mt-6 text-right text-white/80">
            <p>Welcome</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-2/3 bg-gradient-to-b from-cyan-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-8 transition overflow-hidden">
          {activeTab === "profile" ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-400">
                  Personal Information
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition flex items-center gap-2"
                  >
                    <Edit size={18} /> Edit
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 space-y-3">
                  <p>
                    <User className="inline mr-2" size={18} />
                    <span className="font-semibold">Name:</span> {user.name}
                  </p>
                  <p>
                    <Mail className="inline mr-2" size={18} />
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                  <p>
                    <Phone className="inline mr-2" size={18} />
                    <span className="font-semibold">Phone:</span> {user.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Role:</span> {user.role}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        user.status === "active"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 space-y-4"
                >
                  <div>
                    <label className="block font-semibold">Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600"
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold">Email</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold">Phone</label>
                    <input
                      {...register("phone", {
                        required: "Phone is required",
                        minLength: { value: 10, message: "Must be 10 digits" },
                      })}
                      className="w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600"
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {newPassword && (
                    <>
                      <div>
                        <label className="block font-semibold">
                          Current Password
                        </label>
                        <input
                          type="password"
                          {...register("currentPassword")}
                          className="w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600"
                          autoComplete="current-password"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          {...register("confirmPassword")}
                          className="w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600"
                          autoComplete="new-password"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div className="h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              <BookingHistory />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
