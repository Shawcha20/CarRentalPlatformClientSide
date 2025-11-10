import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

import SocialSignIn from "../Components/SocialSignIn";
import { showError } from "../utils/notifications";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { UserRegister, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    setError("");

    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(password))
      return setError("Password must have one uppercase letter.");
    if (!/[a-z]/.test(password))
      return setError("Password must have one lowercase letter.");

    try {
      await UserRegister(email, password);
      await updateUserProfile(name, photoURL);
      toast.success("Account created successfully! 🚗");
      navigate("/");
    } catch (err) {
      setError(err.message);
      showError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1619767886558-efdc259cde1b?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl relative z-10"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3">
          Join RentWheels
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Create your account and start your ride today.
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered w-full bg-black/40 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-black/40 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="https://your-photo-link.com"
              className="input input-bordered w-full bg-black/40 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-black/40 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 pr-10 placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 z-10 text-gray-400 hover:text-blue-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm"
            >
              {error}
            </motion.p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="btn bg-gradient-to-r from-blue-500 to-cyan-400 border-none text-white hover:opacity-90 w-full mt-3"
          >
            Register
          </button>
        </form>

        {/* Social Login */}
        <SocialSignIn />

        {/* Login Link */}
        <p className="text-center text-sm mt-6 text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
