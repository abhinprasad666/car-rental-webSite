import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import Loader from "../../../common/loaders/Loader";
import { loginUser } from "../../../redux/actions/authActions/loginAction";


const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const onSubmit = (data) => {
        dispatch(loginUser(data));
    };

    return (
        <div className="md:w-1/2 flex items-center justify-center p-8 animate-fadeIn dark:bg-gray-900 ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 dark:bg-gray-800 "
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">Login</h2>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="login-email" className="block font-semibold mb-1">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            id="login-email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Please enter a valid email address",
                                },
                            })}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="login-password" className="block font-semibold mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 8 characters",
                                },
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

                {/* Forgot Password */}
                <div className="mb-6 text-right">
                    <Link to="/forgot-password" className="text-sm text-[oklch(77.7%_0.152_181.912)] hover:underline">
                        Forgot password?
                    </Link>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white py-2 rounded-md transition flex justify-center items-center 
          ${loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}
                >
                    {loading ? (
                        <Loader
                            message="Welcome back!"
                            bottomMessage="Logging you in... Let’s find you something amazing!"
                            fullPage={true}
                        />
                    ) : (
                        "Login"
                    )}
                </button>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/singup" className="text-teal-600 font-medium hover:underline">
                        Register
                    </Link>
                </p>

                {/* Skip Link */}
                <div className="mt-4 text-center">
                    <Link to="/" className="inline-block text-sm text-gray-600 hover:text-teal-600 underline transition">
                        Skip for now
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;