import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, User, Eye, EyeOff, Phone } from "lucide-react";
import { showToast } from "../../../utils/toastUtils";
import Loader from "../../../common/loaders/Loader";
import { registerUser } from "../../../redux/actions/authActions/registerActions";

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAuthenticated, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            showToast("Account created successfully.", "success");
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (error) {
            showToast(`${error}`, "error", "api-error");
        }
    }, [error]);

    const onSubmit = (data) => {
        dispatch(registerUser(data));
    };

    return (
        <div className="md:w-1/2 flex items-center justify-center p-8 dark:bg-gray-900 ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fade-in dark:bg-gray-800 "
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">Create a New Account</h2>

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="signup-name" className="block font-semibold mb-1">
                        Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            id="signup-name"
                            type="text"
                            placeholder="Enter your name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="signup-email" className="block font-semibold mb-1">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label htmlFor="signup-phone" className="block font-semibold mb-1">
                        Phone Number
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            id="signup-phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Phone number must be 10 digits",
                                },
                            })}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="signup-password" className="block font-semibold mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                            })}
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <label htmlFor="signup-confirm-password" className="block font-semibold mb-1">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            id="signup-confirm-password"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm your password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) => value === watch("password") || "Passwords do not match",
                            })}
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white py-2 rounded-md transition flex justify-center items-center 
            ${loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}
                >
                    {loading ? (
                        <Loader
                            message="Creating your Deal-Spot account"
                            bottomMessage="Setting up your personalized shopping experience!"
                            fullPage={true}
                        />
                    ) : (
                        "Register"
                    )}
                </button>

                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-teal-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>

                <div className="mt-4 text-center">
                    <Link to="/" className="text-sm text-gray-600 hover:text-teal-600 underline transition">
                        Skip for now
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
